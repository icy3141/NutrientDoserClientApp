

function initialize() {
    initUi();

    try {
        connect();
    }
    catch (e) {
        console.log(e);
        showDisconnected();
    }
}