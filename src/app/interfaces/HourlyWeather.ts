export interface HourlyWeather {

    "DateTime": string,
    "EpochDateTime": number,
    "WeatherIcon": number,
    "IconPhrase": string,
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "RealFeelTemperature": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "WetBulbTemperature": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "DewPoint": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "Wind": {
      "Speed": {
        "Value": number,
        "Unit": string,
        "UnitType": number
      },
      "Direction": {
        "Degrees": number,
        "Localized": string,
        "English": string
      }
    },
    "WindGust": {
      "Speed": {
        "Value": number,
        "Unit": string,
        "UnitType": number
      }
    },
    "RelativeHumidity": number,
    "Visibility": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "Ceiling": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "UVIndex": number,
    "UVIndexText": string,
    "PrecipitationProbability": number,
    "RainProbability": number,
    "SnowProbability": number,
    "IceProbability": number,
    "TotalLiquid": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "Rain": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "Snow": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "Ice": {
      "Value": number,
      "Unit": string,
      "UnitType": number
    },
    "CloudCover": number,
    "MobileLink": string,
    "Link": string
  }