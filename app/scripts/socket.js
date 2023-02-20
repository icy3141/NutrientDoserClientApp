
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
        socketIsOpen = true;
        showConnected();
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
    socket.onopen = onOpen;
    socket.onclose = onClose;
    socket.onmessage = onMessage;
    socket.onerror = onError;
}



function interpretMessage(message) {
    let command = CommandData.parse(message);
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