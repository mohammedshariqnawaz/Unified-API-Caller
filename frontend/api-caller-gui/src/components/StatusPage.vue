<template>
  <div id="status-page">
    <div id="page-name">
      <h1>Status Page</h1>
    </div>
    <div id="status">
      <b-table
        class="calls-list"
        hover
        :items="items"
        :fields="fields"
      ></b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // to handle http requests

export default {
  data() {
    return {
      items: [],
      fields: [
        { key: "serviceId", label: "Service Id" },
        { key: "serviceName", label: "Job Name" },
        { key: "scheduledDate", label: "Submitted" },
        { key: "status", label: "Scheduled" },
      ],
    };
  },
  methods: {
    /**
     * Convert
     * @params String
     * @returns String
     */
    getReadableDate(givenDate) {
      const dateTimeFormat = new Intl.DateTimeFormat("en", {
        dateStyle: "full",
        timeStyle: "long",
      });
      const isoDate = new Date(givenDate); //Convert to ISO format

      return dateTimeFormat.format(isoDate);
    },
  },
  /**
   * Get List of service calls made when component is mounted
   *
   */
  async mounted() {
    try {
      console.log("asdasd");
      let getrequest = await axios.get("http://localhost:3000/calls");
      console.log(getrequest.data.apiCalls);
      let arr = getrequest.data.apiCalls;

      arr.forEach((element) => {
        let readabledate = this.getReadableDate(element.dataTime);
        element["scheduledDate"] = readabledate;
        if (element.apiExecuteNow === true) {
          element["status"] = "False";
        } else {
          element["status"] = "True";
        }
      });
      this.items = arr;
    } catch (error) {
      console.log("Error while getching service calls," + error);
    }
  },
};
</script>

<style scoped>
#status-page {
  height: 100%;
}
#page-name {
  height: 0px;
}

h1 {
  text-align: center;
  /* color: white; */
}

#status {
  margin: 5rem auto;
  max-width: 70%;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.calls-list {
  width: 100%;
}

.calls-list {
  text-align: center;
}
</style>
