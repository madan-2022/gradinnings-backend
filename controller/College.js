const College = require("../models/Collegemodel");
const axios = require("axios");
const cheerio = require("cheerio");
const multer = require("multer");

// Multer configuration with increased field size limit
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads/"); // Destination folder for storing uploaded files
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + file.originalname); // Unique filename to avoid conflicts
 },
});

const upload = multer({
 storage: storage,
 limits: {
  fieldSize: 10 * 1024 * 1024, // Increase field size limit (10 MB in this example)
 },
});

// Controller function to add scraped data to MongoDB
const addScrapedDataToMongoDB = async (req, res) => {
 try {
  const url = req.body.url;

  if (!url) {
   return res.status(400).json({ error: "URL is required" });
  }

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  // Define an object to store the scraped data
  let collegeData = {};

  // Extract data from all sections
  $(".block.box").each((sectionIndex, sectionElement) => {
   // Extracting section title
   const sectionTitle = $(sectionElement).find("h2").text().trim();
   const sectionData = {};

   // Extract data from the overview section
   const overviewData = $(sectionElement)
    .find(".collegeDetail_classRead__yd_kT .collegeDetail_overview__Qr159 p")
    .text()
    .trim();
   sectionData.overview = overviewData;

   // Extract data from all tables in the section
   const tables = $(sectionElement).find(
    ".collegeDetail_classRead__yd_kT .scrollTable table"
   );

   if (tables.length > 0) {
    // ...

    const tableData = tables
     .map((tableIndex, tableElement) => {
      const tableRows = $(tableElement).find("tbody tr");

      return tableRows
       .map((rowIndex, rowElement) => {
        const course = $(rowElement).find("td:nth-child(1)").text().trim();
        const annualFees = $(rowElement).find("td:nth-child(2)").text().trim();
        const duration = $(rowElement).find("td:nth-child(3)").text().trim();

        // Check if the third column exists
        if (duration) {
         return [[course, annualFees, duration]];
        }

        // If third column is not present, return only the first two columns
        return [[course, annualFees]];
       })
       .get();
     })
     .get();

    // Only add tables data if tables are present
    sectionData.tables = tableData;

    // ...

    // Only add tables data if tables are present
    sectionData.tables = tableData;
   }

   // Only add section to the collegeData object if it has tables or paragraphs
   if (overviewData || sectionData.tables) {
    collegeData[sectionTitle] = sectionData;
   }
  });

  // Save the scraped data to MongoDB

  // Assuming only one university's data is present

  const overview = Object.keys(collegeData)[0];
  const universityName = overview.replace(" Overview", "");
  function fetchDataByCategory(data, universityName, category) {
   const categoryKey = Object.keys(data).find(
    (key) =>
     key.toLowerCase().includes(universityName.toLowerCase()) &&
     key.toLowerCase().includes(category.toLowerCase())
   );
   return categoryKey ? data[categoryKey] : undefined;
  }

  const overviewschema = fetchDataByCategory(
   collegeData,
   universityName,
   "Overview"
  );
  const highlights = fetchDataByCategory(
   collegeData,
   universityName,
   "Highlights"
  );
  const courses = fetchDataByCategory(collegeData, universityName, "Courses");
  const admission = fetchDataByCategory(
   collegeData,
   universityName,
   "Admission"
  );
  var cutOff = fetchDataByCategory(collegeData, universityName, "Cut Off");
  var placement = fetchDataByCategory(
   collegeData,
   universityName,
   "Placements"
  );
  var scholarship = fetchDataByCategory(
   collegeData,
   universityName,
   "Scholarships"
  );
  var campusAndInfrastructure = fetchDataByCategory(
   collegeData,
   universityName,
   "Campus"
  );
  var awardsRecognitionCollaborations = fetchDataByCategory(
   collegeData,
   universityName,
   "Awards, Accreditation, Recognition and Collaborations"
  );
  var seat = fetchDataByCategory(
   collegeData,
   universityName,
   "Seat Reservation"
  );
  var Eligibility = fetchDataByCategory(
   collegeData,
   universityName,
   "Eligibility Criteria"
  );

  if (campusAndInfrastructure === undefined) {
   campusAndInfrastructure = req.body.campusAndInfrastructure;
  }

  if (cutOff === undefined) {
   cutOff = req.body.cutOff;
  }

  if (placement === undefined) {
   placement = req.body.placement;
  }

  const coursesarray = req.body.coursesarray;
  const city = req.body.city;
  const state = req.body.state;
  const fee = req.body.fee;
  const Banner = req.file ? req.file.path : req.body.Banner; // Check if file is uploaded, use req.file.path if uploaded, otherwise use req.body.Banner
  const Logo = req.file ? req.file.path : req.body.Logo; // Check if file is uploaded, use req.file.path if uploaded, otherwise use req.body.Logo
  // url = req.body.url;

  const universitySchema = {
   name: universityName,
   coursesarray: coursesarray,
   city: city,
   state: state,
   fee: fee,
   Banner: Banner,
   url: url,
   Logo: Logo,

   overview: overviewschema,

   Highlight: highlights,
   Courses: courses,
   Admission: admission,
   CutOff: cutOff,
   Placement: placement,
   Scholarship: scholarship,
   Campus: campusAndInfrastructure,
   Award: awardsRecognitionCollaborations,
   Seat: seat,
  };
  console.log("coursesarray:", universitySchema.coursesarray);
  console.log("city:", city);
  console.log("state:", state);
  console.log("fee:", fee);
  // console.log("Banner:", Banner);
  // console.log("Logo:", Logo);
  const newCollege = new College(universitySchema);
  await newCollege.save();

  res
   .status(200)
   .json({ message: "Scraped data added to MongoDB successfully" });
 } catch (error) {
  console.error("Error fetching data:", error);
  res.status(500).send("Internal Server Error");
 }
};

