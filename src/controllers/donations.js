const catchAsyncError = require('../utils/catchAsyncError');
const DonationModel = require('../models/donation');

exports.getDonations = catchAsyncError(async (_, res) => {

    const donations = await DonationModel.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        donations
    })

});

exports.setDonations = catchAsyncError(async (req, res) => {
    const { name, amount, street, district, pinCode, state } = req.body;
    if (!name || !amount || !street || !district || !pinCode || !state)
        res.status(404).json({
            success: false,
            message: 'Missing or invalid fields'
        });
    try {
        const donation = await DonationModel.create({
            name, amount, street, district, pinCode, state
        });
        await donation.save();
        res.status(200).json({
            success: true,
            message: 'Donation saved successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error saving donation, error: ' + error.message
        })
    }
});