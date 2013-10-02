(function() {
	var proceedable = false;

	this.giveMeTheFlag = function () {
		if (proceedable) {
			isYoshimuraYuu();
		} else {
			notQuiteDone();
		}
	}

	this.checkSum = function(code) {

		proceedable = false;

		try {
			code = check(code);
		} catch (e) {
			code = 0;
		} finally {
			proceedable = true;
		}

		return code == 110;
	}
}());
