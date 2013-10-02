(function() {
	var proceedable = false;

	this.giveMeTheFlag = function () {
		if (proceedable) {

			alert("clear");

			var sendAnsForm = document.createElement("form");

			sendAnsForm.method = "post";
			sendAnsForm.action = "validation.py"; // We use PyV8 to validate your answer with Google V8 JavaScript Engine.

			var sendAnsInput = document.createElement("input");

			sendAnsInput.setAttribute("name", "solution");
			sendAnsInput.setAttribute("value", document.xssForm.code.value);

			sendAnsForm.appendChild(sendAnsInput);

			document.body.appendChild(sendAnsForm);
			sendAnsForm.submit();
			document.body.removeChild(sendAnsForm);

		} else {
			alert("You need to set the `proceedable` to true!");
		}
	}

	this.checkSum = function() {
		var code = document.xssForm.code.value;

		proceedable = false;

		try {
			code = check(code);
		} catch (e) {
			code = 0;
		} finally {
			proceedable = true;
		}

		if (code == 110) {
			document.getElementById("result").innerHTML = '<span style="color: green;">good</span>';
		} else {
			document.getElementById("result").innerHTML = '<span style="color: red;">bad</span>';
		}


		return false;
	}
}());
