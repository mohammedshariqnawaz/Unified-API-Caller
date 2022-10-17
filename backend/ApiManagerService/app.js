const express = require('express')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors')

mongoose.connect('mongodb+srv://admin:admin@apicallmanager.gslzllt.mongodb.net/?retryWrites=true&w=majority')


const app = express()
const port = 3000
// const indexRoutes = require('./routes/index')
const getAllCalls = require('./routes/allCalls')
const scheduleCall = require('./routes/scheduleCall')
// const executeNowRoutes = require('./routes/executeNow')
// const executeLaterRoutes = require('./routes/executeLater');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// data = 
//     {   "serviceId": 1,
//         "serviceName": "Testing",
//         "apiMethod": "PUT",
//         "apiEndpoint": "https://jsonplaceholder.typicode.com/todos/1",
//         "apiHeaders": {
//             'Content-Type': 'application/json'
//         },
//         "apiBody": {
//             "title": "delectus aut autem",
//             "completed": false
//         },
//         "apiExecuteNow":true,
//         "dataTime": "2019-02-03T06:48:07"
//     }

app.use(cors())
app.use(express.json());


//Routes
// app.use('/', indexRoutes);
app.use('/calls',getAllCalls)
app.use('/schedule',scheduleCall)
// app.use('/callnow', executeNowRoutes);
// app.use('/executelater',executeLaterRoutes)
// app.get('/',(req,res)=>{
//     res.send('Hello world from Shariq!!!')
// })





app.listen(port, () => {
    console.log(`Api Call Manager Serivce running on port ${port}`)
});