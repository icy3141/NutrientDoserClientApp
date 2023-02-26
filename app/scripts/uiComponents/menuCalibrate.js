

function menuCalibrateStart() {

	let panelId, panelTitle, promptText;
	let panel, row, btn, field, label, dropdown;
	let updateButton;

	/* begin panel */
	panelTitle = "Begin Pump Calibration";
	promptText = "Enter a number of seconds to calibrate the pump for, and select the fluid to calibrate.";
	panelId = "calibrate-start-panel";
	pnlCalibrateStart =
		panel = makeBasicPanel(panelTitle, panelId, promptText);

	updateButton = () => {
		const textbox = txtCalibrateDuration;
		const button = btnCalibrateStart;
		disableButtonIf(button, () => !isTextboxInRange(textbox, 0));
	};
	field = makeNumField("calibrate-duration", "Calibrate for ", " seconds", updateButton, "10");
	txtCalibrateDuration = getInputFromLabel(field);
	panel.appendChild(field);

	row = makeRow();
	panel.appendChild(row);

	dropdown = makeFluidMenu();
	label = makeLabel("calibrate-fluid", "Fluid to measure: ");
	label.appendChild(dropdown);
	row.appendChild(label);

	row = makeRow();
	panel.appendChild(row);

	btn = makeMainMenuButton();
	row.appendChild(btn);

	btn = makeButton("Start Pump", "calibrate-start-btn", () => {

		calibrateStart(valueFromSelectMenu(dropdown),
			calibrateDuration = numberFromTextbox(txtCalibrateDuration));
	});
	row.appendChild(btnCalibrateStart = btn);
	updateButton();

	/* end panel */

	return panel;
}

function menuCalibrateEnd() {

	let panelId, panelTitle, promptText;
	let panel, row, btn, field, label, dropdown;
	let updateButton;

	/* begin panel */
	panelTitle = "End Pump Calibration";
	promptText = "After the pump stops, enter the number of milliliters measured:";
	panelId = "calibrate-end-panel";
	pnlCalibrateEnd =
		panel = makeBasicPanel(panelTitle, panelId, promptText);

	updateButton = () => {
		const textbox = txtCalibrateAmount;
		const button = btnCalibrateEnd;
		disableButtonIf(button, () => !isTextboxInRange(textbox, 0));
	};
	field = makeNumField("calibrate-amount", "Measured ", " mL", updateButton);
	txtCalibrateAmount = getInputFromLabel(field);
	panel.appendChild(field);

	row = makeRow();
	panel.appendChild(row);

	btn = makeMainMenuButton();
	row.appendChild(btn);

	btnCalibrateEnd =
		btn = makeButton("Confirm", "calibrate-confirm-btn", () => {
			calibrateSubmitActual(new FluidAmount(numberFromTextbox(txtCalibrateAmount)));
		});
	row.appendChild(btn);
	updateButton();
	/* end panel */

	return panel;
}


function menuEnterWeightData() {
	let panelId, panelTitle, promptText;
	let panel, row, btn, field, label, dropdown;
	let updateButton;

	panelTitle = "Enter Weight/Volume";
	promptText = "Measure the same amount of a fluid in volume and weight, and record the results here.";
	panelId = "weight-entry-panel";
	// pnlCalibrateEnd =
	panel = makeBasicPanel(panelTitle, panelId, promptText);

	row = makeRow();
	panel.appendChild(row);

	dropdown = makeFluidMenu();
	label = makeLabel("weigh-fluid", "Fluid to record for: ");
	label.appendChild(dropdown);
	row.appendChild(label);

	row = makeRow();
	panel.appendChild(row);

	field = makeNumField("calibrate-amount", "Measured ", " mL", updateButton);
	txtCalibrateAmount = getInputFromLabel(field);
	panel.appendChild(field);

	row = makeRow();
	panel.appendChild(row);

	btn = makeMainMenuButton();
	row.appendChild(btn);

	btn = makeButton("Enter Data", "calibrate-start-btn", () => {

		calibrateStart(valueFromSelectMenu(dropdown),
			calibrateDuration = numberFromTextbox(txtCalibrateDuration));
	});
	row.appendChild(btn);

	return panel;
}





loadCounter++;