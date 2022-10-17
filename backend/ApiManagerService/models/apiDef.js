// import mongoose
const mongoose = require('mongoose');

// extract the schema from that mongoose object
const Schema = mongoose.Schema;

// create a new post schema
const callsSchema = new Schema({
  serviceId: {
    type: String
  },
  serviceName: {
    type: String
  },
  apiMethod: {
    type: String
  },
  apiEndpoint: {
    type: String
  },
  apiHeaders: [{
    type: Object
  }],
  apiBody: {
    type: Object
  },
  apiResponse: {
    type: Object
  },
  apiExecuteNow: { 
    type: Boolean 
  },
  dataTime: { 
    type: Date 
  }
});

// export the model
module.exports = mongoose.model('ServiceCalls', callsSchema);