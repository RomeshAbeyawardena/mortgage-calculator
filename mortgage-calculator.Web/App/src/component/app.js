import Vue from 'vue';
import PropertyService from '../service/property-service';
import Decimal from "decimal.js";
const template = require("../template/mortgage-calculator.html");

export default Vue.extend({
    template: template,
    data() {
        return {
            propertyDetails: [],
            defaultDepositPercentage: 0.10,
            defaultInterestRate: 2,
            defaultRepaymentPeriod: 25,
            triggerCalculation: false,
            triggerTimeout: 100
        }
    },
    methods: {
        cloneValues(sourceProperty, destinationProperty) {
            destinationProperty.deposit = sourceProperty.deposit;
            destinationProperty.interestRate = sourceProperty.interestRate;
            destinationProperty.repaymentPeriod = sourceProperty.repaymentPeriod;
        },
        setDefaultValues(property) {
            this.calculateDeposit(property);
            property.interestRate = this.defaultInterestRate;
            property.repaymentPeriod = this.defaultRepaymentPeriod;
        },
        getProperties() {
            return PropertyService.getProperties();
        },
        calculateDeposit(property) {
            var propertyCost = new Decimal(property.propertyPrice);
            var defaultDepositPercentage = new Decimal(this.defaultDepositPercentage);
            property.deposit = propertyCost.mul(defaultDepositPercentage);
        },
        triggerMonthlyPaymentCalculation(timeout) {
            const context = this;
            window.setTimeout(function () {
                context.triggerCalculation = false;
                context.triggerCalculation = true;
            }, timeout);
        },
        monthlyCostUpdated(e) {
            console.log(e);
            if (!e.triggered) {
                for (var property of this.propertyDetails) {
                    this.cloneValues(e.data, property);
                }
            }
        }
    },
    mounted() {
        const context = this;
        this.getProperties()
            .then(function (e) {
                context.propertyDetails = e;
                for (var property of context.propertyDetails) {
                    context.setDefaultValues(property);
                }
                context.triggerMonthlyPaymentCalculation(context.triggerTimeout);
            });
    }
});