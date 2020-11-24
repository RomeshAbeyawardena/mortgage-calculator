import Vue from "vue";

export default Vue.directive("numeric-input", {
	bind: function (el, binding, vnode) {

		el.addEventListener("keydown", function (e) {
			var oldValue = e.target.value
            if (e.keyCode === 37 //left
				|| e.keyCode === 39 //right
				|| e.keyCode === 8 //backspace
				|| e.keyCode === 9
				|| e.keyCode === 190 //period
				|| (e.keyCode > 47 && e.keyCode < 58)) {
				return;
            }
			console.log(e.keyCode);
			e.preventDefault();
		});

	}
});