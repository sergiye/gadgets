var L_SELECT_TZ_TEXT = "Current computer time";

var L_PREVIOUS_TEXT = "Previous";
var L_NEXT_TEXT = "Next";

var imagePath = "images/";
var imageArray = new Array("black_settings.png");
var imageIndex = 0;

var INF_BIAS = 1000;	// BIAS max-val = 720, min-val = -780
var INF_DSTBIAS = 1000;	// DSTBIAS max = 60, min = -60
var BIAS_ABSENT = 1001;
var DSTBIAS_ABSENT = 1001;
var ZERO_BIAS = 1002;
var ZERO_DSTBIAS = 1002;

var mySetting = new clockSettings();

////////////////////////////////////////////////////////////////////////////////
//
// load clock settings
//
////////////////////////////////////////////////////////////////////////////////
function loadSettings()
{
	var pageDir = document.getElementsByTagName("html")[0].dir;
	
	if (pageDir == "rtl")
	{
		settingsButtonTable.dir = "rtl";
		
		var temp = settingsButtonLeftCell.innerHTML;
		settingsButtonLeftCell.innerHTML = settingsButtonRightCell.innerHTML;
		settingsButtonRightCell.innerHTML = temp;
		
		temp = settingsImageLeft.onmousedown;
		settingsImageLeft.onmousedown = settingsImageRight.onmousedown;
		settingsImageRight.onmousedown = temp;
		
		temp = settingsLeftAnchor.onkeypress;
		settingsLeftAnchor.onkeypress = settingsRightAnchor.onkeypress;
		settingsRightAnchor.onkeypress = temp;

		settingsImageLeft.alt = L_NEXT_TEXT;
		settingsImageRight.alt = L_PREVIOUS_TEXT;
		settingsLeftAnchor.title = L_NEXT_TEXT;
		settingsRightAnchor.title = L_PREVIOUS_TEXT;
	}
	else
	{
		settingsImageLeft.alt = L_PREVIOUS_TEXT;
		settingsImageRight.alt = L_NEXT_TEXT;
		settingsLeftAnchor.title = L_PREVIOUS_TEXT;
		settingsRightAnchor.title = L_NEXT_TEXT;
	}
	
	mySetting.load();
	loadTimeZones();

	imageIndex = mySetting.themeID;
	
	settingsUpdateIndex();
	
	with (timeZoneIndex)
	{
		value = getValidTimeZone(mySetting.timeZoneIndex);
		title = options[selectedIndex].text;
	}
	
	secondsEnabled.checked = mySetting.secondsEnabled;
	dateEnabled.checked = mySetting.dateEnabled;
	weekdayEnabled.checked = mySetting.weekdayEnabled;

	System.Gadget.onSettingsClosing = settingsClosing;
}
////////////////////////////////////////////////////////////////////////////////
//
//
////////////////////////////////////////////////////////////////////////////////
function settingsUpdateImage(img, state)
{
	img.src = imagePath + "settings_" + img.src.split("_")[1] + "_" + state + ".png";
}
////////////////////////////////////////////////////////////////////////////////
//
//
////////////////////////////////////////////////////////////////////////////////
function settingsButtonBack()
{
	if (event.keyCode == 32 || event.button == 1)
	{
		imageIndex--;
		
		if (imageIndex < 0)
		{
			imageIndex = imageArray.length - 1;
		}
		
		settingsUpdateIndex();
	}
}
////////////////////////////////////////////////////////////////////////////////
//
//
////////////////////////////////////////////////////////////////////////////////
function settingsButtonForward()
{
	if (event.keyCode == 32 || event.button == 1)
	{
		imageIndex++;
		
		if (imageIndex == imageArray.length)
		{
			imageIndex = 0;
		}
		
		settingsUpdateIndex();
	}
}
////////////////////////////////////////////////////////////////////////////////
//
//
////////////////////////////////////////////////////////////////////////////////
function settingsUpdateIndex()
{
	mySetting.themeID = imageIndex;
	
	settingsImagePreview.src = imagePath + imageArray[imageIndex];
	currentIndex.innerHTML = imageIndex + 1;
	maxIndex.innerHTML = imageArray.length;
}
////////////////////////////////////////////////////////////////////////////////
//
// settings event closing
//
////////////////////////////////////////////////////////////////////////////////
function settingsClosing(event)
{
	if (event.closeAction == event.Action.commit)
	{
		saveSettings();
	}
}
////////////////////////////////////////////////////////////////////////////////
//
// create clock object
//
////////////////////////////////////////////////////////////////////////////////
function clockSettings()
{ 
	this.save = saveSettingToDisk;
	this.load = loadSettingFromDisk;
	
	this.themeID = 0;
	this.timeZoneIndex = -1;
	this.timeZoneBias = INF_BIAS;
	this.timeZoneDSTBias = INF_DSTBIAS;
	this.timeZoneName = "";
	this.secondsEnabled = false;
	this.dateEnabled = true;
	this.weekdayEnabled = true;
}
////////////////////////////////////////////////////////////////////////////////
//
// load the information from disk
//
////////////////////////////////////////////////////////////////////////////////
function loadSettingFromDisk()
{
	if (System.Gadget.Settings.read("SettingsExist"))
	{
		this.themeID = getValidThemeID(System.Gadget.Settings.read("themeID"));
		this.secondsEnabled = System.Gadget.Settings.read("secondsEnabled");
		this.dateEnabled = readBoolSetting("dateEnabled", true);
		this.weekdayEnabled = readBoolSetting("weekdayEnabled", true);

		this.timeZoneIndex = parseInt(System.Gadget.Settings.read("timeZoneIndex"));

		this.timeZoneBias = parseInt(System.Gadget.Settings.read("timeZoneBias") || BIAS_ABSENT);
		this.timeZoneDSTBias = parseInt(System.Gadget.Settings.read("timeZoneDSTBias") || DSTBIAS_ABSENT);
		this.timeZoneName = unescape(System.Gadget.Settings.readString("timeZoneName") || "");

		if( this.timeZoneBias == ZERO_BIAS )
		{
			this.timeZoneBias = 0;
		}

		if( this.timeZoneDSTBias == ZERO_DSTBIAS )
		{
			this.timeZoneDSTBias = 0;
		}

		if ( this.timeZoneBias == INF_BIAS || this.timeZoneDSTBias == INF_DSTBIAS || this.timeZoneBias == BIAS_ABSENT || this.timeZoneDSTBias == DSTBIAS_ABSENT ) // Either setting not present (var_ABSENT) OR set to current timezone (INF_var)
		{
			this.timeZoneIndex = -1;
			this.timeZoneBias = INF_BIAS;
			this.timeZoneDSTBias = INF_DSTBIAS;
		}
		else	//both BIAS and DSTBIAS have a valid value
		{
			AdjustTimeZoneIndex( this );
		}

	}
}


