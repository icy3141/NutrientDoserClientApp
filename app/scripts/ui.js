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


/* Go To Menu Functions */


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
    row.appendChild(field);

    btn = makeButton("Go", "pump-amount-btn", () => setPump(false));
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

function menuMixRecipe() {


    let panelId, panelTitle, promptText;
    let panel, row, btn, field, label, dropdown;
    let updateButton;

    /* begin panel */
    panelTitle = "Mix Recipe";
    promptText = "Follow the prompts to measure each amount for the recipe.";
    panelId = "mix-recipe-panel";
    pnlMixRecipe =
        panel = makeBasicPanel(panelTitle, panelId, promptText);
    main.appendChild(panel);
    panels.push(panel);


    row = makeRow();
    panel.appendChild(row);

    updateButton = () => {
        const textbox = txtMixTargetVolume;
        const button = btnStartRecipe;
        disableButtonIf(button, () => !isTextboxInRange(textbox, 0));
    };
    field = makeNumField("mix-target-volume", "Mix for ", " gallons of water", updateButton);
    txtMixTargetVolume = getInputFromLabel(field);
    row.appendChild(field);

    row = makeRow();
    panel.appendChild(row);

    btnStartRecipe =
        btn = makeButton("Begin", "start-recipe-btn",
            () => startRecipe(numberFromTextbox(txtMixTargetVolume))
        );
    row.appendChild(btn);
    updateButton();

    btn = makeMainMenuButton();
    row.appendChild(btn);
    /* end panel */

    if (currentRecipe)
        showRecipe(currentRecipe);

    return panel;
}

function menuPrepareHose() {


    let panelId, panelTitle, promptText;
    let panel, row, btn, field, label, dropdown;
    let updateButton;

    /* begin panel */
    panelTitle = "Mix Recipe - Prepare Hose";
    promptText = "Error: problem loading recipe.";
    panelId = "prepare-hose-panel";
    pnlPrepareHose =
        panel = makeBasicPanel(panelTitle, panelId, promptText);
    main.appendChild(panel);
    panels.push(panel);


    row = makeRow();
    panel.appendChild(row);

    btnHoseReady =
        btn = makeButton("Ready", "hose-ready-btn", readyFluid);
    row.appendChild(btn);
    //updateButton();

    //btnCancelFluid =
    //    btn = makeButton("Cancel", "cancel-fluid-btn", cancelFluid);
    //row.appendChild(btn);
    //updateButton();

    btn = makeMainMenuButton();
    row.appendChild(btn);
    /* end panel */

    if (currentRecipe) {
        currentRecipe.updateCurrentFluid();
        promptText = "";
        promptText += `Mixing for ${recipeTargetVolume} gallons of water.`;
        promptText += `<br />`;
        promptText += `Please put the pump intake hose into the bottle of ${currentRecipe.currentFluid}, then press ready.`;
        setPrompt(panel, promptText);
    }

    return panel;
}

function menuPumpFluid() {

    let panelId, panelTitle, promptText;
    let panel, row, btn, field, label, dropdown;
    let updateButton;


    /* begin panel */
    panelTitle = "Mix Recipe - Pump Fluid";
    promptText = "Error: problem loading recipe.";
    panelId = "pump-fluid-panel";
    pnlPumpFluid =
        panel = makeBasicPanel(panelTitle, panelId, promptText);
    main.appendChild(panel);
    panels.push(panel);


    row = makeRow();
    panel.appendChild(row);

    btnNextFluid =
        btn = makeButton("Next", "next-fluid-btn", pauseFluid);
    row.appendChild(btn);
    //updateButton();

    //btnPauseFluid =
    //    btn = makeButton("Pause", "pause-fluid-btn", pauseFluid);
    //row.appendChild(btn);
    //updateButton();

    //btnCancelFluid =
    //    btn = makeButton("Cancel", "cancel-fluid-btn", cancelFluid);
    //row.appendChild(btn);
    //updateButton();

    btn = makeMainMenuButton();
    row.appendChild(btn);
    /* end panel */

    // 
    if (!currentRecipe)
        return panel;

    promptText = "";
    promptText += `Mixing for ${recipeTargetVolume} gallons of water.`;
    promptText += `<br />`;
    promptText += `Pumping ${currentRecipe.get(currentRecipe.currentFluid)} mL of ${currentRecipe.currentFluid}...`;
    setPrompt(panel, promptText);

    return panel;
}




function showRecipe(recipe) {
    let map = new Map();
    let pnlRecipe = document.createElement("div");

    pnlMixRecipe.appendChild(pnlRecipe);
    recipe.forEach((val, key, m) => {
        pnlRecipe.innerHTML += `${key}: ${val} mL/gal<br />`;
    });
}