import Promise from "promise";
import Axios from "axios";

const propertyService = {
    getProperties: function () {
        return new Promise(function (resolve, reject) {
            Axios.get("/data").then(function (e) {
                resolve(e.data);
            });
        });
    },
    getMonthlyMortgageCost: function (propertyDetails) {
        return new Promise(function (resolve, reject) {
            Axios.get("/GetMonthlyCost", { params: propertyDetails })
                .then(function (e) {
                    resolve(e.data);
                })
        })
    }
}

export default propertyService; 