var WeatherUnits;
var CurrentLocation;
var CurrentConditions;
var CurrentImages;
var CurrentForecasts;
var CurrentWatches;
var CurrentLinks;
var ErrorString = '';
var DataComplete = false;

function Images(value) {
    this.radar = value.getElementsByTagName('radar').item(0).firstChild.data;
};

function Units(value) {
    this.tempUnit = value.getAttribute('temp');
    this.speedUnit = value.getAttribute('speed');
    this.distUnit = value.getAttribute('dist');
    this.presUnit = value.getAttribute('pres');
    this.precUnit = value.getAttribute('prec');
};

function Watches(value) {
    this.zone = value.getAttribute('zone');
    this.county = value.getAttribute('county');
    this.isactive = value.getAttribute('isactive');
    if (value.getElementsByTagName('url').item(0).firstChild != null) {
        this.url = value.getElementsByTagName('url').item(0).firstChild.data;
    } else {
        this.url = '';
    };
};

function Location(value) {
    this.city = value.getAttribute('city');
    this.state = value.getAttribute('state');
};

function Conditions(value) {
    this.url = value.getElementsByTagName('url').item(0).firstChild.data;
    tempNode = value.getElementsByTagName('wxc').item(0);
    this.temperature = tempNode.getAttribute('temp');
    this.realFeel = tempNode.getAttribute('rft');
    this.humidity = tempNode.getAttribute('hum');
    this.text = tempNode.getAttribute('text');
    this.icon = tempNode.getAttribute('icon');
    this.windGust = tempNode.getAttribute('wgus');
    this.windSpeed = tempNode.getAttribute('wspd');
    this.windDir = tempNode.getAttribute('wdir');
    this.visibility = tempNode.getAttribute('vis');
    this.precip = tempNode.getAttribute('prec');
    this.uvindex = tempNode.getAttribute('uvi');
    this.uvtext = tempNode.getAttribute('uvt');
    this.radarUrl = value.getElementsByTagName('radurl').item(0).firstChild.data;
    this.hourlyURL = value.getElementsByTagName('hourlyurl').item(0).firstChild.data;
};

function Links(value) {
    this.promo1Link = value.getElementsByTagName('promo1').item(0).getAttribute('url');
    this.promo1Name = value.getElementsByTagName('promo1').item(0).getAttribute('name');
    this.homeLink = 'http://wwwa.accuweather.com';
};

function Forecasts(value) {
    tempNodes = value.getElementsByTagName('day');
    tempArray = new Array(tempNodes.length);
    for (count = 0; count < tempNodes.length; count++) {
        tempArray[count] = new ForecastDay(tempNodes[count]);
    };
    this.forecastArray = tempArray;
};

function ForecastDay(value) {
    this.dayNumber = value.getAttribute('number');
    this.date = value.getAttribute('date');
    this.weekDay = value.getAttribute('wday');
    switch (this.weekDay) {
        case 'Monday':
            this.shortWeekDay = 'Mo';
            break;;
        case 'Tuesday':
            this.shortWeekDay = 'Tu';
            break;;
        case 'Wednesday':
            this.shortWeekDay = 'We';
            break;;
        case 'Thursday':
            this.shortWeekDay = 'Th';
            break;;
        case 'Friday':
            this.shortWeekDay = 'Fr';
            break;;
        case 'Saturday':
            this.shortWeekDay = 'Sa';
            break;;
        case 'Sunday':
            this.shortWeekDay = 'Su';
            break;;
    };
    this.url = value.getElementsByTagName('url').item(0).firstChild.data;
    this.daytimeTextShort = value.getElementsByTagName('./daytime/txtshort').item(0).firstChild.data;
    this.daytimeTextLong = value.getElementsByTagName('./daytime/txtlong').item(0).firstChild.data;
    this.daytimeIcon = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('icon');
    this.daytimeHigh = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('htmp');
    this.daytimeRealFeelHigh = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('rfh');
    this.daytimeWindSpeed = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('wspd');
    this.daytimeWindDirection = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('wdir');
    this.daytimeWindGust = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('wgus');
    this.daytimeMaxUV = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('mxuv');
    this.daytimeRain = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('rain');
    this.daytimeSnow = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('snow');
    this.daytimePrecip = value.getElementsByTagName('./daytime/wxf').item(0).getAttribute('prec');
    this.nighttimeTextShort = value.getElementsByTagName('./nighttime/txtshort').item(0).firstChild.data;
    this.nighttimeTextLong = value.getElementsByTagName('./nighttime/txtlong').item(0).firstChild.data;
    this.nighttimeIcon = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('icon');
    this.nighttimeLow = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('ltmp');
    this.nighttimeRealFeelLow = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('rfl');
    this.nighttimeWindSpeed = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('wspd');
    this.nighttimeWindDirection = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('wdir');
    this.nighttimeWindGust = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('wgus');
    this.nighttimeRain = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('rain');
    this.nighttimeSnow = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('snow');
    this.nighttimePrecip = value.getElementsByTagName('./nighttime/wxf').item(0).getAttribute('prec');
};

function loadData(value) {
    metric = 1;
    if (value == 'english') {
        metric = 0;
    };
    try {
        req = new ActiveXObject('Microsoft.XMLHTTP');
        if (req) {
            req.open('GET', 'http://vwidget.accuweather.com/widget/vista4/weather_data_v2.asp?location=' + location + '&metric=' + metric, false);
            req.send();
            if (req.status == 200) {
                parseData(req.responseXML.documentElement);
            } else {};
        };
    } catch (e) {};
};

function parseData(value) {
    try {
        CurrentLocation = new Location(value.getElementsByTagName('./local').item(0));
        WeatherUnits = new Units(value.getElementsByTagName('./units').item(0));
        CurrentConditions = new Conditions(value.getElementsByTagName('./currentconditions').item(0));
        CurrentImages = new Images(value.getElementsByTagName('./images').item(0));
        CurrentForecasts = new Forecasts(value.getElementsByTagName('./forecast').item(0));
        CurrentWatches = new Watches(value.getElementsByTagName('./watchwarnareas').item(0));
        CurrentLinks = new Links(value.getElementsByTagName('./links').item(0));
        DataComplete = true;
    } catch (e) {};
};