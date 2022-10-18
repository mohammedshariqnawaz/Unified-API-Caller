const apiCalls = require('../models/apiDef');
const axios = require('axios');


/**
 * Helper function to carry out service calls to given service endpoints depending on the method
 * @function
 */
const helperFuctionToMakeCalls = async (req, res, next) => {
    try {
        data = req.body
        let response = {}
        
        //Format headers from apiBody
        let headers = data.apiHeaders.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})

        //Handle request forwards based on REST verb
        if (data.apiMethod === "GET") {
            response = await axios.get(data.apiEndpoint)
        } else if (data.apiMethod === "POST") {
            console.log(data)
            response = await axios.post(data.apiEndpoint, data.apiBody, { headers: headers })
        } else if (data.apiMethod === "PUT") {
            response = await axios.put(data.apiEndpoint, data.apiBody, { headers: headers })
        } else if (data.apiMethod === "DELETE") {
            await axios.delete(data.apiEndpoint, { headers: headers })
        }
        console.log("ds",data)
        //Create a new Service call  
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

        // store it to DB along with its response
        let savedCall = await call.save();

        res.status(201).json({
            message: 'Service Call created successfully!',
            call: savedCall
        });

    } catch (error) {
        console.log("Error while fetching " + error)
    }
}

module.exports = helperFuctionToMakeCalls;