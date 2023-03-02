

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


		row = makeRow();
		panel.appendChild(row);

	updateButton = () => {
		const textbox = txtCalibrateDuration;
		const button = btnCalibrateStart;
		disableButtonIf(button, () => !isTextboxInRange(textbox, 0));
	};
	field = makeNumField("calibrate-duration", "Calibrate for ", " seconds", updateButton, "10");
	txtCalibrateDuration = getInputFromLabel(field);
	row.appendChild(field);

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

let drpCalibrateUnit;

function menuCalibrateEnd() {

	let panelId, panelTitle, promptText;
	let panel, row, btn, field, label, dropdown;
	let updateButton;

	/* begin panel */
	panelTitle = "End Pump Calibration";
	promptText = "After the pump stops, enter the amount measured:";
	panelId = "calibrate-end-panel";
	pnlCalibrateEnd =
		panel = makeBasicPanel(panelTitle, panelId, promptText);

	row = makeRow();
	panel.appendChild(row);

	updateButton = () => {
		const textbox = txtCalibrateAmount;
		const button = btnCalibrateEnd;
		disableButtonIf(button, () => !isTextboxInRange(textbox, 0));
	};
	field = makeNumField("calibrate-amount", "Measured ", "", updateButton);
	txtCalibrateAmount = getInputFromLabel(field);
	row.appendChild(field);

	drpCalibrateUnit = dropdown = makeUnitMenu();
	row.appendChild(dropdown);

	row = makeRow();
	panel.appendChild(row);

	btn = makeMainMenuButton();
	row.appendChild(btn);

	btnCalibrateEnd =
		btn = makeButton("Confirm", "calibrate-confirm-btn", () => {
			calibrateSubmitActual(numberFromTextbox(txtCalibrateAmount), getUnitFromAbbreviation(valueFromSelectMenu(drpCalibrateUnit)));
		});
	row.appendChild(btn);
	updateButton();
	/* end panel */

	return panel;
}

let txtFluidWeight;
let txtFluidWeightVolume;
let drpFluidName;
let drpWeightUnit;
let drpVolumeUnit;

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

	drpFluidName = dropdown = makeFluidMenu();
	label = makeLabel("weigh-fluid", "Fluid to record for: ");
	label.appendChild(dropdown);
	row.appendChild(label);

	row = makeRow();
	panel.appendChild(row);

	field = makeNumField("weigh-amount", "Amount measured:");
	txtFluidWeight = getInputFromLabel(field);
	row.appendChild(field);

	drpWeightUnit = dropdown = makeWeightUnitMenu(FluidUnit.Milligrams);
	row.appendChild(dropdown);

	field = makeNumField("weigh-volume", " per ", "", null, 1);
	txtFluidWeightVolume = getInputFromLabel(field);
	row.appendChild(field);
	
	drpVolumeUnit = dropdown = makeVolumeUnitMenu(FluidUnit.Milliliters);
	row.appendChild(dropdown);

	row = makeRow();
	panel.appendChild(row);

	btn = makeMainMenuButton();
	row.appendChild(btn);

	btn = makeButton("Enter Data", "enter-weight-btn", () => {
		let weightAmount = new FluidAmount(
			numberFromTextbox(txtFluidWeight),
			getUnitFromAbbreviation(valueFromSelectMenu(drpWeightUnit)),
			valueFromSelectMenu(drpFluidName)
		);
		let volumeAmount = new FluidAmount(
			numberFromTextbox(txtFluidWeightVolume),
			getUnitFromAbbreviation(valueFromSelectMenu(drpVolumeUnit)),
			valueFromSelectMenu(drpFluidName)
		);

		recordFluidWeight(weightAmount, volumeAmount);
	});
	row.appendChild(btn);

	return panel;
}





loadCounter++;