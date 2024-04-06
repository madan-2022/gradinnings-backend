import React, { useState } from "react";
import {
 Box,
 Text,
 Button,
 Textarea,
 Input,
 FormControl,
 Grid,
 GridItem,
 Heading,
} from "@chakra-ui/react";
import axios from "axios";

function DataForm() {
 const [placement, setPlacement] = useState({
  overview: "",
  tables: [{ table1: [] }, { table2: [] }],
 });
 const [campusAndInfrastructure, setCampusAndInfrastructure] = useState({
  overview: "",
  tables: [{ facilities: [] }, { services: [] }],
 });
 const [cutOff, setCutOff] = useState({
  overview: "",
  tables: [{ category1: [] }, { category2: [] }],
 });
 const [coursesarray, setCoursesArray] = useState([]);
 const [city, setCity] = useState("");
 const [state, setState] = useState("");
 const [fee, setFee] = useState("");
 const [banner, setBanner] = useState("");
 const [logo, setLogo] = useState("");
 const [url, setUrl] = useState("");

 const handleBannerImg = (event) => {
  const file = event.target.files[0];
  if (file) {
   const reader = new FileReader();
   reader.onloadend = () => {
    setBanner(reader.result);
   };
   reader.readAsDataURL(file);
  }
 };

 const handleLogoImg = (event) => {
  const file = event.target.files[0];
  if (file) {
   const reader = new FileReader();
   reader.onloadend = () => {
    setLogo(reader.result);
   };
   reader.readAsDataURL(file);
  }
 };

 const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const formData = {
   placement: placement,
   campusAndInfrastructure: campusAndInfrastructure,
   cutOff: cutOff,
   coursesarray: coursesarray,
   city: city,
   state: state,
   fee: fee,
   Banner: banner,
   Logo: logo,
   url: url,
  };
  console.log("formData:", formData);
  try {
   const response = await axios.post(
    "http://localhost:5000/api/add",
    formData,
    {
     headers: {
      "Content-Type": "multipart/form-data",
     },
    }
   );
   console.log(response.data);
  } catch (error) {
   console.error("Error:", error);
  }
 };

 return (
  <Box p={5} w="80%" margin={"auto"}>
   <Heading>Data Collection Form</Heading>
   <form onSubmit={handleSubmit}>
    <Grid
     templateAreas={`"placementOverview placementOverview placementTable1 placementTable1"
                  "placementTable2 placementTable2 campusOverview campusOverview"
                  "facilitiesTable facilitiesTable servicesTable servicesTable"
                  "cutOffOverview cutOffOverview category1Table category1Table"
                  "category2Table category2Table coursesarray coursesarray"
                  "city state fee url"
                  "banner banner logo logo"
                  
                  `}
     gridTemplateRows={"1fr 1fr 1fr 1fr 1fr 1fr"}
     gridTemplateColumns={"1fr 1fr 1fr 1fr"}
     gap="5"
     color="blackAlpha.700"
     fontWeight="bold"
    >
     <GridItem
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      p="2"
      area={"placementOverview"}
     >
      <label htmlFor=""> Placement Overview:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="placementOverview"
        value={placement.overview}
        onChange={(e) =>
         setPlacement({ ...placement, overview: e.target.value })
        }
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"placementTable1"}
     >
      <label htmlFor="placementTable1">Table 1:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="placementTable1"
        value={placement.tables[0].table1.join("\n")}
        onChange={(e) =>
         setPlacement({
          ...placement,
          tables: [
           { table1: e.target.value.split("\n") },
           ...placement.tables.slice(1),
          ],
         })
        }
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"placementTable2"}
     >
      <label htmlFor="placementTable2">Table 2:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="placementTable2"
        value={placement.tables[1].table2.join("\n")}
        onChange={(e) =>
         setPlacement({
          ...placement,
          tables: [placement.tables[0], { table2: e.target.value.split("\n") }],
         })
        }
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"campusOverview"}
     >
      <h2>Campus and Infrastructure</h2>
      <label htmlFor="campusOverview">Overview:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="campusOverview"
        value={campusAndInfrastructure.overview}
        onChange={(e) =>
         setCampusAndInfrastructure({
          ...campusAndInfrastructure,
          overview: e.target.value,
         })
        }
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"facilitiesTable"}
     >
      <label htmlFor="facilitiesTable">Facilities:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="facilitiesTable"
        value={campusAndInfrastructure.tables[0].facilities.join("\n")}
        onChange={(e) =>
         setCampusAndInfrastructure({
          ...campusAndInfrastructure,
          tables: [
           { facilities: e.target.value.split("\n") },
           ...campusAndInfrastructure.tables.slice(1),
          ],
         })
        }
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"servicesTable"}
     >
      <label htmlFor="servicesTable">Services:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="servicesTable"
        value={campusAndInfrastructure.tables[1].services.join("\n")}
        onChange={(e) =>
         setCampusAndInfrastructure({
          ...campusAndInfrastructure,
          tables: [
           campusAndInfrastructure.tables[0],
           { services: e.target.value.split("\n") },
          ],
         })
        }
       />
      </FormControl>
     </GridItem>

     {/* Cut Off Section */}
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"cutOffOverview"}
     >
      <h2>Cut Off</h2>
      <label htmlFor="cutOffOverview">Overview:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="cutOffOverview"
        value={cutOff.overview}
        onChange={(e) => setCutOff({ ...cutOff, overview: e.target.value })}
       />
      </FormControl>
     </GridItem>
     {/* Cut Off Tables */}
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"category1Table"}
     >
      <label htmlFor="category1Table">Category 1:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="category1Table"
        value={cutOff.tables[0].category1.join("\n")}
        onChange={(e) =>
         setCutOff({
          ...cutOff,
          tables: [
           { category1: e.target.value.split("\n") },
           ...cutOff.tables.slice(1),
          ],
         })
        }
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"category2Table"}
     >
      <label htmlFor="category2Table">Category 2:</label>
      <FormControl id="name" isRequired>
       <Textarea
        id="category2Table"
        value={cutOff.tables[1].category2.join("\n")}
        onChange={(e) =>
         setCutOff({
          ...cutOff,
          tables: [cutOff.tables[0], { category2: e.target.value.split("\n") }],
         })
        }
       />
      </FormControl>
     </GridItem>
     {/* Other Information */}
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"coursesarray"}
     >
      <h2>Other Information</h2>
      <label htmlFor="coursesarray">Courses Array:</label>
      <FormControl id="name" isRequired>
       <Input
        id="coursesarray"
        type="text"
        value={coursesarray}
        onChange={(e) => setCoursesArray(e.target.value.split(","))}
       />
      </FormControl>
     </GridItem>
     <GridItem p="2" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" area={"city"}>
      <label htmlFor="city">City:</label>
      <FormControl id="name" isRequired>
       <Input
        id="city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
       />
      </FormControl>
     </GridItem>
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"state"}
     >
      <label htmlFor="state">State:</label>
      <FormControl id="name" isRequired>
       <Input
        id="state"
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
       />
      </FormControl>
     </GridItem>
     <GridItem p="2" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" area={"fee"}>
      <label htmlFor="fee">Fee:</label>
      <FormControl id="name" isRequired>
       <Input
        id="fee"
        type="text"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
       />
      </FormControl>
     </GridItem>
     {/* Banner Image Upload */}
     <GridItem
      p="2"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      area={"banner"}
     >
      <h2>Upload Banner Image</h2>
      <FormControl id="name" isRequired>
       <Input
        type="file"
        name="banner"
        accept="image/*"
        onChange={handleBannerImg}
       />
      </FormControl>
     </GridItem>
     <GridItem p="2" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" area={"logo"}>
      <h2>Upload Logo Image</h2>
      <FormControl id="name" isRequired>
       <Input
        type="file"
        name="logo"
        accept="image/*"
        onChange={handleLogoImg}
       />
      </FormControl>
     </GridItem>
     {/* URL Input */}
     <GridItem p="2" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" area={"url"}>
      <label htmlFor="url">URL:</label>
      <FormControl id="name" isRequired>
       <Input
        id="url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
       />
      </FormControl>
     </GridItem>
    </Grid>

    {/* Submit button */}
    <Button mt="10px" w="200px" bg={"teal"} type="submit">
     Submit
    </Button>
   </form>
  </Box>
 );
}

