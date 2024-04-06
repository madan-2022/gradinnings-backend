const express = require("express");
const router = express.Router();
const ScrappeddataController = require("../controller/College");

router.post(
 "/add",
 ScrappeddataController.uploadFields,
 ScrappeddataController.addScrapedDataToMongoDB
);

module.exports = router;

// const express = require('express')
// const router = express.Router();

// const Scrappeddata = require('../controller/College')

// router.post('/add',Scrappeddata)

// module.exports=router;
