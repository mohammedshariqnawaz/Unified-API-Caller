exports.getAllCalls = (req, res, next) => {
    apiCalls.find().then(foundCalls => {
        res.json({
            message: "All api calls",
            apiCalls: foundCalls
        });
    });
}