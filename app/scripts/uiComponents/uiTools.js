
/* UI Helper functions */

function disableButtonIf(button, condition) {
	button.disabled = condition();
}

/**
 * @param {number} someNumber a number to round
 * @param {number} decimalPlaces number of digits to preserve after dot
 * @param {boolean} padZeros whether to make up any lack of decimal places with zeroes
 * @returns {string}*/
function formatDecimal(someNumber, decimalPlaces, padZeros) {

	if (!("" + someNumber).includes("."))
		return ("" + someNumber);
	let multiplied = someNumber * (10 * decimalPlaces);
	let rounded = Math.round(multiplied);
	let divided = rounded / (10 * decimalPlaces);
	let roundedStr = "" + divided;
	//let indexOfDot = roundedStr.indexOf(".");

	//if (indexOfDot - decimalPlaces < 0)
	//    return roundedStr;

	//roundedStr = roundedStr.substring(0, indexOfDot - decimalPlaces);
	return roundedStr;
}

function textboxValueAsInt(textbox) {
	try {
		return Number.parseInt(textbox.value);
	}
	catch (e) {
		console.log(e);
	}
	return Number.NaN;
}
function textboxValueAsFloat(textbox) {
	try {
		return Number.parseFloat(textbox.value);
	}
	catch (e) {
		console.log(e);
	}
	return Number.NaN;
}

function numberFromTextbox(textbox) {
	if (textbox.value.includes("."))
		return textboxValueAsFloat(textbox);
	return textboxValueAsInt(textbox);
}
/**@param {HTMLSelectElement} dropdown*/
function valueFromSelectMenu(dropdown) {
	return dropdown.options[dropdown.selectedIndex].value;
}
function isTextboxEmpty(textbox) {
	return textbox.value == "";
}

function isTextboxInRange(textbox, min, max) {
	let inRange = true;
	let val = numberFromTextbox(textbox);
	if (min !== undefined)
		inRange &= val >= min;
	if (max !== undefined)
		inRange &= val <= max;
	return inRange;
}

function getInputFromLabel(label) {
	let collection = label.getElementsByTagName("input");
	if (collection && collection.length > 0)
		return collection[0];
	return null;
}

function setPrompt(container, text) {
	let arr = container.getElementsByClassName("prompt");

	if (arr && arr.length > 0) {
		let elem = arr[0];
		elem.innerHTML = text;
	}
}

/** Loads a menu
 * */
function loadMenu(panelOrCreateFn) {
	//hideAllMenus();
	//showMenu(container);
	let panel = panelOrCreateFn;
	if (currentPanel)
		currentPanel.remove();
	try {
		if (panelOrCreateFn instanceof Function)
			panel = panelOrCreateFn();
	}
	catch (err) {
		console.error(err);
	}
	currentPanel = panel;
	mainDiv.appendChild(panel);
	return panel;
}

/* Make Component functions */

function makeRow() {
	let container = document.createElement("div");
	container.className = "button-row";
	return container;
}

function makeButton(text, className, onclick) {
	let button = document.createElement("button");
	button.className = className;
	button.innerText = text;
	button.onclick = onclick;
	return button;
}

/** Makes a button that loads a menu.
 * @param {string} text
 * @param {string} className 
 * @param {Function} panelCreateFunction the function that creates the "page" to link to
 * */
function makePageLinkButton(text, className, panelCreateFunction) {
	return makeButton(text, className, () => loadMenu(panelCreateFunction));
}

function makeToggle(id, beforeText, afterText, ontoggle) {
	let label = document.createElement("label");
	label.id = id;
	label.append(beforeText);
	let panel = document.createElement("span");
	panel.className = "toggle-switch";
	panel.innerHTML = "&nbsp;";
	label.appendChild(panel);
	let checkbox = document.createElement("input");
	checkbox.id = id + "-toggle-btn";
	checkbox.type = "checkbox";
	checkbox.oninput = ontoggle;
	panel.appendChild(checkbox);
	let inner = document.createElement("span");
	inner.className = "toggle-switch-slider";
	panel.appendChild(inner);
	label.append(afterText);
	return label;
}

function makeField(id, beforeText, afterText, onchange, defaultValue, inputType) {
	if (inputType == undefined)
		inputType = "text";
	let label = makeLabel(id, beforeText);
	let textbox = document.createElement("input");
	textbox.id = id + "-input";
	textbox.type = inputType;
	textbox.oninput = onchange;
	if (defaultValue != undefined)
		textbox.value = defaultValue;
	label.appendChild(textbox);
	if (afterText != undefined)
		label.append(afterText);
	return label;
}

