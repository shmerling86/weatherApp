import { CityKey } from 'src/app/interfaces/CityKey';
import { CityWeather } from 'src/app/interfaces/CityWeather';

export interface Favorite {
    city: CityKey,
    weather: CityWeather,
}
