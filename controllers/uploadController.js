const Upload = require("../models/uploadModel.js");
const fs=require("fs");
const dotenv =require("dotenv");

dotenv.config();

// api/uploads/alluploads
module.exports.getUploads = async (req, res) => {
        try {
          const uploads = await Upload
            .find({})
            .select("-thumbnail")
            .select("-video")
            .sort({ uploadedAt: -1 });
          res.status(200).send({
            success: true,
            countTotal: uploads.length,
            message: "All Uploads ",
            uploads,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error in getting uploads",
            error: error.message,
          });
        }
      };

// api/uploads/upload
module.exports.newUpload = async (req, res) => {
    try {
        const { title, description } = req.fields;
        const { thumbnail ,video} = req.files;
     

        switch (true) {
            case !title:
              return res.status(500).send({ error: "Title is Required" });
           
            case thumbnail && thumbnail.size > 1000000:
              return res.status(500).send({ error: "Thumbnail is Required and should be less then 1mb" });
            case video && video.size > 10000000:
              return res.status(500).send({ error: "Uploaded Video is Required and should be less then 10mb" });
          }
          const newUpload = new Upload({ ...req.fields});
    if (thumbnail) {
        newUpload.thumbnail.data = fs.readFileSync(thumbnail.path);
        newUpload.thumbnail.contentType = thumbnail.type;
    }
    if (video) {
        newUpload.video.data = fs.readFileSync(video.path);
        newUpload.video.contentType = video.type;
    }
    await newUpload.save();
    res.status(201).send({
      message: "Video Uploaded Successfully!",
      newUpload,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
         
            error,
            message: "Error in uploading",
          });
    }
}

// api/uploads/thumbnail/:vid
module.exports.thumbnailController = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.vid).select("thumbnail");
    if (upload.thumbnail.data) {
      res.set("Content-type", upload.thumbnail.contentType);
      return res.status(200).send(upload.thumbnail.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting thumbnail",
      error,
    });
  }
};

// api/uploads/video/:vid
module.exports.videoController = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.vid).select("video");
    if (upload.video.data) {
      res.set("Content-type", upload.video.contentType);
      return res.status(200).send(upload.video.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting video",
      error,
    });
  }
};


// api/uploads/single-upload/:vid
module.exports.singleUploadController = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.vid).select("-video").select(-"thumbnail");
   if(!upload) res.status(404).send({message:"upload not found!"});
   res.status(200).send({
    message: "single Upload found! ",
    upload,
  });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting video",
      error,
    });
  }
};

