/* UI interactions and behaviors */


/* Connection Indicator Functions */
function resetConnectionIndicator() {
	connectionIndicator.className = "connection-indicator";
}
function showDisconnected() {
	resetConnectionIndicator();
	connectionIndicator.classList.add("disconnected");
	connectionIndicatorText.innerText = "Not Connected";
}
function showConnecting() {
	resetConnectionIndicator();
	connectionIndicator.classList.add("connecting");
	connectionIndicatorText.innerText = "Connecting...";
}
function showConnected() {
	resetConnectionIndicator();
	connectionIndicator.classList.add("connected");
	connectionIndicatorText.innerText = "Connected!";
}


let pnlPumpControl, btnTogglePump;
let txtPumpTime, btnPumpTime;
let txtPumpAmount;


/* Go To Menu Functions */


function menuPumpControl() {

	let panelId, panelTitle, promptText;
	let panel, row, btn, field, label, dropdown;
	let updateButton;

	/* begin panel */
	panelTitle = "Pump Control";
	promptText = "Control the pump directly:";
	panelId = "pump-control-panel";
	pnlPumpControl =
		panel = makeBasicPanel(panelTitle, panelId, promptText);
	panels.push(panel);

	row = makeRow();
	panel.appendChild(row);

	field = makeToggle("pump", "Off", "On", () => setPump(btnTogglePump.checked));
	//field = makeToggle("pump", "On/Off: ", "", () => setPump(btnTogglePump.checked));
	btnTogglePump = getInputFromLabel(field);
	row.appendChild(field);

	//btn = makeButton("Off", "pump-off-btn", () => setPump(this.checked));
	//row.appendChild(btn);

	row = makeRow();
	panel.appendChild(row);

	field = makeNumField("pump-amount", "Pump volume of ", " mL");
	txtPumpAmount = getInputFromLabel(field);
	row.appendChild(field);

	btn = makeButton("Go", "pump-amount-btn",
		() => pumpAmount({ Value: numberFromTextbox(txtPumpAmount), Name: "", Unit: 1 }));
	row.appendChild(btn);

	row = makeRow();
	panel.appendChild(row);

	updateButton = () => {
		const textbox = txtPumpTime;
		const button = btnPumpTime;
		disableButtonIf(button, () => !isTextboxInRange(textbox, 0));
	};
	field = makeNumField("pump-time", "Turn on pump for ", " seconds", updateButton);
	txtPumpTime = getInputFromLabel(field);
	row.appendChild(field);

	btnPumpTime =
		btn = makeButton("Go", "pump-time-btn",
			() => pumpTime(numberFromTextbox(txtPumpTime))
		);
	row.appendChild(btn);
	updateButton();

	row = makeRow();
	panel.appendChild(row);

	btn = makeMainMenuButton();
	row.appendChild(btn);
	/* end panel */

	return panel;
}




function showRecipe(recipe, panel) {

	recipe.Fluids.forEach((val, key, m) => {
		let cell;

		cell = document.createElement("div");
		cell.className = "recipe-fluid-cell";
		cell.innerText = `${key}`;
		panel.appendChild(cell);

		cell = document.createElement("div");
		cell.className = "recipe-amount-cell";
		cell.innerText = `${formatDecimal(val.Value, 2)} mL/gal`;
		panel.appendChild(cell);
	});
}