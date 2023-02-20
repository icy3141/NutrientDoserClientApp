
/* References to Specific UI elements */


let pnlCalibrateStart;
let txtCalibrateDuration, btnCalibrateStart;
let pnlCalibrateEnd;
let txtCalibrateAmount, btnCalibrateEnd;

let pnlPumpControl, btnTogglePump;
let txtPumpTime, btnPumpTime;

let pnlMixRecipe;
let btnStartRecipe, txtMixTargetVolume;
let connectionIndicatorDiv, connectionIndicator, connectionIndicatorText;

let pnlPrepareHose;
let btnHoseReady;

let pnlPumpFluid;

let mainDiv;

let panels = [];
let currentPanel;


function makeConnectionIndicator() {

}

/** Create the UI
 */
function initUi() {


    mainDiv = document.getElementById("main");

    /* begin connection indicator */
    connectionIndicatorDiv = document.createElement("div");
    connectionIndicatorDiv.className = "connection-indicator-container";
    mainDiv.appendChild(connectionIndicatorDiv);

    connectionIndicator = document.createElement("div");
    connectionIndicatorDiv.appendChild(connectionIndicator);

    connectionIndicatorText = document.createElement("div");
    connectionIndicatorText.className = "connection-indicator-text";
    connectionIndicatorDiv.appendChild(connectionIndicatorText);

    showDisconnected();
    /* end connection indicator */

    loadMenu(menuMain);
    

}