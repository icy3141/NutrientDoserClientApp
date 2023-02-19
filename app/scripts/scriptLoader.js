// Nutrient Doser Client App
// Main Entry Point

// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file

let useCdn = false;


const myCdnPath1 = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp@latest/app/";
//const myCdnPath = "https://raw.githubusercontent.com/icy3141/NutrientDoserClientApp/main/app/";

const myJs = [
    "Recipe",
    "CommandType",
    "CommandData",
    "socket",
    "api",
    "uiTools",
    "uiInit",
    "ui",
    "main"
];

//append .js
for (let i = 0; i < myJs.length; i++) {
    myJs[i] += ".js";
}

let loadCounter = 0;


//function addScript(fileName) {
//    var script = document.createElement('script');
//    script.type = 'text/javascript';
//    script.onload += handleLoad;
//    script.onreadystatechange = handleReadyStateChange;
//    script.onerror += (oError) => {
//        throw new URIError(`The script ${oError.target.src} didn't load correctly.`);
//    };
//    script.src = myCdnPath1 + "scripts/" + fileName;
//    document.head.appendChild(script);
//}
//function handleLoad() {
//    if (typeof showRecipe != 'undefined') {
//        initialize();
//    }
//}

//function handleReadyStateChange(evt) {
//    var state;

//    if (typeof showRecipe != 'undefined') {
//        state = evt.readyState;
//        if (state === "complete") {
//            handleLoad();
//        }
//    }
//}
function addScriptViaDocumentWrite(fileName) {
    var script = '<script type="text/javascript" src="';
    if (useCdn)
        script += myCdnPath1 + "scripts/" + fileName;
    else {
        if (!useSpiffs)
            script += "scripts/";
        script += fileName;
    }
    script += '"></script>';

    document.writeln(script);
}


function areAllScriptsLoaded() {
    //return loadCounter == myJs.length;
    return typeof initialize != 'undefined';
}

for (let i = 0; i < myJs.length; i++) {
    addScriptViaDocumentWrite(myJs[i]);
}
const loaderTimer = setInterval(() => {
    if (areAllScriptsLoaded()) {
        clearInterval(loaderTimer);
        initialize();
    }
}, 50);