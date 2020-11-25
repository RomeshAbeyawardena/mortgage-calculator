import Accounting from "accounting-js"

const formatService = {
    formatNumber: function (value, decimalPlaces) {
        return Accounting.formatNumber(value, decimalPlaces);
    },
    removeFormatting: function (value) {
        
        if (!isNaN(value)) {
            return value;
        }

        if (!value || value === null) {
            return 0;
        }

        return value.replace(new RegExp(",", "g"), "");
    }
}

export default formatService;