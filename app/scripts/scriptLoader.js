// Nutrient Doser Client App
// Main Entry Point

// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file


const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp@master/app/";

// list of js file to load
const myJs = [
    "Recipe",
    "CommandType",
    "CommandData",
    "socket",
    "api",
    "uiTools",
    "uiInit",
    "ui",
    "uiComponents/menuMain",
    "uiComponents/menuMixRecipe",
    "main"
];

//append .js
for (let i = 0; i < myJs.length; i++) {
    myJs[i] += ".js";
}

/** Changes a filepath based on platform.
 * @param {string} fileName The filename to change.
 * @returns {string} The changed path.
 * */
function modifyFileNameForPlatform(fileName) {

    if (useCdn)
        script += myCdnPath + "scripts/" + fileName;
    else {
        ////disabled because this is being handled on the http server now
        //if (useSpiffs) {
        //    //remove folders if on SPIFFS
        //    let nameParts = fileName.split("/");
        //    if (nameParts.length > 0)
        //        fileName = nameParts.pop();
        //}
        //else {
            script += "scripts/";
        //}
        script += fileName;
    }
}

/** Adds a script tag to the html page.
 * @param {string} fileName
 * */
function addScriptViaDocumentWrite(fileName) {
    var script = '<script type="text/javascript" src="';
    script += fileName;
    script += '"></script>';
    document.writeln(script);
}

/** checks whether all scripts are loaded yet
 * @returns {boolean}
 * */
function areAllScriptsLoaded() {
    return initialize instanceof Function ||
        typeof initialize != 'undefined';
}

//start loading all the scripts
for (let i = 0; i < myJs.length; i++) {
    addScriptViaDocumentWrite(modifyFileNameForPlatform(myJs[i]));
}
//wait for scripts to complete, then initialize the page
const loaderTimer = setInterval(() => {
    if (areAllScriptsLoaded()) {
        clearInterval(loaderTimer);
        initialize();
    }
}, 50);