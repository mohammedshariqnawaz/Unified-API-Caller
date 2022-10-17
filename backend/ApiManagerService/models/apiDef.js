const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new service call schema
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