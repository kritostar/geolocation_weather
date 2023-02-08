const fs = require('fs');
const axios = require('axios');

class Searchs {
    history = [];
    dbPath = './db/database.json';

    constructor(){
        // TODO: read DB if
        this.readDb();
    }

    get paramsMapBox(){
        return {
            'language': 'en',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    get paramsWeather(){
        return {
            'appid': process.env.OPENWEATHER,
            'units': 'metric'
        }
    }

    async searchCity (place = ''){

        try {
        //http petition
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
            params: this.paramsMapBox
        });

        const resp = await instance.get();

        return resp.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1]
        }));

        }
        catch (err) {
            console.log(err);
            return [];
        }

    }

    async searchWeather (lat, long){

        try {
        //http petition
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`,
            params: this.paramsWeather
        });

        const resp = await instance.get();
        const {weather, main} = resp.data;

        return {
            desc: weather[0].description,
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp
        }

        }
        catch (err) {
            console.log(err);
            return [];
        }

    }

    addHistory (lugar=''){

        if (this.history.includes(lugar))
            return;

        this.history = this.history.splice(0,4);
        this.history.unshift(lugar);

        this.saveDB();

    }

    
    saveDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDb() {

        if (!fs.existsSync(this.dbPath)){
            return;
        }
    
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.history = data.history;
    }
}

module.exports = Searchs;