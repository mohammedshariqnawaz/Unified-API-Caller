const apiCalls = require('../models/apiDef');


/**
 * Controller to get all service calls
 */
exports.getAllCalls = (req, res, next) => {

    //Find all service calls from DB
    apiCalls.find().then(foundCalls => {
        res.json({
            message: "All api calls",
            apiCalls: foundCalls
        });
    });
}