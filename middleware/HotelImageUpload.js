const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/hotels'); // Uploads directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
    }
  });

  const HotelImageUpload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: function (req, file, cb) {
      // Check file types
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb('Error: Images only! JPEG, JPG, PNG files allowed.');
    }
  });

  module.exports ={
    HotelImageUpload:HotelImageUpload
  }
