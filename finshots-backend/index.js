require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');

const app = express();

// DB connection
mongoose.connect(process.env.DATABASE, {}).then(() => {
    console.log("DB CONNECTED");
});


// Middleware
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');

app.use("/api", authRoutes);


const port = 3001;

app.get('/', (req, res) => {
    res.send('Working');
})

app.listen(port, () => { console.log("Port is ready");})