////////////////////////////////////////////////////////////////////////////////
//
// Adjust timezone index based on values of Bias, DSTBias and Zonename
//
////////////////////////////////////////////////////////////////////////////////
function AdjustTimeZoneIndex( settingsObject )
{
	var indexL1Match, indexL2Match, currentTimeZone;
	var storedTimeZoneName, OMTimezoneName;

	indexL1Match = indexL2Match = -1;
	zones = System.Time.timeZones;
	zonesCount = zones.count;

	for (var i = 0; i < zonesCount; i++)
	{
		currentTimeZone = zones.item(i);
		if ( currentTimeZone.bias == settingsObject.timeZoneBias && currentTimeZone.DSTBias == settingsObject.timeZoneDSTBias )
		{
			indexL1Match = i;

			storedTimeZoneName = settingsObject.timeZoneName.replace( "GMT", "UTC" );
			OMTimezoneName = currentTimeZone.displayName.replace( "GMT", "UTC" );

			if ( storedTimeZoneName == OMTimezoneName )
			{
				indexL2Match = i;
				break;
			}
		}
	}

	if ( indexL2Match !== -1 )	// All values match
	{
		settingsObject.timeZoneIndex = indexL2Match;
	}
	else if ( indexL1Match !== -1 )	// BIAS and DSTBIAS match, no match for name; use last pair from the list
	{
		settingsObject.timeZoneIndex = indexL1Match;
	}
	else // Clear settings, since saved (Bias,DSTbias) pair doesnt exist in timezones collection
	{
		settingsObject.timeZoneIndex = -1;
		settingsObject.timeZoneBias = INF_BIAS;
		settingsObject.timeZoneDSTBias = INF_DSTBIAS;
		settingsObject.timeZoneName = "";
	}

	if ( settingsObject.timeZoneIndex !== -1 )	// update timezone name
	{
		settingsObject.timeZoneName = zones.item(settingsObject.timeZoneIndex).displayName;
	}
}


