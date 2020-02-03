export interface DailyForecasts {

    "Date": string,
    "EpochDate": number,
    "Sun": {
        "Rise": string,
        "EpochRise": number,
        "Set": string,
        "EpochSet": number
    },
    "Moon": {
        "Rise": string,
        "EpochRise": number,
        "Set": string,
        "EpochSet": number,
        "Phase": string,
        "Age": number
    },
    "Temperature": {
        "Minimum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        },
        "Maximum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        }
    },
    "RealFeelTemperature": {
        "Minimum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        },
        "Maximum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        }
    },
    "RealFeelTemperatureShade": {
        "Minimum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        },
        "Maximum": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        }
    },
    "HoursOfSun": number,
    "DegreeDaySummary": {
        "Heating": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        },
        "Cooling": {
            "Value": number,
            "Unit": string,
            "UnitType": number
        }
    },
    "AirAndPollen": [
        {
            "Name": string,
            "Value": number,
            "Category": string,
            "CategoryValue": number,
            "Type": string
        },
        {
            "Name": string,
            "Value": number,
            "Category": string,
            "CategoryValue": number
        },
        {
            "Name": string,
            "Value": number,
            "Category": string,
            "CategoryValue": number
        },
        {
            "Name": string,
            "Value": number,
            "Category": string,
            "CategoryValue": number
        },
        {
            "Name": string,
            "Value": number,
            "Category": string,
            "CategoryValue": number
        },
        {
            "Name": string,
            "Value": number,
            "Category": string,
            "CategoryValue": number
        }
    ], "Day": {
        "Icon": number,
        "IconPhrase": string,
        "HasPrecipitation": boolean,
        "ShortPhrase": string,
        "LongPhrase": string,
        "PrecipitationProbability": number,
        "ThunderstormProbability": number,
        "RainProbability": number,
        "SnowProbability": number,
        "IceProbability": number,
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
            },
            "Direction": {
                "Degrees": number,
                "Localized": string,
                "English": string
            }
        },
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
        "HoursOfPrecipitation": number,
        "HoursOfRain": number,
        "HoursOfSnow": number,
        "HoursOfIce": number,
        "CloudCover": number
    },
    "Night": {
        "Icon": number,
        "IconPhrase": string,
        "HasPrecipitation": boolean,
        "ShortPhrase": string,
        "LongPhrase": string,
        "PrecipitationProbability": number,
        "ThunderstormProbability": number,
        "RainProbability": number,
        "SnowProbability": number,
        "IceProbability": number,
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
            },
            "Direction": {
                "Degrees": number,
                "Localized": string,
                "English": string
            }
        },
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
        "HoursOfPrecipitation": number,
        "HoursOfRain": number,
        "HoursOfSnow": number,
        "HoursOfIce": number,
        "CloudCover": number
    },
    "Sources": string[],
    "MobileLink": string,
    "Link": string
}