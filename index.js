const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./src/config/database.js");

dotenv.config({ path: "./src/config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ['https://hde-front.vercel.app/', 'http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
};

app.use(cors(corsOptions));
connectDB();

const donation = require('./src/routes/donations.js');
app.use('/api/donations', donation);

const images = require('./src/routes/images.js');
app.use('/api/images', images);

try {
    const server = app.listen(() => {
        const port = server.address().port;
        console.log("App is listening on ", port);
    });
} catch (e) {
    console.log(e);
}