const apiCalls = require('../models/apiDef');

exports.getAllCalls = (req, res, next) => {

    //Find all service calls from DB
    apiCalls.find().then(foundCalls => {
        res.json({
            message: "All api calls",
            apiCalls: foundCalls
        });
    });
}