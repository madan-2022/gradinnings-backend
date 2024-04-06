const express = require("express");
const College = require("../models/Collegemodel");
const router = express.Router();

router.get("/colleges", async (req, res) => {
 try {
  const city = "Delhi"; // Extract city from query parameters

  // Check if city is provided
  if (!city) {
   return res.status(400).json({ error: "City parameter is missing" });
  }

  // Fetch colleges from the database based on the city
  const colleges = await College.find({ city: city });

  // Check if colleges exist
  if (!colleges || colleges.length === 0) {
   return res
    .status(404)
    .json({ error: "No colleges found for the provided city" });
  }

  // Send the colleges as JSON response
  res.json(colleges);
 } catch (error) {
  console.error("Error fetching colleges:", error);
  res.status(500).send("Internal Server Error");
 }
});
// router.get("/all-colleges", async (req, res) => {
//  const page = parseInt(req.query.page) || 1; // Default page number is 1
//  const limit = parseInt(req.query.limit) || 10; // Default limit is 10

//  try {
//   let query = College.find();
//   let totalCount;

//   // Check if page and limit parameters are provided
//   if (req.query.page && req.query.limit) {
//    query = query.skip((page - 1) * limit).limit(limit);
//    totalCount = await College.countDocuments();
//   } else {
//    totalCount = await College.countDocuments();
//   }

//   const colleges = await query;

//   res.json({
//    total: totalCount,
//    page: page,
//    limit: limit,
//    colleges: colleges,
//   });
//  } catch (error) {
//   res.status(500).json({ message: error.message });
//  }
// });
// router.get("/all-colleges", async (req, res) => {
//  const page = parseInt(req.query.page) || 1; // Default page number is 1
//  const limit = parseInt(req.query.limit) || 10; // Default limit is 10

//  try {
//   let query = College.find();
//   let totalCount;

//   // Check if page and limit parameters are provided
//   if (req.query.page && req.query.limit) {
//    query = query.skip((page - 1) * limit).limit(limit);
//    totalCount = await College.countDocuments();
//   } else {
//    totalCount = await College.countDocuments();
//   }

//   const colleges = await query;

//   res.json({
//    total: totalCount,
//    page: page,
//    limit: limit,
//    colleges: colleges,
//   });
//  } catch (error) {
//   res.status(500).json({ message: error.message });
//  }
// });
router.get("/all-colleges", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
 
  try {
    let query = College.find().select('-logo -banner'); // Exclude logo and banner fields
    let totalCount;
 
    if (req.query.page && req.query.limit) {
      query = query.skip((page - 1) * limit).limit(limit);
      totalCount = await College.countDocuments();
    } else {
      totalCount = await College.countDocuments();
    }
 
    const colleges = await query.lean();
 
    res.json({
      total: totalCount,
      page: page,
      limit: limit,
      colleges: colleges,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/college/:id", async (req, res) => {
  const collegeId = req.params.id;

  try {
    const college = await College.findById(collegeId).select('-logo -banner').lean();

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// router.get("/all-colleges", async (req, res) => {
//  const page = parseInt(req.query.page) || 1; // Default page number is 1
//  const limit = parseInt(req.query.limit) || 10; // Default limit is 10

//  try {
//   let colleges, totalCount;

//   // Check if page and limit parameters are provided
//   if (req.query.page && req.query.limit) {
//    colleges = await College.find()
//     .skip((page - 1) * limit)
//     .limit(limit);

//    totalCount = await College.countDocuments(); // Count total number of documents
//   } else {
//    colleges = await College.find(); // Retrieve all data
//    totalCount = colleges.length; // Total count is the length of retrieved data
//   }

//   res.json({
//    total: totalCount,
//    page: page,
//    limit: limit,
//    colleges: colleges,
//   });
//  } catch (error) {
//   res.status(500).json({ message: error.message });
//  }
// });

// Export the router
module.exports = router;

// Export the router
