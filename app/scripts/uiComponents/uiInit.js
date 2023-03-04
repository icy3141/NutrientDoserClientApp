
/* References to Specific UI elements */


let pnlCalibrateStart;
let txtCalibrateDuration, btnCalibrateStart;
let pnlCalibrateEnd;
let txtCalibrateAmount, btnCalibrateEnd;


let pnlPrepareHose;
let btnHoseReady;

let pnlPumpFluid;

let mainDiv;

let panels = [];
let currentPanel;

let connectionIndicatorDiv, connectionIndicator, connectionIndicatorText;


function makeConnectionIndicator() {

    connectionIndicatorDiv = document.createElement("div");
    connectionIndicatorDiv.className = "connection-indicator-container";
    mainDiv.appendChild(connectionIndicatorDiv);

    connectionIndicator = document.createElement("div");
    connectionIndicatorDiv.appendChild(connectionIndicator);

    connectionIndicatorText = document.createElement("div");
    connectionIndicatorText.className = "connection-indicator-text";
    connectionIndicatorDiv.appendChild(connectionIndicatorText);
}
/** Create the UI
 */
function initUi() {

    mainDiv = document.getElementById("main");

    /* begin connection indicator */
    makeConnectionIndicator();
    showDisconnected();
    /* end connection indicator */

	var btn;
	btn = makeButton("Prime Pump", "prime-pump-btn", null);
	let pumpOn = () =>
	{
		setPump(true);
	};
	let pumpOff = () =>
	{
		setPump(false);
	};
	btn.ontouchstart = pumpOn;
	btn.onmousedown = pumpOn;
	btn.onmouseup = pumpOff;
	btn.ontouchend = pumpOff;
	btn.ontouchcancel = pumpOff;
	document.body.appendChild(btn);
	btn = makeButton("Toggle Pump", "toggle-pump-btn", () => setPump(!isPumpOn));
	document.body.appendChild(btn);

	btn = makeButton("Reconnect", "reconnect-btn", connect);
	btn.style.float = "left";
	connectionIndicatorDiv.prepend(btn);

    loadMenu(menuMain);
}


loadCounter++;