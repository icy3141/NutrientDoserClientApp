

let pnlMixRecipe;
let btnStartRecipe, txtMixTargetVolume;

/** Phase 1 of mix recipe sequence */
function menuMixRecipe() {


    let panelId, panelTitle, promptText;
    let panel, row, btn, field, label, dropdown;
    let updateButton;

    /* begin panel */
    panelTitle = "Mix Recipe";
    promptText = "Error: problem loading recipe.";
    panelId = "mix-recipe-panel";
    pnlMixRecipe =
        panel = makeBasicPanel(panelTitle, panelId, promptText);


    row = makeRow();
    panel.appendChild(row);

    updateButton = () => {
        const textbox = txtMixTargetVolume;
        const button = btnStartRecipe;
        disableButtonIf(button, () =>
            !isTextboxInRange(textbox, 0)
            || !currentRecipe);
    };
    field = makeNumField("mix-target-volume", "Mix for ", " gallons of water", updateButton);
    txtMixTargetVolume = getInputFromLabel(field);
    row.appendChild(field);

    let pnlRecipeDisplay =
    row = makeRow();
    panel.appendChild(row);
    row.classList.add("recipe-display-panel");

    row = makeRow();
    panel.appendChild(row);

    btnStartRecipe = btn =
        makeButton("Begin", "start-recipe-btn",
            () => startRecipe(numberFromTextbox(txtMixTargetVolume))
        );
    row.appendChild(btn);
    updateButton();

    btn = makeMainMenuButton();
    row.appendChild(btn);
    /* end panel */

    if (currentRecipe) {
        promptText = "Follow the prompts to measure each amount for the recipe.";
        setPrompt(panel, promptText);
        showRecipe(currentRecipe, pnlRecipeDisplay);
    }

    return panel;
}
/** Phase 2 of mix recipe sequence, repeats after each phase 3*/
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


    row = makeRow();
    panel.appendChild(row);

    //This button starts the pump because user has indicated the hose is in the bottle
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
        promptText += `Please put the pump intake hose into the bottle of ${currentRecipe.currentFluid.Name}, then press ready.`;
        setPrompt(panel, promptText);
    }

    return panel;
}

/** Phase 3 of mix recipe sequence, repeats after each phase 2 until end*/
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


    row = makeRow();
    panel.appendChild(row);

    btnNextFluid =
        btn = makeButton("Next", "next-fluid-btn", nextFluid);
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
    if (currentRecipe) {
        promptText = "";
        promptText += `Mixing for ${recipeTargetVolume} gallons of water.`;
        promptText += `<br />`;
        promptText += `Pumping ${formatDecimal(currentRecipe.getCurrentFullAmount(), 2)} mL of ${currentRecipe.currentFluid.Name}...`;
        setPrompt(panel, promptText);
    }

    return panel;
}

loadCounter++;