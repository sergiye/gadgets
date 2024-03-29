/** @type {Array} */
var _0xb520 = ["lid_323903", "metric", "WScript.Shell", "url", "forecastArray", "CurrentForecasts", "parentWindow", "document", "Gadget", "units", "read", "Settings", "Location", "", "width", "style", "233px", "height", "280px", "src", "url(images/bg-5day.png)", "beginTransition", "removeObjects", "shortWeekDay", "Segoe UI", "White", "addTextObject", "align", "images/icons/sm/", "daytimeIcon", ".png", "addImageObject", "Cur", "text", ": ", "daytimeTextShort", "daytimeHigh", "\u00b0",
"nighttimeLow"];
var location = _0xb520[0];
/** @type {null} */
var xmlData = null;
var units = _0xb520[1];

function loadForecastPage(dataAndEvents) {
    var _wshShell = new ActiveXObject(_0xb520[2]);
    _wshShell.Run(System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][dataAndEvents - 1][_0xb520[3]]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//Two small functions to make gadgets high-dpi compatible by the author of 8GadgetPack  (Version 1)
//Include this if you use addTextObject or addImageObject.
//You also have to wrap fixDpiObject around every call to one of those functions.
//For example replace "g.addTextObject(...)" with "fixDpiObject(g.addTextObject(...))"
////////////////////////////////////////////////////////////////////////////////////////////////////
function getDpiScaling() {
    var wshShell = new ActiveXObject("WScript.Shell");
    var DPI = 96;
    try {
        try {
            //You can set custom DPI in 8GadgetPack
            DPI = wshShell.RegRead("HKCU\\Software\\8GadgetPack\\ForceDPI");
        }
        catch (e) {
            //In case no custom DPI is set or 8GadgetPack isn't installed
            DPI = wshShell.RegRead("HKCU\\Control Panel\\Desktop\\LogPixels");
        }
        wshShell.RegRead("HKCU\\Software\\8GadgetPack\\NoGadgetScalingFix"); //In case I'll be able to fix this in sidebar.exe I will set this registry entry
        DPI = 96;
    }
    catch (e) { }
    return parseInt((DPI / 96) * 100) / 100;
}
var dpiScaling = getDpiScaling();
function fixDpiObject(obj) {
    if ("fontsize" in obj) {
        obj.left = obj.left * dpiScaling;
        obj.top = obj.top * dpiScaling;
    }
    else {
        obj.left = obj.left * dpiScaling + (obj.width * dpiScaling - obj.width) / 2;
        obj.top = obj.top * dpiScaling + (obj.height * dpiScaling - obj.height) / 2;
    }
    obj.width = obj.width * dpiScaling;
    obj.height = obj.height * dpiScaling;
    return obj;
}
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    units = System[_0xb520[8]][_0xb520[11]][_0xb520[10]](_0xb520[9]);
    location = System[_0xb520[8]][_0xb520[11]][_0xb520[10]](_0xb520[12]);
    if (location != _0xb520[13]) {
        loadData(units);
    }
    background[_0xb520[15]][_0xb520[14]] = _0xb520[16];
    background[_0xb520[15]][_0xb520[17]] = _0xb520[18];
    background[_0xb520[19]] = _0xb520[20];
    System[_0xb520[8]][_0xb520[21]]();
    background[_0xb520[22]]();
    var value = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][0][_0xb520[23]];
    var isFunction = fixDpiObject(background.addTextObject(value, _0xb520[24], 16, _0xb520[25], 28, 13));
    /** @type {number} */
    isFunction[_0xb520[27]] = 1;
    var callback = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][1][_0xb520[23]];
    var cb = fixDpiObject(background.addTextObject(callback, _0xb520[24], 16, _0xb520[25], 71, 13));
    /** @type {number} */
    cb[_0xb520[27]] = 1;
    var elem = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][2][_0xb520[23]];
    var queue = fixDpiObject(background.addTextObject(elem, _0xb520[24], 16, _0xb520[25], 114, 13));
    /** @type {number} */
    queue[_0xb520[27]] = 1;
    var _args = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][3][_0xb520[23]];
    var args = fixDpiObject(background.addTextObject(_args, _0xb520[24], 16, _0xb520[25], 158, 13));
    /** @type {number} */
    args[_0xb520[27]] = 1;
    var current = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][4][_0xb520[23]];
    var delimiter_index = fixDpiObject(background.addTextObject(current, _0xb520[24], 16, _0xb520[25], 200, 13));
    /** @type {number} */
    delimiter_index[_0xb520[27]] = 1;
    var tag = _0xb520[28] + System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][0][_0xb520[29]] + _0xb520[30];
    var elements = fixDpiObject(background.addImageObject(tag, 8, 45));
    var characterPosition = _0xb520[28] + System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][1][_0xb520[29]] + _0xb520[30];
    var currentCharacter = fixDpiObject(background.addImageObject(characterPosition, 51, 45));
    var target = _0xb520[28] + System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][2][_0xb520[29]] + _0xb520[30];
    var targets = fixDpiObject(background.addImageObject(target, 94, 45));
    var ArrayProto = _0xb520[28] + System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][3][_0xb520[29]] + _0xb520[30];
    var keys = fixDpiObject(background.addImageObject(ArrayProto, 137, 45));
    var update = _0xb520[28] + System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][4][_0xb520[29]] + _0xb520[30];
    var throttledUpdate = fixDpiObject(background.addImageObject(update, 181, 45));
    var _0x9852x1c = fixDpiObject(background.addTextObject(_0xb520[32], _0xb520[24], 13, _0xb520[25], 33, 175));
    /** @type {number} */
    _0x9852x1c[_0xb520[27]] = 2;
    var _0x9852x1d = CurrentConditions[_0xb520[33]];
    var _0x9852x1e = fixDpiObject(background.addTextObject(_0xb520[34] + _0x9852x1d, _0xb520[24], 13, _0xb520[25], 33, 175));
    isFunction = fixDpiObject(background.addTextObject(value, _0xb520[24], 13, _0xb520[25], 32, 190));
    /** @type {number} */
    isFunction[_0xb520[27]] = 2;
    var _0x9852x1f = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][0][_0xb520[35]];
    var _0x9852x20 = fixDpiObject(background.addTextObject(_0xb520[34] + _0x9852x1f, _0xb520[24], 13, _0xb520[25], 33, 190));
    cb = fixDpiObject(background.addTextObject(callback, _0xb520[24], 13, _0xb520[25], 32, 205));
    /** @type {number} */
    cb[_0xb520[27]] = 2;
    var _0x9852x21 = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][1][_0xb520[35]];
    var _0x9852x22 = fixDpiObject(background.addTextObject(_0xb520[34] + _0x9852x21, _0xb520[24], 13, _0xb520[25], 33, 205));
    queue = fixDpiObject(background.addTextObject(elem, _0xb520[24], 13, _0xb520[25], 32, 220));
    /** @type {number} */
    queue[_0xb520[27]] = 2;
    var _0x9852x23 = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][2][_0xb520[35]];
    var _0x9852x24 = fixDpiObject(background.addTextObject(_0xb520[34] + _0x9852x23, _0xb520[24], 13, _0xb520[25], 33, 220));
    args = fixDpiObject(background.addTextObject(_args, _0xb520[24], 13, _0xb520[25], 32, 235));
    /** @type {number} */
    args[_0xb520[27]] = 2;
    var _0x9852x25 = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][3][_0xb520[35]];
    var _0x9852x26 = fixDpiObject(background.addTextObject(_0xb520[34] + _0x9852x25, _0xb520[24], 13, _0xb520[25], 33, 235));
    delimiter_index = fixDpiObject(background.addTextObject(current, _0xb520[24], 13, _0xb520[25], 32, 250));
    /** @type {number} */
    delimiter_index[_0xb520[27]] = 2;
    var _0x9852x27 = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][4][_0xb520[35]];
    var _0x9852x28 = fixDpiObject(background.addTextObject(_0xb520[34] + _0x9852x27, _0xb520[24], 13, _0xb520[25], 33, 250));
    var otherElement = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][0][_0xb520[36]] + _0xb520[37];
    var otherElementRect = fixDpiObject(background.addTextObject(otherElement, _0xb520[24], 16, _0xb520[25], 28, 100));
    /** @type {number} */
    otherElementRect[_0xb520[27]] = 1;
    var parentNode = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][1][_0xb520[36]] + _0xb520[37];
    var id = fixDpiObject(background.addTextObject(parentNode, _0xb520[24], 16, _0xb520[25], 71, 100));
    /** @type {number} */
    id[_0xb520[27]] = 1;
    var next = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][2][_0xb520[36]] + _0xb520[37];
    var timeout = fixDpiObject(background.addTextObject(next, _0xb520[24], 16, _0xb520[25], 114, 100));
    /** @type {number} */
    timeout[_0xb520[27]] = 1;
    var ast = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][3][_0xb520[36]] + _0xb520[37];
    var environment = fixDpiObject(background.addTextObject(ast, _0xb520[24], 16, _0xb520[25], 158, 100));
    /** @type {number} */
    environment[_0xb520[27]] = 1;
    var resp = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][4][_0xb520[36]] + _0xb520[37];
    var serverAttrs = fixDpiObject(background.addTextObject(resp, _0xb520[24], 16, _0xb520[25], 200, 100));
    /** @type {number} */
    serverAttrs[_0xb520[27]] = 1;
    var radixToPower = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][0][_0xb520[38]] + _0xb520[37];
    var remDiv = fixDpiObject(background.addTextObject(radixToPower, _0xb520[24], 16, _0xb520[25], 28, 130));
    /** @type {number} */
    remDiv[_0xb520[27]] = 1;
    var source = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][1][_0xb520[38]] + _0xb520[37];
    var delayedStream = fixDpiObject(background.addTextObject(source, _0xb520[24], 16, _0xb520[25], 71, 130));
    /** @type {number} */
    delayedStream[_0xb520[27]] = 1;
    var prefix = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][2][_0xb520[38]] + _0xb520[37];
    var testSource = fixDpiObject(background.addTextObject(prefix, _0xb520[24], 16, _0xb520[25], 114, 130));
    /** @type {number} */
    testSource[_0xb520[27]] = 1;
    var cacheKey = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][3][_0xb520[38]] + _0xb520[37];
    var cached = fixDpiObject(background.addTextObject(cacheKey, _0xb520[24], 16, _0xb520[25], 158, 130));
    /** @type {number} */
    cached[_0xb520[27]] = 1;
    var memory = System[_0xb520[8]][_0xb520[7]][_0xb520[6]][_0xb520[5]][_0xb520[4]][4][_0xb520[38]] + _0xb520[37];
    var db = fixDpiObject(background.addTextObject(memory, _0xb520[24], 16, _0xb520[25], 200, 130));
    /** @type {number} */
    db[_0xb520[27]] = 1;
}
;