export default DataForm;

// import React, { useState } from "react";
// import { Box, Text, Textarea, Input } from "@chakra-ui/react";
// import { Axios } from "axios";
// function DataForm() {
//  const [placement, setPlacement] = useState({
//   overview: "",
//   tables: [{ table1: [] }, { table2: [] }],
//  });
//  const [campusAndInfrastructure, setCampusAndInfrastructure] = useState({
//   overview: "",
//   tables: [{ facilities: [] }, { services: [] }],
//  });
//  const [cutOff, setCutOff] = useState({
//   overview: "",
//   tables: [{ category1: [] }, { category2: [] }],
//  });
//  const [coursesArray, setCoursesArray] = useState([]);
//  const [city, setCity] = useState("");
//  const [state, setState] = useState("");
//  const [fee, setFee] = useState("");
//  const [banner, setBanner] = useState("");
//  const [logo, setLogo] = useState("");
//  const [url, setUrl] = useState("");
//  const handleBannerImg = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//    const reader = new FileReader();
//    reader.onloadend = () => {
//     setBanner(reader.result);
//    };
//    reader.readAsDataURL(file);
//   }
//  };
//  const handleLogoImg = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//    const reader = new FileReader();
//    reader.onloadend = () => {
//     setLogo(reader.result);
//    };
//    reader.readAsDataURL(file);
//   }
//  };
//  const handleSubmit = async () => {
//   const formData = {
//    placement: placement,
//    campusAndInfrastructure: campusAndInfrastructure,
//    cutOff: cutOff,
//    coursesArray: coursesArray,
//    city: city,
//    state: state,
//    fee: fee,
//    Banner: banner,
//    Logo: logo,
//    url: url,
//   };
//   try {
//    const response = await Axios.post(
//     // Correct axios usage
//     "http://localhost:5000/api/add",
//     formData,
//     {
//      headers: {
//       "Content-Type": "multipart/form-data",
//      },
//     }
//    );
//    console.log(response.data);
//   } catch (error) {
//    console.error("Error:", error);
//   }
//   console.log(formData);
//   // You can perform further actions here, like sending formData to your backend
//  };

