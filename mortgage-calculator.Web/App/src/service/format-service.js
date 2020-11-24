import Accounting from "accounting-js"

const formatService = {
    formatNumber: function (value, decimalPlaces) {
        return Accounting.formatNumber(value, decimalPlaces);
    },
    removeFormatting: function (value) {
        return value.replace(new RegExp(",", "g"), "");
    }
}

export default formatService;