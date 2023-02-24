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

    btn = makeButton("Print Config", "config-print-btn", printConfig);
    row.appendChild(btn);
    /* end panel */

    return panel;
}

function printConfig()
{
	attachOnMessage(CommandType.Response, "configPrint", (command) =>
	{
		if(command.Arguments[0] == CommandType.ConfigData)
			mainDiv.innerHTML += JSON.stringify(command.Arguments[1]);
		detachOnMessage(CommandType.Response, "configPrint");
	});
	new CommandData(CommandType.ConfigData).send();
}


loadCounter++;