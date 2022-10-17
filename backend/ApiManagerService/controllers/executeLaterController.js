apiCalls = require('../models/apiDef');
const axios = require('axios');
const schedule = require('node-schedule');

exports.scheduleServiceCall = (req, res, next) => {
    // Converting ISO Date to Human Readable Format
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        dateStyle: 'full', timeStyle: 'long' 
      });

    const givenDate = req.body.call.dateTime
    const isoDate = new Date(givenDate); //Convert to ISO format
    console.log("Scheduling Job for you at "+ dateTimeFormat.format(isoDate))
    
    //Scheduling Job
    schedule.scheduleJob(isoDate, function () {
        data = req.body.call
        try {
            axios.get(data.apiEndpoint).then(resp => {
                let call = new apiCalls({
                    serviceName: data.serviceName,
                    apiMethod: data.apiMethod,
                    apiEndpoint: data.apiEndpoint,
                    apiHeaders: data.apiHeaders,
                    apiBody: JSON.parse(data.apiBody),
                    apiRequest: resp.data,
                    apiExecuteNow: true,
                    dataTime: data.dateTime,
                    apiResponse: resp.data
                });
                call
                    .save()
                    .then(callSaved => {
                        res.status(201).json({
                            message: 'Scheduled Service Call created successfully!',
                            call: callSaved
                        });
                    })
                    .catch(err => console.log('err', err));
            });

        } catch (error) {
            console.log("Error while schecduled fetching " + error)
        }
    });
}