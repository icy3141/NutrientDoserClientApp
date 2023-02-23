
let socket;
let socketIsOpen = false;

function disconnect() {
	socket.close();
}
function afterConnect() {
	getRecipe();
}

function connect() {

	socketIsOpen = false;
	showConnecting();

	function onOpen(evt) {
		alert("WebSocket.onOpen!");
		//socketIsOpen = true;
	}
	function onClose(evt) {
		socketIsOpen = false;
		showDisconnected();
	}
	function onError(evt) {
		socketIsOpen = false;
		showDisconnected();
	}
	function onMessage(evt) {
		if (!socketIsOpen) {
			socketIsOpen = true;
			showConnected();
			afterConnect();
		}

		message = evt.data;
		console.log("received WebSockets command:\n" + message);
		interpretMessage(message);
	}
	let host;
	if (location.hostname.includes("192.168"))
		host = location.hostname;
	else
		host = "192.168.2.154";
	var wsUri = "ws://" + host + ":80";
	socket = new WebSocket(wsUri);
	socket.binaryType = "blob";
	socket.onopen += onOpen;
	socket.onclose = onClose;
	socket.onmessage = onMessage;
	socket.onerror = onError;

	waitForSocketConnection();
}

/** Map of command types to maps of unique names to functions
 * if one of the command types is received, all functions keyed to it will invoke
 * @type {Map<Number, Map<string, Function> >}*/
let onServerMessage = new Map();


/**
 * @param {CommandData}*/
function handleCustomMessageEvent(command) {
	if (onServerMessage.has(command.Type)) {
		let functionsForType = onServerMessage.get(command.Type);
		let functionIterator = [...functionsForType.values()];
		for (let func of functionIterator) {
			//pass the recieved command to the callback in case it needs it
			func(command);
		}
	}
}
/** Adds an onMessage event for a certain command.
 * @param {number} commandType The command type to watch for.
 * @param {string} uniqueName A unique name to key to the callback.
 * @param {Function} callbackFunction A callback function to incoke when the given command is detected.
 * */
function attachOnMessage(commandType, uniqueName, callbackFunction) {
	let functionsForType;
	if (onServerMessage.has(commandType)) {
		functionsForType = onServerMessage.get(commandType);
		functionsForType.set(uniqueName, callbackFunction);
	}
	else {
		functionsForType = new Map();
		functionsForType.set(uniqueName, callbackFunction);
		onServerMessage.set(commandType, functionsForType);
	}
}
/** Removes an onMessage event for a certain command.
 * @param {number} commandType The command type to watch for.
 * @param {string} uniqueName A unique name to key to the callback.
 * */
function detachOnMessage(commandType, uniqueName) {
	if (onServerMessage.has(commandType)) {
		functionsForType = onServerMessage.get(commandType);
		if (functionsForType.has(uniqueName)) {
			functionsForType.delete(uniqueName);
		}
	}
}



function interpretMessage(message) {
	let command = CommandData.parse(message);
	handleCustomMessageEvent(command);
	switch (command.Type) {
		case CommandType.Ping:
			{
				break;
			}
		case CommandType.Recipe:
			{
				let recipeJsonObj = command.Arguments[0];
				let recipe = Recipe.parse(recipeJsonObj);
				currentRecipe = recipe;
				break;
			}
	}

}

function pingAndWaitThenDo(doOnResponse) {

	let wasPingRespondedTo = false;
	let timeoutMs = 250;
	let waitIntervalMs = 50;
	let elapsedMs = 0;
	let attempts = 0;
	let attemptLimit = 5;

	attachOnMessage(CommandType.Response, "handshakePingWaiter",
		(command) => {
			if (command.Arguments[0] == CommandType.Ping) {
				wasPingRespondedTo = true;
				detachOnMessage(CommandType.Response, "handshakePingWaiter");
				if (doOnResponse) {
					doOnResponse();
				}
			}
		});

	let pingCommand = new CommandData(CommandType.Ping);
	pingCommand.send();

	function recursiveWaiter() {
		if (wasPingRespondedTo) {
			return; // stop looping
		}
		elapsedMs += waitIntervalMs;
		if (elapsedMs >= timeoutMs) {
			elapsed = 0;
			attempts++;
			pingCommand.send();
			console.log()
		}
		if (attempts < attemptLimit)
			setTimeout(recursiveWaiter, waitIntervalMs);
		else
			showDisconnected();
	}
	recursiveWaiter();
}


// Make the function wait until the connection is made...
function waitForSocketConnection() {
	setTimeout(
		() => {
			pingAndWaitThenDo(() => {
				socketIsOpen = true;
				showConnected();
				afterConnect();
			});
		}, 300);

	//setTimeout(
	//    function () {
	//        if (socketIsOpen) {

	//            pingAndWaitThenDo(() => {
	//                socketIsOpen = true;
	//                showConnected();
	//                afterConnect();
	//            });
	//        } else {
	//            console.log("wait for connection...")
	//            waitForSocketConnection();
	//        }
	//    }, 20); // wait 20 ms for the connection...
}