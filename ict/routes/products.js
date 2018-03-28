const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.get("/", (req, res, next) => {
    res.status(200).json({
        message:'Product is fetched Successfully',
    });
});

router.post("/", upload.array('productImage',10), (req, res, next) => {
  const allFiles= req.files;
  const fileName=[];
  if(allFiles){
    allFiles.forEach(function(file){
      console.log(file);
      fileName.push(file.originalname)
    });
  }
  const products={
    name:req.body.name,
    productImage:fileName
  };
  res.status(201).json({
    message:'Product was Created Successfully',
    productCreated:products
  });
});

module.exports = router;
