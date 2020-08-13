//Déclarations de toutes les variables.//

let req = fetch("https://www.prevision-meteo.ch/services/json/toulon");
let temperature = document.querySelector("#temperature");
let city = document.querySelector("#city");
let date = document.querySelector("#date");
let icon = document.querySelector('img');
let hourlyTab = document.querySelector("#hourly");



req.then(function(response){

    return response.json();
})

.then(function(askWeather){
    temperature.textContent = askWeather.current_condition.tmp + "°C";
    city.textContent = askWeather.city_info.name;
    date.textContent = askWeather.current_condition.date;
    icon.setAttribute("src" , askWeather.current_condition.icon_big);
   


    let hourlyTab = Object.entries(askWeather.fcst_day_0.hourly_data);
    for(i = 0 ; i < hourlyTab.length ; i++){
        const [hour, data] = hourlyTab[i];
        hourly.innerHTML += `<div class="col">`+ `<p>`+ hour + " " +`</p>`+ `<p>`+  data.TMP2m + "°" +`<p>` + `<img src="`+ data.ICON +`" ></img>`+` </p>` +`</div>`; 
    
        
    }

});

function updateMeteo(){
    fetch(url)
    .then(response => response.json())
    .then(function(response) {
        $city.value = response.city_info.name;
        $currentTemp.innerHTML = response.current_condition.tmp +'°C';
    })
    .catch(function () {
        alert('Erreur');
    })
    }