function makeNumField(id, beforeText, afterText, onchange, defaultValue) {
	return makeField(id, beforeText, afterText, onchange, defaultValue, "number");
}

function makeLabel(id, text) {
	let label = document.createElement("label");
	label.id = id;
	label.append(text);
	return label;
}


/** creates a select element and fills it with options
 * @param {string[]} options
 * */
function makeDropdown(options, placeholderText = "", isPlaceholderAnOption = false) {
	let dropdown = document.createElement("select");
	if (placeholderText != "" && !isPlaceholderAnOption) {
		let placeholder = new Option(placeholderText, null, true, true);
		placeholder.hidden = true;
		dropdown.add(placeholder);
	}
	for (let optionText of options) {
		let option = new Option(optionText, optionText)
		if (placeholderText != "" && isPlaceholderAnOption
			&& placeholderText == optionText) {
			option.defaultSelected = true;
			option.selected = true;
		}
		dropdown.add(option);
	}
	return dropdown;
}

function makeMainMenuButton() {
	return makePageLinkButton("Main Menu", "main-menu-btn", menuMain);
}
function makeUnitMenu(defaultValue = FluidUnit.Milliliters) {
	let unitList = [], options = [];// = ["No Units"];

	unitList = [...Object.values(FluidUnit)];
	for (let i = 0; i < unitList.length; i++) {
		const val = unitList[i];
		if (!isVolumeUnit(val) && !isWeightUnit(val)) continue;
		options.push(getUnitAbbreviation(val));
	}
	// fluidList.unshift("Select a Fluid")
	let dropdown = makeDropdown(options, getUnitAbbreviation(defaultValue), true);
	return dropdown;
}
function makeWeightUnitMenu(defaultValue = FluidUnit.Milligrams) {
	let unitList, options = [];
	unitList = [...Object.values(FluidUnit)];
	for (let i = 0; i < unitList.length; i++) {
		const val = unitList[i];
		if (!isWeightUnit(val)) continue;
		options.push(getUnitAbbreviation(val));
	}
	let dropdown = makeDropdown(options, getUnitAbbreviation(defaultValue), true);
	return dropdown;
}
function makeVolumeUnitMenu(defaultValue = FluidUnit.Milliliters) {
	let unitList = [], options = [];// = ["No Units"];

	unitList = [...Object.values(FluidUnit)];
	for (let i = 0; i < unitList.length; i++) {
		const val = unitList[i];
		if (!isVolumeUnit(val)) continue;
		options.push(getUnitAbbreviation(val));
	}
	// unitList.unshift("Select a Fluid")
	let dropdown = makeDropdown(options, getUnitAbbreviation(defaultValue), true);
	return dropdown;
}

function makeFluidMenu() {
	let fluidList = [];
	let placeholder = "No Fluids Found";
	if (currentRecipe) {
		fluidList = currentRecipe.getFluidNames();
		placeholder = "Select a Fluid";
	}
	let dropdown = makeDropdown(fluidList, placeholder);
	return dropdown;
}

function makeBasicPanel(titleText, panelId, promptText) {
	let container = document.createElement("div");
	container.id = panelId;
	container.className = "page-panel";

	let heading = document.createElement("h2");
	heading.innerText = titleText;
	container.appendChild(heading);

	let prompt = document.createElement("p");
	prompt.className = "prompt";
	if (promptText)
		prompt.innerHTML = promptText;
	container.appendChild(prompt);

	return container;
}

function makeMessagePanel(messageTitle, messageText = "", extraButton) {
	let container = makeBasicPanel(messageTitle, "alert-panel", messageText);

	row = makeRow();
	container.appendChild(row);
	btn = makeMainMenuButton();
	row.appendChild(btn);

	if (extraButton != undefined)
		row.appendChild(extraButton);


	return container;
}




/*function showMenu(container) {
    
	if (container.classList.contains("inactive"))
		container.classList.remove("inactive");
}
function hideMenu(container) {
	if (!container.classList.contains("inactive"))
		container.classList.add("inactive");
	//container.style.display = "none";
}

function hideAllMenus() {

	let container;

	for (const container of panels) {
		hideMenu(container);
	}
}*/


loadCounter++;