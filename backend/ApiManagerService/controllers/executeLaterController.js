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
    schedule.scheduleJob(isoDate, async function () {
        try {
            let response
            data = req.body.call
        
            let headers = data.apiHeaders.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
            if (data.apiMethod === "GET") {
              response = await axios.get(data.apiEndpoint)
            } else if (data.apiMethod === "POST") {
        
              response = await axios.post(data.apiEndpoint, JSON.stringify(data.apiBody), {
                headers: headers
              })
            } else if (data.apiMethod === "PUT") {
                
              response = await axios.put(data.apiEndpoint, JSON.stringify(data.apiBody), {
                headers: headers
              })
            } else if (data.apiMethod === "DELETE") {
              await axios.delete(data.apiEndpoint)
            }

            let call = new apiCalls({
              serviceId: data.serviceId,
              serviceName: data.serviceName,
              apiMethod: data.apiMethod,
              apiEndpoint: data.apiEndpoint,
              apiHeaders: data.apiHeaders,
              apiBody: JSON.parse(data.apiBody),
              apiExecuteNow: data.apiExecuteNow,
              dataTime: data.dateTime,
              apiResponse: response.data
            });
        
            let savedCall = await call.save();
            res.status(201).json({
              message: 'Service Call created successfully!',
              call: savedCall
            });
        
          } catch (error) {
            console.log("Error while fetching " + error.response)
          }

        // data = req.body.call
        // try {
        //     axios.get(data.apiEndpoint).then(resp => {
        //         let call = new apiCalls({
        //             serviceName: data.serviceName,
        //             apiMethod: data.apiMethod,
        //             apiEndpoint: data.apiEndpoint,
        //             apiHeaders: data.apiHeaders,
        //             apiBody: JSON.parse(data.apiBody),
        //             apiRequest: resp.data,
        //             apiExecuteNow: true,
        //             dataTime: data.dateTime,
        //             apiResponse: resp.data
        //         });
        //         call
        //             .save()
        //             .then(callSaved => {
        //                 res.status(201).json({
        //                     message: 'Scheduled Service Call created successfully!',
        //                     call: callSaved
        //                 });
        //             })
        //             .catch(err => console.log('err', err));
        //     });

        // } catch (error) {
        //     console.log("Error while schecduled fetching " + error)
        // }
    });
}