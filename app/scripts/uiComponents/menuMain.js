let pnlMainMenu;

function menuMain() {

    let panelId, panelTitle, promptText;
    let panel, row, btn, field, label, dropdown;
    let updateButton;

    /* begin panel */
    pnlMainMenu =
        panel = makeBasicPanel("Main Menu", "main-menu-panel",
            "Select an option:");

    row = makeRow();
    panel.appendChild(row);

    btn = makePageLinkButton("Calibrate Pump", "calibrate-pump-btn", menuCalibrateStart);
    row.appendChild(btn);

    btn = makePageLinkButton("Pump Control", "pump-control-btn", menuPumpControl);
    row.appendChild(btn);

    btn = makePageLinkButton("Mix Recipe", "mix-recipe-btn", menuMixRecipe);
    row.appendChild(btn);
    /* end panel */

    return panel;
}