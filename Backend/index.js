const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config();

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

//routes
const userRoutes = require('./routes')
app.use('/api/v1', userRoutes)

//api listening on port 5000
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( result => {
        app.listen(process.env.PORT || 8081);
        console.log(`Xmeme backend running on ${process.env.PORT || 8081} ...`)
        console.log('DB Connected');
    })
    .catch( err => {
        console.log(err);
    });