<template>
  <div >
    <div id="page-name">
      <h1>Request Page</h1>
    </div>
    <div class="main">
      <div class="left">
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label for="service-name">Service Name</label>
            <input
              id="service-name"
              name="service-name"
              type="text"
              v-model="serviceName"
              placeholder="Enter Service Name"
            />
          </div>
          <div class="form-control">
            <label for="api-details">API Details</label>
            <div id="api-details-div">
              <select id="apimethod" name="apimethod" v-model="apiMethod">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                id="service-endpoint"
                name="service-endpoint"
                type="text"
                v-model="serviceEndpoint"
                placeholder="Enter Service endpoint"
              />
            </div>
          </div>

          <div class="form-control">
            <label for="headers">Headers</label>

            <table>
              <tr>
                <td>
                  <input
                    id="header-key"
                    name="header-key"
                    type="text"
                    v-model="headerKey"
                    placeholder="Enter Key"
                  />
                </td>
                <td>
                  <input
                    id="header-value"
                    name="header-value"
                    type="text"
                    v-model="headerValue"
                    placeholder="Enter Value"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div class="form-control">
            <h2>Execution</h2>
            <div>
              <input
                id="execute-now"
                name="execute"
                type="radio"
                :value="true"
                v-model="execute"
              />
              <label for="execute-now">Execute Now</label>
            </div>
            <div>
              <input
                id="execute-later"
                name="execute"
                type="radio"
                :value="false"
                v-model="execute"
              />
              <label for="execute-later">Schedule</label>
            </div>
          </div>
          <div class="form-control">
            <label for="date-picker">Enter a date and time to schedule:</label>
            <input
              id="date-picker"
              type="datetime-local"
              name="date-picker"
              :disabled="execute"
              v-model="datetime"
            />
          </div>
          <div class="form-control">
            <label for="req-body">Enter Request Body in JSON</label>
            <textarea
              id="request-body"
              name="request-body"
              type="text"
              v-model="requestBody"
              placeholder="Enter Body"
            ></textarea>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div class="right">
        <div id="responsesection">
          <label>Response</label>
          <textarea
            id="response-body"
            name="response-body"
            type="text"
            placeholder="Response Body"
            v-model="response"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // to handle http requests
import { v4 as uuidv4 } from "uuid"; // to generate unique id for each service call

export default {
  data() {
    return {
      serviceName: "",
      serviceEndpoint: "",
      apiMethod: "GET",
      execute: "",
      headerKey: "",
      headerValue: "",
      requestBody: "{}",
      datetime: null,
      response: "",
    };
  },
  methods: {
    /**
     * Submit Form and get response if service call has been executed successful
     *
     */
    async submitForm() {
      //Testing Data
      // this.serviceName = "Test";
      // this.serviceEndpoint = "https://jsonplaceholder.typicode.com/todos/1";
      // this.apiMethod = "GET";
      // this.execute = '';
      // this.headerKey = "Content-Type";
      // this.headerValue = "application/json; charset=UTF-8";
      // this.requestBody = `{ "title": "delectus aut autem","completed": false}`;

      try{
        let when, DateisoString;

      //Decide if the service call is to be executed now or scheduled later
      if (this.execute === true) {
        when = "now";
        DateisoString = new Date().toISOString();
      } else {
        when = "later";
        DateisoString = new Date(this.datetime).toISOString();
      }

      //Create payload to send with post request to backend
      let call = {
        serviceId: uuidv4(),
        serviceName: this.serviceName,
        apiMethod: this.apiMethod,
        apiEndpoint: this.serviceEndpoint,
        apiHeaders: [{ key: this.headerKey, value: this.headerValue }],
        apiBody: this.requestBody,
        apiExecuteNow: this.execute,
        dateTime: DateisoString,
      };

      //Send prepared payload to backend
      let postrequest = await axios.post(
        "http://localhost:3000/schedule/" + when,
        call,
        { headers: { "Content-Type": "application/json" } }
      );

      //If post request is successful then get the response body
      if (postrequest.status === 201) {
        let getrequest = await axios.get("http://localhost:3000/calls");
        let getresponse = getrequest.data.apiCalls.find(
          (ele) => ele.serviceId === call.serviceId
        );
        console.log(
          "Response",
          JSON.stringify(getresponse.apiResponse, null, 4)
        );
        this.response = JSON.stringify(getresponse.apiResponse, null, 4);
      }

      // Resetting values
      this.serviceName = "";
      this.serviceEndpoint = "";
      this.apiMethod = "";
      this.execute = "";
      this.headerKey = "";
      this.headerValue = "";
      this.requestBody = `{}`;
      this.datetime = null;
      }catch(error){
        console.log("Error while submitting service call, "+error)
      }
      
    },
  },
};
</script>

<style scoped>
#page-name {
  height: 0px;
}

h1 {
  text-align: center;
}

.main {
  display: flex;
}

.left {
  flex: 0 0 50%;
}

.right {
  flex: 1;
}

#responsesection {
  margin: 5rem auto;
  max-width: 40rem;
  /* height: 50%; */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

#response-body {
  width: 100%;
  height: 250px;
  margin-top: 20px;
}

form {
  margin: 5rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

#api-details-div input {
  width: 80%;
  display: inline-block;
  vertical-align: middle;
}

#api-details-div select {
  width: 15%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5%;
}

#headerpair input {
  display: inline-block;
}

input[type="checkbox"],
input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}

#request-body {
  width: 100%;
}
</style>
