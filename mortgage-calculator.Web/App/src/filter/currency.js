import Vue from "vue";
import FormatService from "../service/format-service";

export default Vue.filter("currency", function (data) {
    return FormatService.formatNumber(data, 2);
}); 