//  return (
//   <Box border={"1px solid red"}>
//    <Text>Data Collection Form</Text>
//    <Box>
//     {/* Placement Section */}
//     <h2>Placement</h2>
//     <label htmlFor="placementOverview">Overview:</label>

//     <Textarea
//      id="placementOverview"
//      value={placement.overview}
//      onChange={(e) => setPlacement({ ...placement, overview: e.target.value })}
//      rows="4"
//      cols="50"
//     ></Textarea>

//     {/* Tables */}
//     <label htmlFor="placementTable1">Table 1:</label>

//     <Textarea
//      id="placementTable1"
//      value={placement.tables[0].table1.join("\n")}
//      onChange={(e) =>
//       setPlacement({
//        ...placement,
//        tables: [
//         { table1: e.target.value.split("\n") },
//         ...placement.tables.slice(1),
//        ],
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     <label htmlFor="placementTable2">Table 2:</label>

//     <Textarea
//      id="placementTable2"
//      value={placement.tables[1].table2.join("\n")}
//      onChange={(e) =>
//       setPlacement({
//        ...placement,
//        tables: [placement.tables[0], { table2: e.target.value.split("\n") }],
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     {/* Campus and Infrastructure Section */}
//     <h2>Campus and Infrastructure</h2>
//     <label htmlFor="campusOverview">Overview:</label>

//     <Textarea
//      id="campusOverview"
//      value={campusAndInfrastructure.overview}
//      onChange={(e) =>
//       setCampusAndInfrastructure({
//        ...campusAndInfrastructure,
//        overview: e.target.value,
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     {/* Tables */}
//     <label htmlFor="facilitiesTable">Facilities:</label>

