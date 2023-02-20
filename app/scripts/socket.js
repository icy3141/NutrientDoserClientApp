
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
        waitForPing(() => {
            socketIsOpen = true;
            showConnected();
            afterConnect();
        })
        setTimeout(afterConnect, 100);
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
        socketIsOpen = true;
        showConnected();

        message = evt.data;
        interpretMessage(message);
    }

    var wsUri = "ws://" + location.hostname + ":80";
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
        let functionIterator = functionsForType.values;
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
    if (onServerMessage.has(command.Type)) {
        functionsForType = onServerMessage.get(command.Type);
        functionsForType.set(uniqueName, callbackFunction);
    }
    else {
        functionsForType = new Map();
        functionsForType.set(uniqueName, callbackFunction);
        onServerMessage.set(commandType, functionsForType);
    }
}
function detachOnMessage(commandType, uniqueName) {
    if (onServerMessage.has(command.Type)) {
        functionsForType = onServerMessage.get(command.Type);
        if (functionsForType.has(uniqueName)) {
            functionsForType.delete(uniqueName);
        }
    }
}



function interpretMessage(message) {
    let command = CommandData.parse(message);
    handleCustomMessageEvent(command);
    switch (command.Type) {
        case CommandType.Recipe:
            {
                let recipeJsonObj = command.Arguments[0];
                let recipe = Recipe.parse(recipeJsonObj);
                currentRecipe = recipe;
                break;
            }
    }

}

async function waitForPing(doOnResponse) {

    let wasPingRespondedTo = false;

    new CommandData(CommandType.Ping).send();

    attachOnMessage(CommandType.Response, "handshakeWaiter",
        (command) => {
            if (command.Arguments[0] == CommandType.Ping) {
                wasPingRespondedTo = true;
                detachOnMessage(CommandType.Ping, "handshakeWaiter");
                if (doOnResponse)
                    doOnResponse();
            }
        }
    );
    function recursiveWaiter()
    {
        if (!wasPingRespondedTo)
            setTimeout(recursiveWaiter, 100);
    }

}


// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback) {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null) {
                    callback();
                }
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}