var clockThemes	= new Array("black");
var newPositionMinutes	= 0;
var currentPositionMinutes	= 0;
var newPositionHours	= 0;
var currentPositionHours	= 0;
var clockPartsWidth;
var clockPartsHeight;
var clockPartsTop;
var clockPartsLeft;
var date;
var shownDay = -1;
var intervalTime;
var newTimeOut;
////////////////////////////////////////////////////////////////////////////////
//
// load initial settings
//
////////////////////////////////////////////////////////////////////////////////
function loadMain()
{
	settingsChanged();

	System.Gadget.settingsUI = "settings.html";
	System.Gadget.onSettingsClosed = settingsClosed;
	
	System.Gadget.visibilityChanged = visibilityChanged;
	
	h.addShadow("grey", 2, 40, 2, 2);
	m.addShadow("grey", 2, 40, 2, 2);
	s.addShadow("grey", 2, 40, 2, 2);
}
////////////////////////////////////////////////////////////////////////////////
//
// set theme images
//
////////////////////////////////////////////////////////////////////////////////
function setImages()
{
    var curTheme = clockThemes[mySetting.themeID];

    var wshShell = new ActiveXObject("WScript.Shell");
    var ieVersion = wshShell.RegRead("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\svcVersion");
    var isWin8 = (ieVersion.charAt(3) == '0');

    clockBg.src = "url(images/" + curTheme + ".png)";
    clockBg_.src = "images/" + curTheme + "_.png";
	clockBg_.style.visibility = isWin8 ? "hidden" : "visible"; 

	
	h.src = "images/" + curTheme + "_h.png";
	m.src = "images/" + curTheme + "_m.png";
	s.src = "images/" + curTheme + "_s.png";
	dot.src = "images/" + curTheme + "_dot.png";
}
////////////////////////////////////////////////////////////////////////////////
//
// calculate current time
//
////////////////////////////////////////////////////////////////////////////////
function timePerInterval()
{
	refreshDate();
	with (date)
	{
		hours = getHours();
		minutes = getMinutes();
		seconds = getSeconds();
	}

	updateDateInfo();
	
	var rotationHours = hours;

	if (hours > 12)
	{
		rotationHours = hours - 12;
	}
	
	h.Rotation = (rotationHours * 30) + (minutes / 2);
	m.Rotation = (minutes * 6) + (seconds / 10);
		
	if (mySetting.secondsEnabled)
	{
		s.Rotation = (seconds * 6);

		var secondOffset = secondTimeOffset();
			
		if (secondOffset > 0)
		{
			newTimeOut = setTimeout("timePerInterval()", secondOffset);
		}
		else
		{
			timePerInterval();
		}
	}
	else
	{
		var minuteOffset = minuteTimeOffset();
		
		if (minuteOffset > 0)
		{
			newTimeOut = setTimeout("timePerInterval()", minuteOffset);
		}
		else
		{
			timePerInterval();
		}
	}
}
////////////////////////////////////////////////////////////////////////////////
//
//
////////////////////////////////////////////////////////////////////////////////
function visibilityChanged()
{
	if (System.Gadget.visible)
	{
		if (!newTimeOut)
		{
			timePerInterval();
		}
	}
	else
	{
		clearTimeout(newTimeOut);
		newTimeOut = null;
	}
}
////////////////////////////////////////////////////////////////////////////////
//
// updates the tooltip with the current time
//
////////////////////////////////////////////////////////////////////////////////
function updateTooltip()
{
	refreshDate();
	highlights.title = clockTime.alt = date.toLocaleTimeString();
}
////////////////////////////////////////////////////////////////////////////////
//
// updates the date object with the current system time
//
////////////////////////////////////////////////////////////////////////////////
function refreshDate()
{
	if (mySetting.timeZoneIndex != -1 && getValidTimeZone(mySetting.timeZoneIndex) != -1)
	{
		date = new Date(System.Time.getLocalTime(zones.item(mySetting.timeZoneIndex)));
	}
	else
	{
		date = new Date(System.Time.getLocalTime(System.Time.currentTimeZone));
	}
}
////////////////////////////////////////////////////////////////////////////////
//
// updates the day of month and the weekday name when the day changes
//
////////////////////////////////////////////////////////////////////////////////
function updateDateInfo()
{
	if (date.getDate() == shownDay)
	{
		return;
	}
	shownDay = date.getDate();

	dayDigit1.src = "images/date_" + Math.floor(shownDay / 10) + ".png";
	dayDigit2.src = "images/date_" + (shownDay % 10) + ".png";
	dayName.src = "images/day_" + date.getDay() + ".png";
}
////////////////////////////////////////////////////////////////////////////////
//
// settings event closed
//
////////////////////////////////////////////////////////////////////////////////
function settingsClosed(event)
{
	if (event.closeAction == event.Action.commit)
	{
		settingsChanged();
	}
}
////////////////////////////////////////////////////////////////////////////////
// 
// set clock to the new settings
//
////////////////////////////////////////////////////////////////////////////////
function settingsChanged()
{
	mySetting.load();

	if (mySetting.timeZoneIndex != -1 && zonesCount == 0)
	{
		updateTimeZones();
	}

	var curTheme = clockThemes[getValidThemeID(mySetting.themeID)];
	
	switch (curTheme)
	{
		case "black":
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 57;
			break;
	}
	
	dot.style.width = h.style.width = m.style.width = s.style.width = clockPartsWidth;
	dot.style.height = h.style.height = m.style.height = s.style.height = clockPartsHeight;
	dot.style.top = h.style.top = m.style.top = s.style.top = clockPartsTop;
	dot.style.left = h.style.left = m.style.left = s.style.left = clockPartsLeft;
	
	setImages();

	clearTimeout(newTimeOut);

	if (mySetting.secondsEnabled)
	{
		s.style.visibility = "visible"; 
		dot.style.visibility = "hidden"; 
	}
	else
	{
		s.style.visibility = "hidden";
		dot.style.visibility = "visible";
	}

	dayDigit1.style.visibility = dayDigit2.style.visibility = mySetting.dateEnabled ? "visible" : "hidden";
	dayName.style.visibility = mySetting.weekdayEnabled ? "visible" : "hidden";
	
	timePerInterval();
}
////////////////////////////////////////////////////////////////////////////////
//
// calculates how many milliseconds remain until the start of the next second
//
////////////////////////////////////////////////////////////////////////////////
function secondTimeOffset()
{
	return 1000 - new Date().getMilliseconds();
}
////////////////////////////////////////////////////////////////////////////////
//
// calculates how many milliseconds remain until the start of the next minute
//
////////////////////////////////////////////////////////////////////////////////
function minuteTimeOffset()
{
	var d = new Date();
	return ((60 - d.getSeconds()) * 1000) - d.getMilliseconds();
}