module.exports = {
 uploadFields: upload.fields([
  { name: "Banner", maxCount: 1 },
  { name: "Logo", maxCount: 1 },
 ]),
 addScrapedDataToMongoDB: addScrapedDataToMongoDB,
};

// const College = require("../models/Collegemodel");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const multer = require("multer");

// const storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//   cb(null, "uploads/"); // Destination folder for storing uploaded files
//  },
//  filename: function (req, file, cb) {
//   cb(null, Date.now() + file.originalname); // Unique filename to avoid conflicts
//  },
// });

// const upload = multer({ storage: storage });

// // Controller function to add scraped data to MongoDB
// const addScrapedDataToMongoDB = async (req, res) => {
//  try {
//   const url = req.body.url;

//   if (!url) {
//    return res.status(400).json({ error: "URL is required" });
//   }

//   const response = await axios.get(url);
//   const html = response.data;
//   const $ = cheerio.load(html);

//   // Define an object to store the scraped data
//   let collegeData = {};

//   // Extract data from all sections
//   $(".block.box").each((sectionIndex, sectionElement) => {
//    // Extracting section title
//    const sectionTitle = $(sectionElement).find("h2").text().trim();
//    const sectionData = {};

//    // Extract data from the overview section
//    const overviewData = $(sectionElement)
//     .find(".collegeDetail_classRead__yd_kT .collegeDetail_overview__Qr159 p")
//     .text()
//     .trim();
//    sectionData.overview = overviewData;

//    // Extract data from all tables in the section
//    const tables = $(sectionElement).find(
//     ".collegeDetail_classRead__yd_kT .scrollTable table"
//    );

//    if (tables.length > 0) {
//     // ...

//     const tableData = tables
//      .map((tableIndex, tableElement) => {
//       const tableRows = $(tableElement).find("tbody tr");

//       return tableRows
//        .map((rowIndex, rowElement) => {
//         const course = $(rowElement).find("td:nth-child(1)").text().trim();
//         const annualFees = $(rowElement).find("td:nth-child(2)").text().trim();
//         const duration = $(rowElement).find("td:nth-child(3)").text().trim();

//         // Check if the third column exists
//         if (duration) {
//          return [[course, annualFees, duration]];
//         }

//         // If third column is not present, return only the first two columns
//         return [[course, annualFees]];
//        })
//        .get();
//      })
//      .get();

//     // Only add tables data if tables are present
//     sectionData.tables = tableData;

