apiCalls = require('../models/apiDef');
const axios = require('axios');

exports.executeServiceCall = (req, res, next) => {
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
            message: 'Service Call created successfully!',
            call: callSaved
          });
        })
        .catch(err => console.log('err', err));
    });

  } catch (error) {
    console.log("Error while fetching " + error)
  }
}