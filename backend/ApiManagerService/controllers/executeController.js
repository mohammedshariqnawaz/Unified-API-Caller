const helperFuctionToMakeCalls = require('../utils/helper')
const schedule = require('node-schedule');

/**
 * Controller to execute service call now
 */
exports.executeServiceCall = async (req, res, next) => {
  console.log("Executing service call now!")
  helperFuctionToMakeCalls(req,res)
}

/**
 * Controller to schedule service call
 */
exports.scheduleServiceCall = (req, res, next) => {
  // Helper to convert ISO Date Format to Human Readable Format
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    dateStyle: 'full', timeStyle: 'long'
  });

  const givenDate = req.body.dateTime
  const isoDate = new Date(givenDate); //Convert to ISO format

  console.log("Scheduling Service call at " + dateTimeFormat.format(isoDate))

  //Scheduling Job at given date
  schedule.scheduleJob(isoDate, async function () {
    helperFuctionToMakeCalls(req,res)
  });
}