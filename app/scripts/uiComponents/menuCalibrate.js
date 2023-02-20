

function menuCalibrateStart() {

    getRecipe();

    let panelId, panelTitle, promptText;
    let panel, row, btn, field, label, dropdown;
    let updateButton;

    /* begin panel */
    panelTitle = "Begin Pump Calibration";
    promptText = "Enter a number of seconds to calibrate the pump for, and select the fluid to calibrate.";
    panelId = "calibrate-start-panel";
    pnlCalibrateStart =
        panel = makeBasicPanel(panelTitle, panelId, promptText);
    panels.push(panel);

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

    let fluidList = ["No Fluid Data"];
    if (currentRecipe) {
        fluidList = currentRecipe.getFluids();
        fluidList.unshift("Select a Fluid")
    }
    label = makeLabel("calibrate-fluid", "Fluid to measure: ");
    dropdown = makeDropdown(fluidList);
    label.appendChild(dropdown);
    row.appendChild(label);

    row = makeRow();
    panel.appendChild(row);

    btn = makeButton("Start Pump", "calibrate-start-btn", calibrateStart);
    row.appendChild(btnCalibrateStart = btn);
    updateButton();

    btn = makeMainMenuButton();
    row.appendChild(btn);
    /* end panel */

    return panel;
}

function menuCalibrateEnd() {

    /* begin panel */
    panelTitle = "End Pump Calibration";
    promptText = "After the pump stops, enter the number of milliliters measured:";
    panelId = "calibrate-end-panel";
    pnlCalibrateEnd =
        panel = makeBasicPanel(panelTitle, panelId, promptText);
    main.appendChild(panel);
    panels.push(panel);

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

    btnCalibrateEnd =
        btn = makeButton("Confirm", "calibrate-confirm-btn", calibrateEnd);
    row.appendChild(btn);
    updateButton();

    btn = makeMainMenuButton();
    row.appendChild(btn);
    /* end panel */

    return panel;
}