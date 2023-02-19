// Nutrient Doser Client App
// Main Entry Point

// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file


const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp@latest/app/";
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

function addScriptViaDocumentWrite(fileName) {
    var script = '<script type="text/javascript" src="';
    if (useCdn)
        script += myCdnPath + "scripts/" + fileName;
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