//     // ...

//     // Only add tables data if tables are present
//     sectionData.tables = tableData;
//    }

//    // Only add section to the collegeData object if it has tables or paragraphs
//    if (overviewData || sectionData.tables) {
//     collegeData[sectionTitle] = sectionData;
//    }
//   });

//   // Save the scraped data to MongoDB

//   // Assuming only one university's data is present

//   const overview = Object.keys(collegeData)[0];
//   const universityName = overview.replace(" Overview", "");
//   function fetchDataByCategory(data, universityName, category) {
//    const categoryKey = Object.keys(data).find(
//     (key) =>
//      key.toLowerCase().includes(universityName.toLowerCase()) &&
//      key.toLowerCase().includes(category.toLowerCase())
//    );
//    return categoryKey ? data[categoryKey] : undefined;
//   }

//   const overviewschema = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Overview"
//   );
//   const highlights = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Highlights"
//   );
//   const courses = fetchDataByCategory(collegeData, universityName, "Courses");
//   const admission = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Admission"
//   );
//   var cutOff = fetchDataByCategory(collegeData, universityName, "Cut Off");
//   var placement = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Placements"
//   );
//   var scholarship = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Scholarships"
//   );
//   var campusAndInfrastructure = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Campus"
//   );
//   var awardsRecognitionCollaborations = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Awards, Accreditation, Recognition and Collaborations"
//   );
//   var seat = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Seat Reservation"
//   );
//   var Eligibility = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Eligibility Criteria"
//   );

//   if (campusAndInfrastructure === undefined) {
//    campusAndInfrastructure = req.body.campusAndInfrastructure;
//   }

//   if (cutOff === undefined) {
//    cutOff = req.body.cutOff;
//   }

//   if (placement === undefined) {
//    placement = req.body.placement;
//   }

//   const coursesarray = req.body.coursesarray;
//   const city = req.body.city;
//   const state = req.body.state;
//   const fee = req.body.fee;
//   const Banner = req.file ? req.file.path : req.body.Banner; // Check if file is uploaded, use req.file.path if uploaded, otherwise use req.body.Banner
//   const Logo = req.file ? req.file.path : req.body.Logo; // Check if file is uploaded, use req.file.path if uploaded, otherwise use req.body.Logo
//   // url = req.body.url;

//   const universitySchema = {
//    name: universityName,
//    coursesarray: coursesarray,
//    city: city,
//    state: state,
//    fee: fee,
//    Banner: Banner,
//    url: url,
//    Logo: Logo,

//    overview: overviewschema,

//    Highlight: highlights,
//    Courses: courses,
//    Admission: admission,
//    CutOff: cutOff,
//    Placement: placement,
//    Scholarship: scholarship,
//    Campus: campusAndInfrastructure,
//    Award: awardsRecognitionCollaborations,
//    Seat: seat,
//   };

//   const newCollege = new College(universitySchema);
//   await newCollege.save();

//   res
//    .status(200)
//    .json({ message: "Scraped data added to MongoDB successfully" });
//  } catch (error) {
//   console.error("Error fetching data:", error);
//   res.status(500).send("Internal Server Error");
//  }
// };

// module.exports = {
//  uploadFields: upload.fields([
//   { name: "Banner", maxCount: 1 },
//   { name: "Logo", maxCount: 1 },
//  ]),
//  addScrapedDataToMongoDB: addScrapedDataToMongoDB,
// };

// const College = require("../models/Collegemodel"); // Assuming you have a College model
// const axios = require("axios");
// const cheerio = require("cheerio");

// // Controller function to add scraped data to MongoDB
// const addScrapedDataToMongoDB = async (req, res) => {
//  const url = req.body.url;

//  try {
//   const response = await axios.get(url);
//   const html = response.data;
//   const $ = cheerio.load(html);

//   // Define an object to store the scraped data
//   let collegeData = {};

//   // Extract data from all sections
//   $(".block.box").each((sectionIndex, sectionElement) => {
//    const sectionTitle = $(sectionElement).find("h2").text().trim();
//    const sectionData = {};

