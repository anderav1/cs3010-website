function checkValid(field) {
	if (field) {
		var val = (field.value).trim();
		var pattern = field.pattern;
		var required = field.required;
		
		if (val == "" && required) {
			field.classList.add("invalid-field");
			return false;
		} else if (val == "") {
			field.classList.add("valid-field");
			return true;
		}
		var match = val.search(pattern);
		if (match == -1) {
			field.classList.add("invalid-field");
			return false;
		}
		field.classList.add("valid-field");
		return true;
	}
	return false;
}

function blankSlate(field) {
	if (field) {
		field.classList.remove("valid-field");
		field.classList.remove("invalid-field");
	}
}

function pwMatch() {
	var second = document.getElementById("confirm-pw");
	var pw = document.getElementById("pw");
	if (second && pw) {
		if (pw.value == "" || pw.value !== second.value) {
			second.classList.add("invalid-field");
			return false;
		} else {
			second.classList.add("valid-field");
			return true;
		}
	}
	return false;
}

function validState() {
	var state = document.getElementById("state");
	if (state) {
		if (state.selectedIndex == 0) {
			state.classList.add("invalid-field");
			return false;
		}
		return true;
	}
	return false;
}

function reformatPhone() {
	var phone = document.getElementById("phone");
	if (phone) {
		var nums = (phone.value).trim().replace(/\D/g, "");
		if (nums.length != 10) {
			phone.classList.add("invalid-field");
			return false;
		} else {
			phone.value = nums.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
			phone.classList.add("valid-field");
			return true;
		}
	}
	return false;
}

function reformatZIP() {
	var zip = document.getElementById("zip");
	if (zip) {
		var nums = (zip.value).trim().replace(/\D/g, "");
		if (nums.length != 5 && nums.length != 9) {
			zip.classList.add("invalid-field");
			return false;
		} else if (nums.length == 5) {
			zip.value = nums;
			zip.classList.add("valid-field");
			return true;
		} else if (nums.length == 9) {
			zip.value = nums.replace(/(\d{5})(\d{4})/, "$1");
			zip.classList.add("valid-field");
			return true;
		}
	}
	return false;
}

function radioCheck(field) {
	if (field) {
		var els = field.elements;
		for (i = 0; i < els.length; i++) {
			if (els[i].checked) {
				field.classList.add("valid-field");
				return true;
			}
		}
		field.classList.add("invalid-field");
		return false;
	}
	return false;
}

function validate() {
	var username = document.getElementById("username");
	var pw = document.getElementById("pw");
	var fname = document.getElementById("fname");
	var lname = document.getElementById("lname");
	var add1 = document.getElementById("address1");
	var add2 = document.getElementById("address2");
	var city = document.getElementById("city");
	var email = document.getElementById("email");
	var gender = document.getElementById("gender");
	var marriage = document.getElementById("marriage");
	var dob = document.getElementById("bday");
	
	if (username && pw && fname && lname && add1 && add2 && city && email &&
		gender && marriage && dob) {
		return (checkValid(username) && checkValid(pw) && pwMatch() &&
			checkValid(fname) && checkValid(lname) && checkValid(add1) &&
			checkValid(add2) && checkValid(city) && validState() &&
			reformatZIP() && reformatPhone() && checkValid(email) &&
			radioCheck(gender) && radioCheck(marriage) && dob.value !== "");
	}
	return false;
}

function clearErrors() {
	var invalidFields = document.getElementsByClassName("invalid-field");
	if (invalidFields) {
		while (invalidFields.length > 0) {
			blankSlate(invalidFields[0]);
		}
	}
	var validFields = document.getElementsByClassName("valid-field");
	if (validFields) {
		while (validFields.length > 0) {
			blankSlate(validFields[0]);
		}
	}
}

function registerHandlers() {
	document.getElementById("confirm-pw").onblur = pwMatch;
	document.getElementById("state").onblur = validState;
	document.getElementById("zip").onblur = reformatZIP;
	document.getElementById("phone").onblur = reformatPhone;
	document.getElementById("reset-form").onclick = clearErrors;
	//document.getElementById("registrationForm").onreset = clearErrors;
	document.getElementById("registrationForm").onsubmit = validate;
}