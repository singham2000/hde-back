const catchAsyncError = require('../utils/catchAsyncError');
const ImageModel = require('../models/image');

exports.getImages = catchAsyncError(async (req, res) => {
    const { location, page } = req.query;
    const images = await ImageModel.find({ location }).sort({ createdAt: "desc" })
        .skip((page - 1) * 10)
        .limit(10)
        .exec();

    res.status(200).json({
        success: true,
        message: 'Images fetched successfully',
        images
    });
});

exports.setImage = catchAsyncError(async (req, res) => {
    const { location } = req.query;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const base64String = req.file.buffer.toString('base64');
    try {
        const image = await ImageModel.create({
            imageData: base64String,
            location
        });
        image.save();
        res.status(200).json({
            success: true,
            message: 'Image saved successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Image not saved'
        });
    }
});