import Vue from 'vue';
import PropertyService from '../service/property-service';
import FormatService from "../service/format-service";
const template = require("../template/property-detail.html");
import Decimal from "decimal.js";
import Promise from "promise";

export default Vue.component("property-detail", {
    template: template,
    props: ["amount", "deposit", "interestRate", "repaymentPeriod", "propertyReference"],
    data: function () {
        return {
            propertyDetails: {
                reference: this.propertyReference,
                amount: this.amount,
                deposit: this.deposit,
                interestRate: this.interestRate,
                repaymentPeriod: this.repaymentPeriod,
                accumalatedInterest: 0
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
        }
    },
    asyncComputed: {
        async monthlyMortgageCost() {
            return await this.getMonthlyMortgageCost();
        }
    },
    computed: {
        totalPayable() {
            return new Decimal(FormatService.removeFormatting(this.propertyDetails.amount))
                .add(new Decimal(FormatService.removeFormatting(this.propertyDetails.accumalatedInterest))
                    .mul(this.propertyDetails.repaymentPeriod));
        }
    },
    methods: {
        recalculate() {
            this.getMonthlyMortgageCost();
            this.$emit("monthly-cost-updated", { data: this.propertyDetails });
        },
        getMonthlyMortgageCost() {
            var context = this;
            return new Promise((resolve, reject) => {
                PropertyService.getMonthlyMortgageCost(this.propertyDetails)
                    .then(function (e) {
                        resolve(e.totalCost);
                        context.propertyDetails.accumalatedInterest = e.accumalatedInterest;
                    });
            });
        }
    }
}); 