////////////////////////////////////////////////////////////////////////////////
//
// save information to disk
//
////////////////////////////////////////////////////////////////////////////////
function saveSettingToDisk()
{
	System.Gadget.Settings.write("SettingsExist", true);
	System.Gadget.Settings.write("themeID", this.themeID);
	System.Gadget.Settings.write("timeZoneIndex", this.timeZoneIndex);

	if( this.timeZoneBias == 0 )
	{
		System.Gadget.Settings.write("timeZoneBias", ZERO_BIAS);
	}
	else
	{
		System.Gadget.Settings.write("timeZoneBias", this.timeZoneBias);
	}

	if( this.timeZoneDSTBias == 0 )
	{
		System.Gadget.Settings.write("timeZoneDSTBias", ZERO_DSTBIAS);
	}
	else
	{
		System.Gadget.Settings.write("timeZoneDSTBias", this.timeZoneDSTBias);
	}

	System.Gadget.Settings.writeString("timeZoneName", escape(this.timeZoneName));
	System.Gadget.Settings.write("secondsEnabled", this.secondsEnabled);
	System.Gadget.Settings.write("dateEnabled", this.dateEnabled);
	System.Gadget.Settings.write("weekdayEnabled", this.weekdayEnabled);
}
////////////////////////////////////////////////////////////////////////////////
//
// read a boolean setting, falling back to the default when it was never saved
//
////////////////////////////////////////////////////////////////////////////////
function readBoolSetting(name, defaultValue)
{
	var value = System.Gadget.Settings.read(name);
	return (typeof(value) == "boolean") ? value : defaultValue;
}
////////////////////////////////////////////////////////////////////////////////
//
// save clock settings
//
////////////////////////////////////////////////////////////////////////////////
function saveSettings()
{
	mySetting.timeZoneIndex = getValidTimeZone(timeZoneIndex.value);

	if( mySetting.timeZoneIndex !== -1 )
	{
		zones = System.Time.timeZones;
		mySetting.timeZoneBias = zones.item(mySetting.timeZoneIndex).bias;
		mySetting.timeZoneDSTBias = zones.item(mySetting.timeZoneIndex).DSTBias;
		mySetting.timeZoneName = zones.item(mySetting.timeZoneIndex).displayName;
	}
	else
	{
		mySetting.timeZoneBias = INF_BIAS;
		mySetting.timeZoneDSTBias = INF_DSTBIAS;
		mySetting.timeZoneName = "";
	}

	mySetting.secondsEnabled = secondsEnabled.checked;
	mySetting.dateEnabled = dateEnabled.checked;
	mySetting.weekdayEnabled = weekdayEnabled.checked;

	mySetting.save();
}
///////////////////////////////////////////////////////////////////////////////
//
// load time zones
//
////////////////////////////////////////////////////////////////////////////////
function loadTimeZones()
{
	updateTimeZones(true); 

	timeZoneIndex.options[0] = new Option(L_SELECT_TZ_TEXT, "-1");

	for (var i = 0; i < e.length; i++)
	{
		timeZoneIndex.options[i + 1] = new Option(e[i][eZone], e[i][eItem], null, (e[i][eItem] == mySetting.timeZoneIndex));
		timeZoneIndex.options[i + 1].title = e[i][eZone];
	}
}
////////////////////////////////////////////////////////////////////////////////
//
// check to see if theme index within array
//
////////////////////////////////////////////////////////////////////////////////
function getValidThemeID(index)
{
	if (parseInt(index) > -1 && parseInt(index) < clockThemes.length)
	{
		return parseInt(index);
	}
	else
	{
		return 0;
	}
}
