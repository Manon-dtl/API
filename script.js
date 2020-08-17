//Déclarations de toutes les variables.//
let url = "https://www.prevision-meteo.ch/services/json/";
let req = fetch("https://www.prevision-meteo.ch/services/json/toulon");
let temperature = document.querySelector("#temperature");
let city = document.querySelector("#city");
let date = document.querySelector("#date");
let icon = document.querySelector('img');
let hourlyTab = document.querySelector("#hourly");
let cities = [];

req.then(function(response){
    return response.json();
})

.then(function(askWeather){
    updatePage(askWeather);
});

function updateMeteo(){
    let cityWanted = document.getElementById("searchInput").value;
    fetch(url + cityWanted)
    .then(response => response.json())
    .then(function(response) {
        updatePage(response);
    })
    .catch(function () {
        alert('Erreur');
    });
}


function updatePage(weather){
    temperature.textContent = weather.current_condition.tmp + "°C";
    city.textContent = weather.city_info.name;
    date.textContent = weather.current_condition.date;
    icon.setAttribute("src" , weather.current_condition.icon_big);

    let hourlyTab = Object.entries(weather.fcst_day_0.hourly_data);
    hourly.innerHTML = '';
    for(i = 0 ; i < hourlyTab.length ; i++){
        const [hour, data] = hourlyTab[i];
        hourly.innerHTML += `<div class="hourlyBloc">`+ `<p>`+ hour + " " +`</p>`+ `<p>`+  data.TMP2m + "°" +`<p>` + `<img src="`+ data.ICON +`" ></img>`+` </p>` +`</div>`; 
    
        
    }
}

