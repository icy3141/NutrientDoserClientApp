// Nutrient Doser Client App
// Main Entry Point
let loadCounter = 0;

// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file
const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp@master/app/";

// list of js file to load
const myJs = [
    "Recipe",
    "FluidUnit",
    "CommandType",
    "CommandData",
    "socket",
    "api",
    "uiComponents/uiTools",
    "uiComponents/uiInit",
    "uiComponents/ui",
    "uiComponents/menuMain",
    "uiComponents/menuMixRecipe",
    "uiComponents/menuCalibrate",
    "main"
];

/** Adds ".js" after each file name in an array
 * @param {string[]} jsFileNames
 * */
function appendDotJs(jsFileNames) {
    //append .js
    for (let i = 0; i < jsFileNames.length; i++) {
        jsFileNames[i] += ".js";
    }
}

/** Changes a filepath based on platform.
 * @param {string} fileName The filename to change.
 * @returns {string} The changed path.
 * */
function modifyFileNameForPlatform(fileName) {
    if (useCdn) {
        return myCdnPath + "scripts/" + fileName;
    }
    return "scripts/" + fileName;
}

/** Adds a script tag to the html page.
 * @param {string} fileName
 * */
function addScriptViaDocumentWrite(fileName) {
    var script = '<script type="text/javascript" src="';
    script += modifyFileNameForPlatform(fileName);
    script += '"></script>';
    document.writeln(script);
}
function addScriptViaDOM(fileName) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = modifyFileNameForPlatform(fileName);
    // script.onload += () => {
    //     alert("loaded " + fileName);
    // }
    document.head.appendChild(script);
}

/** Adds a script tag to the html page for each filename in an array.
 * @param {string[]} fileNames
 * */
function addAllScripts(fileNames) {
    for (let i = 0; i < myJs.length; i++) {
        //addScriptViaDocumentWrite(modifyFileNameForPlatform(myJs[i]));
        
        addScriptViaDOM(myJs[i]);
    }
}

/** checks whether all scripts are loaded yet
 * @returns {boolean}
 * */
function areAllScriptsLoaded() {
    return typeof initialize != 'undefined' &&
		loadCounter == myJs.length;
}

function log(message)
{
	document.getElementById("console").innerText= "\n" + message;
	console.log(message);
}

// Begin Entry Point

// start loading all the scripts
appendDotJs(myJs);
addAllScripts(myJs);
let lastLoadCounter = 0;
// wait for scripts to complete, then initialize the page
const loaderTimer = setInterval(() => {
	if(loadCounter > lastLoadCounter)
		log(`Loaded Scripts: ${loadCounter} / ${myJs.length}`);
    if (areAllScriptsLoaded()) {
		document.getElementById("console").style.display = "none";
        clearInterval(loaderTimer);
        initialize();
    }
	lastLoadCounter = loadCounter;
}, 50);