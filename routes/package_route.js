const express = require('express')
const packageRouter = express.Router();
const packageController = require('../controllers/packageController')
const LoginAuht = require('../middleware/checkLogin')
const packageImageUploade = require('../middleware/packageImageUpload')
const galleryUploade = require('../middleware/galleryUpload')

packageRouter.use('/uploads/package', express.static('uploads/package'));
packageRouter.use('/uploads/gallery', express.static('uploads/gallery'));



packageRouter.post("/package-register",LoginAuht.checkLogin,packageImageUploade.packageImageUpload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'feature_image', maxCount: 1 },
	{ name: 'gallery', maxCount: 10 }
    ]),packageController.packageRegister)

packageRouter.post("/upload-gallery",LoginAuht.checkLogin,galleryUploade.uploadGallery.fields([
     { name: 'gallery', maxCount: 10 }
    ]),packageController.packageGalleryImageAdd)    

packageRouter.get("/package-list",LoginAuht.checkLogin,packageController.packageList)
packageRouter.get("/gallery-list",LoginAuht.checkLogin,packageController.galleryList)

packageRouter.get("/package-list/:id",LoginAuht.checkLogin,packageController.packageListById)
packageRouter.delete("/package-delete/:id",LoginAuht.checkLogin,packageController.packageDelete)
module.exports = packageRouter;