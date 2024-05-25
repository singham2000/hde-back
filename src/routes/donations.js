const express = require('express');
const router = express.Router();
const { getDonations, setDonations } = require('../controllers/donations');

router.route('/donations')
    .get(getDonations)
    .post(setDonations)

module.exports = router;