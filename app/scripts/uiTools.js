﻿
function disableButtonIf(button, condition) {
    button.disabled = condition();
}
function textboxValueAsInt(textbox) {
    try {
        return Number.parseInt(textbox.value);
    }
    catch (e) {
        console.log(e);
    }
    return Number.NaN;
}
function textboxValueAsFloat(textbox) {
    try {
        return Number.parseFloat(textbox.value);
    }
    catch (e) {
        console.log(e);
    }
    return Number.NaN;
}
function numberFromTextbox(textbox) {
    if (textbox.value.includes("."))
        return textboxValueAsFloat(textbox);
    return textboxValueAsInt(textbox);
}
function isTextboxEmpty(textbox) {
    return textbox.value == "";
}
function isTextboxInRange(textbox, min, max) {
    let inRange = true;
    let val = numberFromTextbox(textbox);
    if (min !== undefined)
        inRange &= val >= min;
    if (max !== undefined)
        inRange &= val <= max;
    return inRange;
}

function getInputFromLabel(label) {
    let collection = label.getElementsByTagName("input");
    if (collection && collection.length > 0)
        return collection[0];
    return null;
}
function setPrompt(container, text) {
    let arr = container.getElementsByClassName("prompt");

    if (arr && arr.length > 0) {
        let elem = arr[0];
        elem.innerHTML = text;
    }
}

function makeRow() {
    let container = document.createElement("div");
    container.className = "button-row";
    return container;
}
function makeButton(text, className, onclick) {
    let button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.onclick = onclick;
    return button;
}
function makePageLinkButton(text, className, panelCreateFunction) {
    return makeButton(text, className, () => loadMenu(panelCreateFunction));
}
function makeToggle(id, beforeText, afterText, ontoggle) {
    let label = document.createElement("label");
    label.id = id;
    label.append(beforeText);
    let panel = document.createElement("span");
    panel.className = "toggle-switch";
    panel.innerHTML = "&nbsp;";
    label.appendChild(panel);
    let checkbox = document.createElement("input");
    checkbox.id = id + "-toggle-btn";
    checkbox.type = "checkbox";
    checkbox.oninput = ontoggle;
    panel.appendChild(checkbox);
    let inner = document.createElement("span");
    inner.className = "toggle-switch-slider";
    panel.appendChild(inner);
    label.append(afterText);
    return label;
}
function makeField(id, beforeText, afterText, onchange, defaultValue, inputType) {
    if (inputType == undefined)
        inputType = "text";
    let label = makeLabel(id, beforeText);
    let textbox = document.createElement("input");
    textbox.id = id + "-input";
    textbox.type = inputType;
    textbox.oninput = onchange;
    if (defaultValue != undefined)
        textbox.value = defaultValue;
    label.appendChild(textbox);
    label.append(afterText);
    return label;
}
function makeNumField(id, beforeText, afterText, onchange, defaultValue) {
    return makeField(id, beforeText, afterText, onchange, defaultValue, "number");
}

function makeLabel(id, text) {
    let label = document.createElement("label");
    label.id = id;
    label.append(text);
    return label;
}

/**
 * @param {string[]} options
 * */
function makeDropdown(options) {
    let dropdown = document.createElement("select");
    for (let optionText of options) {
        dropdown.add(new Option(optionText, optionText));
    }
    return dropdown;
}
function makeMainMenuButton() {
    return makePageLinkButton("Main Menu", "main-menu-btn", menuMain);
}

function makeBasicPanel(titleText, panelId, promptText) {
    let container = document.createElement("div");
    container.id = panelId;
    container.className = "page-panel";

    let heading = document.createElement("h2");
    heading.innerText = titleText;
    container.appendChild(heading);

    let prompt = document.createElement("p");
    prompt.className = "prompt";
    prompt.innerHTML = promptText;
    container.appendChild(prompt);

    return container;
}


function loadMenu(panelOrCreateFn) {
    //hideAllMenus();
    //showMenu(container);
    let panel = panelOrCreateFn;
    if (panelOrCreateFn instanceof Function)
        panel = panelOrCreateFn();
    let main = document.getElementById("main");
    if (currentPanel)
        currentPanel.remove();
    currentPanel = panel;
    main.appendChild(panel);
    return panel;
}

/*function showMenu(container) {
    
    if (container.classList.contains("inactive"))
        container.classList.remove("inactive");
}
function hideMenu(container) {
    if (!container.classList.contains("inactive"))
        container.classList.add("inactive");
    //container.style.display = "none";
}

function hideAllMenus() {

    let container;

    for (const container of panels) {
        hideMenu(container);
    }
}*/
