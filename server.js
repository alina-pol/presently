const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
const appController = require('./controllers/meditations.js')
const methodOverride = require('method-override')
const Meditation = require("./models/meditations.js")
const session = require('express-session')

// Mongo error/success
const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

// This adds data to req.body so we can access it in the CREATE action
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));

// Middleware
app.use(methodOverride("_method"))
app.use("/meditations", appController)


// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));