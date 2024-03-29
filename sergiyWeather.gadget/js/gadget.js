var location = "lid_323903";
var xmlData = null;
var units = "metric";

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

function init() {
    System.Gadget.settingsUI = "Settings.html";
    System.Gadget.onSettingsClosed = settingsClosed;
    System.Gadget.Flyout.file = "Flyout.html";
    if (System.Gadget.Settings.read("Location") != "") {
        location = System.Gadget.Settings.read("Location");
    } else {
        System.Gadget.Settings.write("Location", location);
    }
    if (System.Gadget.Settings.read("units") != "") {
        units = System.Gadget.Settings.read("units");
    } else {
        System.Gadget.Settings.write("units", units);
    }
    background.style.width = "130px";
    background.style.height = "67px";
    background.src = "url(images/bg-docked.png)";
    if (location != "") {
        retrieveWeather();
    }
}

function retrieveWeather() {
    loadData(units);
    System["Gadget"]["beginTransition"]();
    background["removeObjects"]();
    if (DataComplete) {
        var cacheKey = CurrentForecasts.forecastArray[0].daytimeHigh + "\u00b0 / " + CurrentForecasts.forecastArray[0].nighttimeLow + "\u00b0";
        var cached = fixDpiObject(background.addTextObject(cacheKey, "Segoe UI", 13, "White", 125, 30));
        cached.align = 2;
        var ArrayProto = CurrentConditions.temperature + "\u00b0";
        var keys = fixDpiObject(background.addTextObject(ArrayProto, "Segoe UI", 24, "White", 125, 3));
        keys.align = 2;
        var conditionImage = fixDpiObject(background.addImageObject("images/icons/lg/" + CurrentConditions.icon + ".png", 8, 9));
        if (CurrentLocation.city.length > 10) {
            var otherElement = CurrentLocation.city.substr(0, 8) + "..."
        } else {
            otherElement = CurrentLocation.city;
        }
        var otherElementRect = fixDpiObject(background.addTextObject(otherElement, "Segoe UI", 13, "White", 125, 43));
        otherElementRect.align = 2;
    } else {
        cached = fixDpiObject(background.addTextObject("NA\u00b0 / NA\u00b0", "Segoe UI", 13, "White", 125, 30));
        cached.align = 2;
        keys = fixDpiObject(background.addTextObject("NA\u00b0", "Segoe UI", 24, "White", 125, 3));
        keys.align = 2;
        otherElementRect = fixDpiObject(background.addTextObject("No data ...", "Segoe UI", 12, "White", 125, 43));
        otherElementRect.align = 2;
        conditionImage = fixDpiObject(background.addImageObject("images/icons/lg/01.png", 8, 9));
    }
    self.setTimeout("retrieveWeather()", 1E3 * 60 * 10);
}

function loadCityPage() {
    if (DataComplete) {
        var _wshShell = new ActiveXObject("WScript.Shell");
        _wshShell.Run(CurrentConditions["url"]);
    }
}

function settingsClosed() {
    units = System.Gadget.Settings.read("units");
    location = System.Gadget.Settings.read("Location");
    retrieveWeather();
}
;