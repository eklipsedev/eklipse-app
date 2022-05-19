import { app } from "../../../../db.js";
import axios from "axios";


export default {
  // get times
  setTimes({ commit, getters }) {
    return new Promise((resolve) => {
      commit("setTimesLoading", true);
      app.content
        .get({
          schemaKey: "hours",
          populate: [
            {
              fields: "companyRef",
            },
          ],
          filters: [["companyRef", "==", getters.getCompanyRef]],
        })
        .then((theTimes) => {
          const times = Object.values(theTimes);
          const timesArray = [];
          let totalHours = 0;
          times.forEach((time) => {
            timesArray.push(time);
            totalHours = totalHours + time.hoursLogged;
          });
          commit("setTimes", timesArray);
          commit("setTotalHours", totalHours);
          commit("setTimesLoading", false);
          resolve(timesArray);
          resolve(totalHours);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  // create invoice
  createInvoice({ commit, getters }) {
    commit("setInvoiceIsSending", true);
    const timesInvoiceArray = [];

    const times = getters.getTimes; // returns an array of times
    const customerId = getters.getQbUserId;

    times.forEach((time) => {
      timesInvoiceArray.push([
        {
          DetailType: time.request,
          Amount: time.hoursLogged * 75,
          SalesItemLineDetail: {
            ItemRef: {
              name: "some name",
              value: "some value",
            },
          },
        },
      ]);
    });
    axios
      .post(
        "https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/createInvoice",
        {
          data: {
            ...timesInvoiceArray, // this is an array
            CustomerRef: {
              value: customerId,
            },
          },
        }
      )
      .then((response) => {
        console.log(response);
        commit("setInvoiceIsSending", false);
        commit("toggleModal");
      })
      .catch((error) => {
        this.error = error;
      });
    // clear all hours logged for company in vuex & flamelink
  },
};
