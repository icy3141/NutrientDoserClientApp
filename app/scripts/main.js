
// jsdeliver CDN
// https://www.jsdelivr.com/documentation#id-github
// template:
// https://cdn.jsdelivr.net/gh/user/repo@version/file

const myCdnPath = "https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/";




<script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/Recipe.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/CommandType.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/CommandData.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/socket.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/api.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/uiTools.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/uiInit.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/ui.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/icy3141/NutrientDoserClientApp/app/script.js" type="text/javascript"></script>

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

requirejs(myJs, function (util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    initialize();
});


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