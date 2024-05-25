const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./src/config/database.js");

dotenv.config({ path: "./src/config/.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] }));
connectDB();

const donation = require('./src/routes/donations.js');
app.use('/api/donations', donation);

const images = require('./src/routes/images.js');
app.use('/api/images', images);
const port = process.env.PORT || 3000;
try {
    const server = app.listen(3000 , () => {
        const port = server.address().port;
        console.log("App is listening on ", port);
    });
} catch (e) {
    console.log(e);
}