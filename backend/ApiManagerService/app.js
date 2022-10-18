const express = require('express')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors')

//Import routes
const getAllCalls = require('./routes/allCalls')
const scheduleCall = require('./routes/scheduleCall')

//Connect to DB
mongoose.connect('mongodb+srv://admin:admin@apicallmanager.gslzllt.mongodb.net/?retryWrites=true&w=majority')

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());


//Routes
app.use('/calls',getAllCalls)
app.use('/schedule',scheduleCall)

app.listen(port, () => {
    console.log(`Api Call Manager Serivce running on port ${port}`)
});