var WeatherUnits;
var CurrentLocation;
var CurrentConditions;
var CurrentImages;
var CurrentForecasts;
var CurrentWatches;
var CurrentLinks;
var ErrorString = '';
var DataComplete = false;

function Images(_0x4a94xb) {
    this['radar'] = _0x4a94xb['getElementsByTagName']('radar')['item'](0)['firstChild']['data'];
};

function Units(_0x4a94xb) {
    this['tempUnit'] = _0x4a94xb['getAttribute']('temp');
    this['speedUnit'] = _0x4a94xb['getAttribute']('speed');
    this['distUnit'] = _0x4a94xb['getAttribute']('dist');
    this['presUnit'] = _0x4a94xb['getAttribute']('pres');
    this['precUnit'] = _0x4a94xb['getAttribute']('prec');
};

function Watches(_0x4a94xb) {
    this['zone'] = _0x4a94xb['getAttribute']('zone');
    this['county'] = _0x4a94xb['getAttribute']('county');
    this['isactive'] = _0x4a94xb['getAttribute']('isactive');
    if (_0x4a94xb['getElementsByTagName']('url')['item'](0)['firstChild'] != null) {
        this['url'] = _0x4a94xb['getElementsByTagName']('url')['item'](0)['firstChild']['data'];
    } else {
        this['url'] = '';
    };
};

function Location(_0x4a94xb) {
    this['city'] = _0x4a94xb['getAttribute']('city');
    this['state'] = _0x4a94xb['getAttribute']('state');
};

function Conditions(_0x4a94xb) {
    this['url'] = _0x4a94xb['getElementsByTagName']('url')['item'](0)['firstChild']['data'];
    tempNode = _0x4a94xb['getElementsByTagName']('wxc')['item'](0);
    this['temperature'] = tempNode['getAttribute']('temp');
    this['realFeel'] = tempNode['getAttribute']('rft');
    this['humidity'] = tempNode['getAttribute']('hum');
    this['text'] = tempNode['getAttribute']('text');
    this['icon'] = tempNode['getAttribute']('icon');
    this['windGust'] = tempNode['getAttribute']('wgus');
    this['windSpeed'] = tempNode['getAttribute']('wspd');
    this['windDir'] = tempNode['getAttribute']('wdir');
    this['visibility'] = tempNode['getAttribute']('vis');
    this['precip'] = tempNode['getAttribute']('prec');
    this['uvindex'] = tempNode['getAttribute']('uvi');
    this['uvtext'] = tempNode['getAttribute']('uvt');
    this['radarUrl'] = _0x4a94xb['getElementsByTagName']('radurl')['item'](0)['firstChild']['data'];
    this['hourlyURL'] = _0x4a94xb['getElementsByTagName']('hourlyurl')['item'](0)['firstChild']['data'];
};

function Links(_0x4a94xb) {
    this['promo1Link'] = _0x4a94xb['getElementsByTagName']('promo1')['item'](0)['getAttribute']('url');
    this['promo1Name'] = _0x4a94xb['getElementsByTagName']('promo1')['item'](0)['getAttribute']('name');
    this['homeLink'] = 'http://wwwa.accuweather.com';
};

function Forecasts(_0x4a94xb) {
    tempNodes = _0x4a94xb['getElementsByTagName']('day');
    tempArray = new Array(tempNodes['length']);
    for (count = 0; count < tempNodes['length']; count++) {
        tempArray[count] = new ForecastDay(tempNodes[count]);
    };
    this['forecastArray'] = tempArray;
};

function ForecastDay(_0x4a94xb) {
    this['dayNumber'] = _0x4a94xb['getAttribute']('number');
    this['date'] = _0x4a94xb['getAttribute']('date');
    this['weekDay'] = _0x4a94xb['getAttribute']('wday');
    switch (this['weekDay']) {
        case 'Monday':
            this['shortWeekDay'] = 'Mo';
            break;;
        case 'Tuesday':
            this['shortWeekDay'] = 'Tu';
            break;;
        case 'Wednesday':
            this['shortWeekDay'] = 'We';
            break;;
        case 'Thursday':
            this['shortWeekDay'] = 'Th';
            break;;
        case 'Friday':
            this['shortWeekDay'] = 'Fr';
            break;;
        case 'Saturday':
            this['shortWeekDay'] = 'Sa';
            break;;
        case 'Sunday':
            this['shortWeekDay'] = 'Su';
            break;;
    };
    this['url'] = _0x4a94xb['getElementsByTagName']('url')['item'](0)['firstChild']['data'];
    this['daytimeTextShort'] = _0x4a94xb['getElementsByTagName']('./daytime/txtshort')['item'](0)['firstChild']['data'];
    this['daytimeTextLong'] = _0x4a94xb['getElementsByTagName']('./daytime/txtlong')['item'](0)['firstChild']['data'];
    this['daytimeIcon'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('icon');
    this['daytimeHigh'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('htmp');
    this['daytimeRealFeelHigh'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('rfh');
    this['daytimeWindSpeed'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('wspd');
    this['daytimeWindDirection'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('wdir');
    this['daytimeWindGust'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('wgus');
    this['daytimeMaxUV'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('mxuv');
    this['daytimeRain'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('rain');
    this['daytimeSnow'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('snow');
    this['daytimePrecip'] = _0x4a94xb['getElementsByTagName']('./daytime/wxf')['item'](0)['getAttribute']('prec');
    this['nighttimeTextShort'] = _0x4a94xb['getElementsByTagName']('./nighttime/txtshort')['item'](0)['firstChild']['data'];
    this['nighttimeTextLong'] = _0x4a94xb['getElementsByTagName']('./nighttime/txtlong')['item'](0)['firstChild']['data'];
    this['nighttimeIcon'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('icon');
    this['nighttimeLow'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('ltmp');
    this['nighttimeRealFeelLow'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('rfl');
    this['nighttimeWindSpeed'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('wspd');
    this['nighttimeWindDirection'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('wdir');
    this['nighttimeWindGust'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('wgus');
    this['nighttimeRain'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('rain');
    this['nighttimeSnow'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('snow');
    this['nighttimePrecip'] = _0x4a94xb['getElementsByTagName']('./nighttime/wxf')['item'](0)['getAttribute']('prec');
};

function loadData(_0x4a94x14) {
    metric = 1;
    if (_0x4a94x14 == 'english') {
        metric = 0;
    };
    try {
        req = new ActiveXObject('Microsoft.XMLHTTP');
        if (req) {
            req['open']('GET', 'http://vwidget.accuweather.com/widget/vista4/weather_data_v2.asp?location=' + location + '&metric=' + metric, false);
            req['send']();
            if (req['status'] == 200) {
                parseData(req['responseXML']['documentElement']);
            } else {};
        };
    } catch (e) {};
};

function parseData(_0x4a94x16) {
    try {
        CurrentLocation = new Location(_0x4a94x16['getElementsByTagName']('./local')['item'](0));
        WeatherUnits = new Units(_0x4a94x16['getElementsByTagName']('./units')['item'](0));
        CurrentConditions = new Conditions(_0x4a94x16['getElementsByTagName']('./currentconditions')['item'](0));
        CurrentImages = new Images(_0x4a94x16['getElementsByTagName']('./images')['item'](0));
        CurrentForecasts = new Forecasts(_0x4a94x16['getElementsByTagName']('./forecast')['item'](0));
        CurrentWatches = new Watches(_0x4a94x16['getElementsByTagName']('./watchwarnareas')['item'](0));
        CurrentLinks = new Links(_0x4a94x16['getElementsByTagName']('./links')['item'](0));
        DataComplete = true;
    } catch (e) {};
};