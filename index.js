require('dotenv').config();
require('colors');
const axios = require('axios');


const { 
    inquirerMenu, 
    pause, 
    leerInput,
    listPlaces,
    listTasksComplete,
    confirm
} = require('./helpers/inquirer');

const colors = require('colors');
const Searchs = require('./models/searchs');

const main = async() => {
    let opt;
    const searchs = new Searchs();

    do {
       opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Show message
                const searchTerm = await leerInput('Insert city name:');
                // Search places
                const places = await searchs.searchCity(searchTerm);
                // Select place
                const idSelect = await listPlaces(places);
                if (idSelect === '0') continue;

                const placeSelect = places.find( l => l.id === idSelect);
                searchs.addHistory(placeSelect.name);
                
                const weather = await searchs.searchWeather(placeSelect.lat,placeSelect.lng);

                // Show information
                console.log(`\nCity's Information\n`);
                console.log(`City: ${placeSelect.name.green}`);
                console.log(`Lat: ${(placeSelect.lat).toString().green}`);
                console.log(`Long: ${(placeSelect.lng).toString().green}`);
                console.log(`Temp: ${(weather.temp).toString().green}`);
                console.log(`Min: ${(weather.min).toString().cyan}`);
                console.log(`Max: ${(weather.max).toString().blue}`);
                console.log(`Conditions: ${weather.desc.red}`);


                break;
            case 2:
                searchs.history.forEach ((place, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${place}`);
                });
                break;
        }

        if (opt!==0) await pause();

    } while ( opt !== 0 )
}

main();