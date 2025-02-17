﻿import Vue from 'vue';
import PropertyService from '../service/property-service';
import FormatService from '../service/format-service';
import DefaultService from '../service/default-service';
import Decimal from "decimal.js";
import Promise from "promise";
const template = require("../template/mortgage-calculator.html");

export default Vue.extend({
    template: template,
    data() {
        return {
            propertyDetails: [],
            defaultDepositPercentage: 0.10,
            defaultInterestRate: 2,
            defaultRepaymentPeriod: 25
        }
    },
    methods: {
        setCachedDefaultValues(data) {
            sessionStorage.setItem("interestRate", data.interestRate);
            sessionStorage.setItem("repaymentPeriod", data.repaymentPeriod);
        },
        getCachedDefaultValues() {
            return {
                interestRate: sessionStorage.getItem("interestRate"),
                repaymentPeriod: sessionStorage.getItem("repaymentPeriod")
            }
        },
        cloneValues(index, sourceProperty) {
            this.propertyDetails[index].deposit = FormatService.removeFormatting(sourceProperty.deposit);
            this.propertyDetails[index].interestRate = sourceProperty.interestRate;
            this.propertyDetails[index].repaymentPeriod = sourceProperty.repaymentPeriod;
        },
        setDefaultValues(property) {
            if (property.deposit < 0.001) {
                this.calculateDeposit(property);
            }
            property.interestRate = this.defaultInterestRate;
            property.repaymentPeriod = this.defaultRepaymentPeriod;
        },
        getProperties() {
            return PropertyService.getProperties();
        },
        getDefaults() {
            return new Promise((resolve, reject) => {
                var defaults = sessionStorage.getItem("defaults")

                if (defaults !== null) {
                    resolve(JSON.parse(defaults));
                    return;
                }

                DefaultService.getDefaults()
                    .then((e) => {
                        sessionStorage.setItem("defaults", JSON.stringify(e));
                        resolve(e);
                    })
            });
        },
        calculateDeposit(property) {
            var propertyCost = new Decimal(property.propertyPrice);
            var defaultDepositPercentage = new Decimal(this.defaultDepositPercentage);
            property.deposit = propertyCost.mul(defaultDepositPercentage);
        },
        monthlyCostUpdated(e) {
            if (!e.triggered) {
                this.setCachedDefaultValues(e.data);
                for (var property of this.propertyDetails) {
                    this.cloneValues(this.propertyDetails.indexOf(property), e.data);
                }
            }
        }
    },
    mounted() {
        const context = this;

        this.getDefaults().then((e) => {
            this.defaultInterestRate = e.interestRate;
            this.defaultRepaymentPeriod = e.repaymentPeriod;
        });

        var cachedValues = this.getCachedDefaultValues()
        console.log(cachedValues);
        if (cachedValues.interestRate !== null) {
            this.defaultInterestRate = cachedValues.interestRate;
        }

        if (cachedValues.repaymentPeriod !== null) {
            this.defaultRepaymentPeriod = cachedValues.repaymentPeriod;
        }


        this.getProperties()
            .then(function (e) {
                context.propertyDetails = e;
                for (var property of context.propertyDetails) {
                    context.setDefaultValues(property);
                }
            });
    }
});