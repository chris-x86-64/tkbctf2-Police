function check(input) {
	function isString(t) {
		return /^"[^"]*"$|^'[^']*'$/.test(t);
	}

	function isNumber(t) {
		return /^\d+(\.\d+)?$/.test(t);
	}

	function isRegex(t) {
		return /^\/[^\/]*\/$/.test(t);
	}

	function isBalance(t, o) {
		var i,
			b = 0;

		Array.prototype.slice.call(t).forEach(
			function (e) {
				if (e == o.left) {
					b++;
				} else if (e == o.right) {
					b--;
				}
			}
		);

		return b == 0;
	}

	// function isArray(t) {
	// 	if ( !/^\[.*\]$/.test(t) || !isBalance(t, {left: '[', right: ']'}) ) {
	// 		return false;
	// 	}
	// 	return /^\[(.*)\]$/.exec(t)[1].split(/,\s*/).every(
	// 		function (e) { return validate(e); }
	// 	);
	// }

	function isObject(t) {
		if ( !/^\{.*\}$/.test(t) || !isBalance(t, {left: '{', right: '}'}) ) {
			return false;
		}

		return /^\{(.*)\}$/.exec(t)[1].split(/,\s*/).every(
			function (e) {
				return validate( /^\w+\s*:\s*(.*)$/.exec(e)[1] );
			}
		);
	}

	function isNotFunction(t) {
		return !/Function/.test(t);
	}

	function validate(t) {
		return (isString(t) || isNumber(t) || isRegex(t) || isObject(t)) && isNotFunction(t);
	}

	return (validate(input) ? Function("return " + input)() : "not Literal");
}

