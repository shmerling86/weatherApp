export interface DailyForecasts {
    
            "Date": string,
            "EpochDate": number,
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
            "Day": {
                "Icon": number,
                "IconPhrase": string,
                "HasPrecipitation": boolean
            },
            "Night": {
                "Icon": number,
                "IconPhrase": string,
                "HasPrecipitation": boolean
            },
            "Sources": [
                string
            ],
            "MobileLink": string,
            "Link": string
        }
