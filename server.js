const express = require("express");
const db = require("./config/db");
const port = 5000;
const routes = require("./routes/Addcollege");
const fetchCollege = require("./routes/Fetchcollege");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/api", fetchCollege);

app.listen(port, () => {
 console.log(`server is listening on ${port}`);
});