//    // Extract data from the overview section
//    const overviewData = $(sectionElement)
//     .find(".collegeDetail_classRead__yd_kT .collegeDetail_overview__Qr159 p")
//     .text()
//     .trim();
//    sectionData.overview = overviewData;

//    // Extract data from all tables in the section
//    const tables = $(sectionElement).find(
//     " .collegeDetail_classRead__yd_kT .scrollTable  table "
//    );

//    if (tables.length > 0) {
//     // ...

//     const tableData = tables
//      .map((tableIndex, tableElement) => {
//       const tableRows = $(tableElement).find("tbody tr");

//       return tableRows
//        .map((rowIndex, rowElement) => {
//         const course = $(rowElement).find("td:nth-child(1)").text().trim();
//         const annualFees = $(rowElement).find("td:nth-child(2)").text().trim();
//         const duration = $(rowElement).find("td:nth-child(3)").text().trim();

//         // Check if the third column exists
//         if (duration) {
//          return [[course, annualFees, duration]];
//         }

//         // If third column is not present, return only the first two columns
//         return [[course, annualFees]];
//        })
//        .get();
//      })
//      .get();

//     // Only add tables data if tables are present
//     sectionData.tables = tableData;

//     // ...

//     // Only add tables data if tables are present
//     sectionData.tables = tableData;
//    }

//    // Only add section to the collegeData object if it has tables or paragraphs
//    if (overviewData || sectionData.tables) {
//     collegeData[sectionTitle] = sectionData;
//    }
//   });

//   // Save the scraped data to MongoDB

//   // Assuming only one university's data is present

//   const overview = Object.keys(collegeData)[0];
//   const universityName = overview.replace(" Overview", "");
//   function fetchDataByCategory(data, universityName, category) {
//    const categoryKey = Object.keys(data).find(
//     (key) =>
//      key.toLowerCase().includes(universityName.toLowerCase()) &&
//      key.toLowerCase().includes(category.toLowerCase())
//    );
//    return categoryKey ? data[categoryKey] : undefined;
//   }

//   const overviewschema = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Overview"
//   );
//   const highlights = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Highlights"
//   );
//   const courses = fetchDataByCategory(collegeData, universityName, "Courses");
//   const admission = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Admission"
//   );
//   var cutOff = fetchDataByCategory(collegeData, universityName, "Cut Off");
//   var placement = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Placements"
//   );
//   var scholarship = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Scholarships"
//   );
//   var campusAndInfrastructure = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Campus"
//   );
//   var awardsRecognitionCollaborations = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Awards, Accreditation, Recognition and Collaborations"
//   );
//   var seat = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Seat Reservation"
//   );
//   var Eligibility = fetchDataByCategory(
//    collegeData,
//    universityName,
//    "Eligibility Criteria"
//   );

//   if (campusAndInfrastructure === undefined) {
//    campusAndInfrastructure = req.body.campusAndInfrastructure;
//   }

//   if (cutOff === undefined) {
//    cutOff = req.body.cutOff;
//   }

//   if (placement === undefined) {
//    placement = req.body.placement;
//   }

//   const coursesarray = req.body.coursesarray;
//   const city = req.body.city;
//   const state = req.body.state;
//   const fee = req.body.fee;
//   const Banner = req.body.Banner;
//   const Logo = req.body.Logo;

//   const universitySchema = {
//    name: universityName,
//    coursesarray: coursesarray,
//    city: city,
//    state: state,
//    fee: fee,
//    Banner: Banner,
//    url: url,
//    Logo: Logo,

//    overview: overviewschema,

//    Highlight: highlights,
//    Courses: courses,
//    Admission: admission,
//    CutOff: cutOff,
//    Placement: placement,
//    Scholarship: scholarship,
//    Campus: campusAndInfrastructure,
//    Award: awardsRecognitionCollaborations,
//    Seat: seat,
//   };

//   const newCollege = new College(universitySchema);
//   await newCollege.save();

//   res
//    .status(200)
//    .json({ message: "Scraped data added to MongoDB successfully" });
//  } catch (error) {
//   console.error("Error fetching data:", error);
//   res.status(500).send("Internal Server Error");
//  }
// };

// module.exports = addScrapedDataToMongoDB;
