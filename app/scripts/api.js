

let recipeTargetVolume;

/** @type {Recipe}*/
let currentRecipe;

function calibrateStart() {
    loadMenu(menuCalibrateEnd);
}
function calibrateEnd() {
    loadMenu(menuMain);
}

function startRecipe(mixTargetVolume) {
    recipeTargetVolume = mixTargetVolume;
    loadMenu(menuPrepareHose);
}

function readyFluid() {
    loadMenu(menuPumpFluid);
}

function nextFluid() {

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

function pumpAmount(fluidAmount) {
    let command = new CommandData(CommandType.PumpAmount, fluidAmount);
    let sendStr = command.toString();
    command.send();

}
function pumpTime(timeInMs) {
    let command = new CommandData(CommandType.PumpTime, timeInMs);
    let sendStr = command.toString();
    command.send(socket);

}

function getRecipe() {

    let request = new CommandData(CommandType.RecipeRequest);
    request.send(socket);
}