

let recipeTargetVolume;

let calibrateFluidName = "";
let calibrateDuration = 1;

/** @type {Recipe}*/
let currentRecipe;

function calibrateStart(fluidName, durationSec) {
	calibrateFluidName = fluidName;
	calibrateDuration = durationSec;
	loadMenu(
		makeMessagePanel(
			`Pumping for ${durationSec} seconds to Calibrate`,
			"Calibrating for " + fluidName + "."
		)
	);
	//move to network?
	setTimeout(() => calibrateEnd(), durationSec * 1000);
	let command = new CommandData(CommandType.PumpCalibrateStart, fluidName, durationSec);
	let sendStr = command.toString();
	command.send();
}
function calibrateEnd() {
	//CommandType.PumpCalibrateEnd
	loadMenu(menuCalibrateEnd);
}
function calibrateSubmitActual(fluidAmountActual) {
	loadMenu(
		makeMessagePanel(
			`Calibration Finalized: ${calibrateFluidName}`,
			`The calculated flow rate is ${fluidAmountActual.Value / calibrateDuration} mL/sec`
		)
	);
	fluidAmountActual.Name = calibrateFluidName;
	let command = new CommandData(CommandType.PumpCalibrateActualVolume,
		calibrateFluidName, calibrateDuration, fluidAmountActual);
	let sendStr = command.toString();
	command.send();
}

function startRecipe(mixTargetVolume) {
	if (errorOnNoRecipe())
		return;
	recipeTargetVolume = mixTargetVolume;
	loadMenu(menuPrepareHose);
}

/** end of phase 2 */
function readyFluid() {
	if (errorOnNoRecipe())
		return;
	let amount = currentRecipe.currentFluid.Value;
	pumpAmount(amount);
	loadMenu(menuPumpFluid);

}
/** end of phase 3 */
function nextFluid() {
	if (errorOnNoRecipe())
		return;
	if (currentRecipe.hasNext()) {
		currentRecipe.next();
		loadMenu(menuPrepareHose);
	}
	else
		loadMenu(makeMessagePanel("Recipe Finished!"));
}

function errorOnNoRecipe() {
	if (!currentRecipe) {
		loadMenu(makeMessagePanel("No Recipe Found", "Please check the connection."));
		return true;
	}
	if (!currentRecipe.currentFluid) {
		loadMenu(makeMessagePanel("No Desginated Fluid", "Please check the recipe."));
		return true;
	}
	return false;

}

function pauseFluid() {

}

function cancelFluid() {

}

function setPump(isOn) {

	let command = new CommandData(CommandType.SetPump, isOn);
	//command.setArguments(isOn);
	let sendStr = command.toString();
	command.send();
}

/** Tells the server to pump a given amount of fluid. */
function pumpAmount(fluidAmount) {
	let command = new CommandData(CommandType.PumpAmount, fluidAmount);
	let sendStr = command.toString();
	command.send();

}
/** Tells the server to pump for a given amount of time. */
function pumpTime(timeInMs) {
	let command = new CommandData(CommandType.PumpTime, timeInMs);
	let sendStr = command.toString();
	command.send();

}

function getRecipe() {

	let request = new CommandData(CommandType.RecipeRequest);
	request.send();
}