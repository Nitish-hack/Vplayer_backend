
const {
 getUploads,
 newUpload,
 thumbnailController,
 videoController,
 singleUploadController
  } = require("../controllers/uploadController");

const formidable =require( "express-formidable");

const router = require("express").Router();

//route for uploading video
router.post("/upload",  formidable(),newUpload);

//route for fetching all uploads 
router.get("/alluploads",  getUploads);

//route for fetching  upload thumnail 
router.get("/thumbnail/:vid", thumbnailController);

//route for fetching the video uploaded
router.get("/video/:vid", videoController);

//route for fetching the single  upload data
router.get("/single-upload/:vid", singleUploadController);

module.exports = router;