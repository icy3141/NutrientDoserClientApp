
//let form = document.forms.namedItem("uiForm");
//let inputElem = form.elements["input1"];

//let promptElem = document.getElementById("prompt");
//promptElem.innerText = ;








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