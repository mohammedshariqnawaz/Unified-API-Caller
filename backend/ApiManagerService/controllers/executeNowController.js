apiCalls = require('../models/apiDef');
const axios = require('axios');

exports.executeServiceCall = async (req, res, next) => {
  console.log("Executing service call now!")
  try {
    let response = {}
    data = req.body.call

    let headers = data.apiHeaders.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
    if (data.apiMethod === "GET") {
      response = await axios.get(data.apiEndpoint)
    } else if (data.apiMethod === "POST") {

      response = await axios.post(data.apiEndpoint, JSON.stringify(data.apiBody), {
        headers: headers
      })
    } else if (data.apiMethod === "PUT") {
      
      response = await axios.put(data.apiEndpoint,data.apiBody, {
        headers: headers
        
      })
    } else if (data.apiMethod === "DELETE") {
      await axios.delete(data.apiEndpoint,{headers:headers})
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
    console.log("Error while fetching " + error)
  }
}