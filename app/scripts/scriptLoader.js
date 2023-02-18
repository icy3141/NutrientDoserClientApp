// Nutrient Doser Client App
// Main Entry Point

// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file



//const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp@latest/app/";
const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp@latest/app/";

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

function addScript(fileName) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = myCdnPath + "scripts/" + fileName;
    script.onload += () => {
        loadCounter++;
    }
    document.head.appendChild(script);
}

function areAllScriptsLoaded() {
    return loadCounter == myJs.length;
}

for (let i = 0; i < myJs.length; i++) {
    addScript(myJs[i]);
}

const loaderTimer = setInterval(() => {
    if (areAllScriptsLoaded()) {
        clearInterval(loaderTimer);
        initialize();
    }
}, 50);