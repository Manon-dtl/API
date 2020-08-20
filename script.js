//Déclarations de toutes les variables.//
let url = "https://www.prevision-meteo.ch/services/json/";
let req = fetch("https://www.prevision-meteo.ch/services/json/tourtour");
let temperature = document.querySelector("#temperature");
let city = document.querySelector("#city");
let date = document.querySelector("#date");
let icon = document.querySelector('img');
let hourlyTab = document.querySelector("#hourly");
let cities = [];
let firstDay = document.querySelector("#day");
let wdirection = document.querySelector("#winddirection");
let wspeed= document.querySelector("#windspeed");
const weatherc= document.querySelector("#weatherconditions");

req.then(function (response) {
    return response.json();
})

    .then(function (askWeather) {
        updatePage(askWeather);
    });

function updateMeteo() {
    let cityWanted = document.getElementById("searchInput").value;
    fetch(url + cityWanted)
        .then(response => response.json())
        .then(function (response) {
            updatePage(response);
        })
        .catch(function () {
            alert('Erreur');
        });
}

function updatePage(weather) {
    temperature.textContent = weather.current_condition.tmp + "°C";
    city.textContent = weather.city_info.name;
    date.textContent = weather.fcst_day_0.day_long + " " + weather.current_condition.date;
    icon.setAttribute("src", weather.current_condition.icon_big);
    wdirection.textContent = " C'est un vent du " + weather.current_condition.wnd_dir;
    wspeed.textContent = " La vitesse du vent est de " + weather.current_condition.wnd_spd + "km/h";
    weatherc.textContent = weather.current_condition.condition;

    let result = getImagesFromConditionsKey(weather.current_condition.condition);
    document.body.style.backgroundImage = `url(${result}`;



    let hourlyTab = Object.entries(weather.fcst_day_0.hourly_data);
    hourly.innerHTML = '';
    for (i = 0; i < hourlyTab.length; i++) {
        const [hour, data] = hourlyTab[i];
        hourly.innerHTML += `<div class="hourlyBloc">` + `<p>` + hour + " " + `</p>` + `<p>` + data.TMP2m + "°" + `<p>` + `<img src="` + data.ICON + `" ></img>` + ` </p>` + `</div>`;
    }


    firstDay = document.querySelector("#day");
    firstDay.innerHTML = "";
    for (i = 1; i < 5; i++) {
        const data = "fcst_day_" + [i];
        firstDay.innerHTML += `<div class="day-block col-3">` + `<p>` + weather[data].date + " " + ` </p> `
            + `<p>` + weather[data].tmin + "°" + `/` +
            weather[data].tmax + "°" 
            + `<p>` + weather[data].day_long
            + `<p>` + `<img src="` + weather[data].icon + `"></img>` + `</p>` + `</div>`;
    }
}


var input = document.getElementById("searchInput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});


function show(windinfos) {
    document.getElementById(windinfos).style.visibility = "visible";
  }
  function hide(windinfos) {
    document.getElementById(windinfos).style.visibility = "hidden";
  }
  function updatetimetitle(){
      let title= document.querySelector("#title");
  }


// objet avec les différentes clés/valeurs des conditions météorilogiques.

  const imagesForConditions = {
      "Pluie forte" : "https://papers.co/wallpaper/papers.co-mv92-rainy-window-nature-water-drop-road-dark-bw-34-iphone6-plus-wallpaper.jpg)",
      "Ciel voilé" : "https://i.pinimg.com/originals/bf/f8/97/bff8972e2364995ee44420ae49d9bacb.jpg",
      "Eclaircies" : "https://i.pinimg.com/originals/c8/f8/bc/c8f8bca18339510b944702ff7824f7e1.jpg",
      "Ensoleillé" : "https://i.pinimg.com/originals/e2/53/df/e253df621b27b97be406ec202ed96f6d.jpg",
    
  }

  function getImagesFromConditionsKey(key){
    return imagesForConditions[key];
  }
