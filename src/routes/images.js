const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getImages, setImage } = require('../controllers/images');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/images')
    .get(getImages)
    .post(upload.single('file'), setImage);

module.exports = router;