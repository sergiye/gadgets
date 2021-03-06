/** @type {Array} */
var _0xec43 = ["lid_323903", "metric", "settingsUI", "Gadget", "Settings.html", "onSettingsClosed", "file", "Flyout", "Flyout.html", "Location", "read", "Settings", "", "write", "units", "width", "style", "130px", "height", "67px", "src", "url(images/bg-docked.png)", "beginTransition", "removeObjects", "daytimeHigh", "forecastArray", "\u00b0 / ", "nighttimeLow", "\u00b0", "Segoe UI", "White", "addTextObject", "align", "temperature", "images/icons/lg/", "icon", ".png", "addImageObject",
"length", "city", "substr", "...", "NA\u00b0 / NA\u00b0", "NA\u00b0", "No data ...", "images/icons/lg/01.png", "retrieveWeather()", "setTimeout", "WScript.Shell", "url"];
var location = _0xec43[0];
/** @type {null} */
var xmlData = null;
var units = _0xec43[1];

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

/**
* @return {undefined}
*/
function init() {
    System[_0xec43[3]][_0xec43[2]] = _0xec43[4];
    /** @type {function (): undefined} */
    System[_0xec43[3]][_0xec43[5]] = settingsClosed;
    System[_0xec43[3]][_0xec43[7]][_0xec43[6]] = _0xec43[8];
    if (System[_0xec43[3]][_0xec43[11]][_0xec43[10]](_0xec43[9]) != _0xec43[12]) {
        location = System[_0xec43[3]][_0xec43[11]][_0xec43[10]](_0xec43[9]);
    } else {
        System[_0xec43[3]][_0xec43[11]][_0xec43[13]](_0xec43[9], location);
    }
    if (System[_0xec43[3]][_0xec43[11]][_0xec43[10]](_0xec43[14]) != _0xec43[12]) {
        units = System[_0xec43[3]][_0xec43[11]][_0xec43[10]](_0xec43[14]);
    } else {
        System[_0xec43[3]][_0xec43[11]][_0xec43[13]](_0xec43[14], units);
    }
    background[_0xec43[16]][_0xec43[15]] = _0xec43[17];
    background[_0xec43[16]][_0xec43[18]] = _0xec43[19];
    background[_0xec43[20]] = _0xec43[21];
    if (location != _0xec43[12]) {
        retrieveWeather();
    }
}
/**
* @return {undefined}
*/
function retrieveWeather() {
    loadData(units);
    System[_0xec43[3]][_0xec43[22]]();
    background[_0xec43[23]]();
    if (DataComplete) {
        var cacheKey = CurrentForecasts[_0xec43[25]][0][_0xec43[24]] + _0xec43[26] + CurrentForecasts[_0xec43[25]][0][_0xec43[27]] + _0xec43[28];
        var cached = fixDpiObject(background[_0xec43[31]](cacheKey, _0xec43[29], 13, _0xec43[30], 125, 30));
        /** @type {number} */
        cached[_0xec43[32]] = 2;
        var ArrayProto = CurrentConditions[_0xec43[33]] + _0xec43[28];
        var keys = fixDpiObject(background[_0xec43[31]](ArrayProto, _0xec43[29], 24, _0xec43[30], 125, 3));
        /** @type {number} */
        keys[_0xec43[32]] = 2;
        var _0x5731xa = fixDpiObject(background[_0xec43[37]](_0xec43[34] + CurrentConditions[_0xec43[35]] + _0xec43[36], 8, 9));
        if (CurrentLocation[_0xec43[39]][_0xec43[38]] > 10) {
            var otherElement = CurrentLocation[_0xec43[39]][_0xec43[40]](0, 8) + _0xec43[41]
        } else {
            otherElement = CurrentLocation[_0xec43[39]];
        }
        var otherElementRect = fixDpiObject(background[_0xec43[31]](otherElement, _0xec43[29], 13, _0xec43[30], 125, 43));
        /** @type {number} */
        otherElementRect[_0xec43[32]] = 2;
    } else {
        cached = fixDpiObject(background[_0xec43[31]](_0xec43[42], _0xec43[29], 13, _0xec43[30], 125, 30));
        /** @type {number} */
        cached[_0xec43[32]] = 2;
        keys = fixDpiObject(background[_0xec43[31]](_0xec43[43], _0xec43[29], 24, _0xec43[30], 125, 3));
        /** @type {number} */
        keys[_0xec43[32]] = 2;
        otherElementRect = fixDpiObject(background[_0xec43[31]](_0xec43[44], _0xec43[29], 12, _0xec43[30], 125, 43));
        /** @type {number} */
        otherElementRect[_0xec43[32]] = 2;
        _0x5731xa = fixDpiObject(background[_0xec43[37]](_0xec43[45], 8, 9));
    }
    self[_0xec43[47]](_0xec43[46], 1E3 * 60 * 30);
}
/**
* @return {undefined}
*/
function loadCityPage() {
    if (DataComplete) {
        var _wshShell = new ActiveXObject(_0xec43[48]);
        _wshShell.Run(CurrentConditions[_0xec43[49]]);
    }
}
/**
* @return {undefined}
*/
function settingsClosed() {
    units = System[_0xec43[3]][_0xec43[11]][_0xec43[10]](_0xec43[14]);
    location = System[_0xec43[3]][_0xec43[11]][_0xec43[10]](_0xec43[9]);
    retrieveWeather();
}
;