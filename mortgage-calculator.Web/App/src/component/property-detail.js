import Vue from 'vue';
import propertyService from '../service/property-service';
const template = require("../template/property-detail.html");

export default Vue.component("property-detail", {
    template: template,
    props: ["amount", "deposit", "interestRate", "repaymentPeriod", "triggerCalculation"],
    data: function () {
        return {
            trig: this.triggerCalculation,
            propertyDetails: {
                monthlyMortgageCost: 0,
                amount: this.amount,
                deposit: this.deposit,
                interestRate: this.interestRate,
                repaymentPeriod: this.repaymentPeriod
            }
        }
    },
    watch: {
        amount(newValue) {
            this.propertyDetails.amount = newValue;
        },
        deposit(newValue) {
            this.propertyDetails.deposit = newValue;
        },
        interestRate(newValue) {
            this.propertyDetails.interestRate = newValue;
        },
        repaymentPeriod(newValue) {
            this.propertyDetails.repaymentPeriod = newValue;
        },
        triggerCalculation: function (newValue) {
            if (newValue === true) {
                this.getMonthlyMortgageCost(true);
            }
        }
    },
    methods: {
        getMonthlyMortgageCost(triggered) {
            const context = this;
            propertyService.getMonthlyMortgageCost(this.propertyDetails)
                .then(function (e) {
                    context.propertyDetails.monthlyMortgageCost = e;
                    context.$emit("monthly-cost-updated", { amount: e, triggered: triggered, data: context.propertyDetails })
            });
        }
    }
});