// Nutrient Doser Client App
// Main Entry Point

// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file



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


const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/";

const myJs = [
    "Recipe",
    "CommandType",
    "CommandData",
    "socket",
    "api",
    "uiTools",
    "uiInit",
    "ui"
];

//append .js
for (let i = 0; i < myJs.length; i++) {
    myJs[i] += ".js";
}

require.config({
    baseUrl: myCdnPath
    /*paths: {
        "some": "some/v1.0"
    },*/
    /*waitSeconds: 15*/
});

requirejs(myJs, function (util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    initialize();
});