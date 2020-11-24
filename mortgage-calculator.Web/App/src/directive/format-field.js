import Vue from "vue";
import FormatService from "../service/format-service";

export default Vue.directive("format-field", {
	bind: function (el, binding, vnode) {
		el.addEventListener("focus", function (e) {
			var oldValue = e.target.value
			e.target.value = FormatService.removeFormatting(oldValue);
		});

		el.addEventListener("blur", function (e) {
			var oldValue = e.target.value;
			e.target.value = FormatService.formatNumber(oldValue, 2);
		});

	}
});