//     <Textarea
//      id="facilitiesTable"
//      value={campusAndInfrastructure.tables[0].facilities.join("\n")}
//      onChange={(e) =>
//       setCampusAndInfrastructure({
//        ...campusAndInfrastructure,
//        tables: [
//         { facilities: e.target.value.split("\n") },
//         ...campusAndInfrastructure.tables.slice(1),
//        ],
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     <label htmlFor="servicesTable">Services:</label>

//     <Textarea
//      id="servicesTable"
//      value={campusAndInfrastructure.tables[1].services.join("\n")}
//      onChange={(e) =>
//       setCampusAndInfrastructure({
//        ...campusAndInfrastructure,
//        tables: [
//         campusAndInfrastructure.tables[0],
//         { services: e.target.value.split("\n") },
//        ],
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     {/* Cut Off Section */}
//     <h2>Cut Off</h2>
//     <label htmlFor="cutOffOverview">Overview:</label>

//     <Textarea
//      id="cutOffOverview"
//      value={cutOff.overview}
//      onChange={(e) => setCutOff({ ...cutOff, overview: e.target.value })}
//      rows="4"
//      cols="50"
//     ></Textarea>

//     {/* Tables */}
//     <label htmlFor="category1Table">Category 1:</label>

//     <Textarea
//      id="category1Table"
//      value={cutOff.tables[0].category1.join("\n")}
//      onChange={(e) =>
//       setCutOff({
//        ...cutOff,
//        tables: [
//         { category1: e.target.value.split("\n") },
//         ...cutOff.tables.slice(1),
//        ],
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     <label htmlFor="category2Table">Category 2:</label>

//     <Textarea
//      id="category2Table"
//      value={cutOff.tables[1].category2.join("\n")}
//      onChange={(e) =>
//       setCutOff({
//        ...cutOff,
//        tables: [cutOff.tables[0], { category2: e.target.value.split("\n") }],
//       })
//      }
//      rows="4"
//      cols="50"
//     ></Textarea>

//     {/* Other Information */}
//     <h2>Other Information</h2>
//     <label htmlFor="coursesArray">Courses Array:</label>

//     <Input
//      id="coursesArray"
//      type="text"
//      value={coursesArray}
//      onChange={(e) => setCoursesArray(e.target.value.split(","))}
//     />

//     <label htmlFor="city">City:</label>

//     <Input
//      id="city"
//      type="text"
//      value={city}
//      onChange={(e) => setCity(e.target.value)}
//     />

//     <label htmlFor="state">State:</label>

//     <Input
//      id="state"
//      type="text"
//      value={state}
//      onChange={(e) => setState(e.target.value)}
//     />

//     <label htmlFor="fee">Fee:</label>

//     <Input
//      id="fee"
//      type="text"
//      value={fee}
//      onChange={(e) => setFee(e.target.value)}
//     />

//     <label htmlFor="banner">Banner:</label>

//     {/* <Input
//      id="banner"
//      type="text"
//      value={banner}
//      onChange={(e) => setBanner(e.target.value)}
//     /> */}
//     <h2>Upload Banner Image</h2>
//     <Input
//      type="file"
//      name="banner"
//      accept="image/*"
//      onChange={handleBannerImg}
//      style={{
//       marginBottom: "10px",
//       fontSize: "1.5rem",
//       textAlign: "center",
//      }}
//     />
//     <h2>Upload Logo Image</h2>
//     <Input
//      type="file"
//      name="logo"
//      accept="image/*"
//      onChange={handleLogoImg}
//      style={{
//       marginBottom: "10px",
//       fontSize: "1.5rem",
//       textAlign: "center",
//      }}
//     />

//     {/* <label htmlFor="logo">Logo:</label>

//     <Input
//      id="logo"
//      type="text"
//      value={logo}
//      onChange={(e) => setLogo(e.target.value)}
//     /> */}

//     <label htmlFor="url">URL:</label>

//     <Input
//      id="url"
//      type="text"
//      value={url}
//      onChange={(e) => setUrl(e.target.value)}
//     />

//     <button onClick={handleSubmit}>Submit</button>
//    </Box>
//   </Box>
//  );
// }

// export default DataForm;
