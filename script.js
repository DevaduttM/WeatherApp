let timeEl = document.getElementById("time");
let dateEl = document.getElementById("date");
let Humidity = document.getElementById("humidityh33");
let Pressure = document.getElementById("pressureh33");
let Sunrise = document.getElementById("sunriseh3");
let Sunset = document.getElementById("sunseth3");
let Visibility = document.getElementById("visibilityh33");
let Feels = document.getElementById("feelsh33");
let Daily = document.getElementById("days");
let Temp = document.getElementById("temp");
let Desc = document.getElementById("desc");
let Icon = document.getElementById("img1");
let City = document.getElementById("city");
let WindS = document.getElementById("ws");
let WindD = document.getElementById("wd");


let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const API_KEY = 'dab3af44de7d24ae7ff86549334e45bd';
setInterval(() => {
    let time1 = new Date();
    let month = time1.getMonth();
    let date = time1.getDate();
    let year = time1.getFullYear();




    dateEl.innerText = date + ' ' + months[month] + ' ' + year;
},100);



    livelocation()
    defaultdata()


function defaultdata(){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=28.6667&lon=77.2167&exclude=minutely&units=metric&appid=dab3af44de7d24ae7ff86549334e45bd`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherDatasearch(data);
    })


    function showWeatherDatasearch(data) {
        let {humidity, pressure, sunrise, sunset, visibility,feels_like,temp,weather,wind_deg, wind_speed} = data.current;


    
        const str = weather[0].description;
    
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
    
        const str2 = arr.join(" ");
    
        Humidity.innerHTML = humidity + '%';
        Pressure.innerHTML = pressure + 'Pa';
        Visibility.innerHTML = visibility/1000 + 'Km';
        Feels.innerHTML = Math.round(feels_like)+ '°C';
        Sunrise.innerHTML = window.moment(sunrise *1000).format('HH:mm A');
        Sunset.innerHTML = window.moment(sunset *1000).format('HH:mm A');
        Temp.innerHTML = Math.round(temp) + '°C' ;
        Desc.innerHTML = str2;
        document.getElementById("img1").src="https://openweathermap.org/img/wn/"+weather[0].icon+"@2x.png";
        WindD.innerHTML = wind_deg+" °";
        WindS.innerHTML = wind_speed +" m/s";

        document.getElementById("time").innerHTML = new Date().toLocaleString("en-US",{timeZone: data.timezone,timeStyle:'short',hourCycle:'h12'});
    
    
        for (i=0;i<7;i++){
            document.getElementById("temptable"+(i+1)).innerHTML = Math.round(data.daily[i].temp.day)+"°C";
            document.getElementById("imgt"+(i+1)).src = "https://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png"
            document.getElementById("daytable"+(i+1)).innerHTML = window.moment(data.daily[i].dt*1000).format('ddd');
        }
    
        for (i=0;i<24;i+=3){
            document.getElementById("table"+(i+1)).innerHTML = Math.round(data.hourly[i].temp)+"°C";
            document.getElementById("imgtt"+(i+1)).src = "https://openweathermap.org/img/wn/"+data.hourly[i].weather[0].icon+"@2x.png"
        }
    

    
}


}

function livelocation(){

    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude,longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })

   

function showWeatherData(data) {
    let {humidity, pressure, sunrise, sunset, visibility,feels_like,temp,weather, wind_deg, wind_speed} = data.current;

    const str = weather[0].description;

    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
}

    const str2 = arr.join(" ");


    Humidity.innerHTML = humidity + '%';
    Pressure.innerHTML = pressure + 'Pa';
    Visibility.innerHTML = visibility/1000 + 'Km';
    Feels.innerHTML = Math.round(feels_like)+ '°C';
    Sunrise.innerHTML = window.moment(sunrise *1000).format('HH:mm A');
    Sunset.innerHTML = window.moment(sunset *1000).format('HH:mm A');
    Temp.innerHTML = Math.round(temp) + '°C' ;
    Desc.innerHTML = str2;
    document.getElementById("img1").src="https://openweathermap.org/img/wn/"+weather[0].icon+"@2x.png";
    City.innerHTML = "Your Location"
    WindD.innerHTML = wind_deg+" °";
    WindS.innerHTML = wind_speed +" m/s";

    document.getElementById("time").innerHTML = new Date().toLocaleString("en-US",{timeZone: data.timezone,timeStyle:'short',hourCycle:'h12'});


    for (i=0;i<7;i++){
        document.getElementById("temptable"+(i+1)).innerHTML = Math.round(data.daily[i].temp.day)+"°C";
        document.getElementById("imgt"+(i+1)).src = "https://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png"
        document.getElementById("daytable"+(i+1)).innerHTML = window.moment(data.daily[i].dt*1000).format('ddd');
    }

    for (i=0;i<24;i+=3){
        document.getElementById("table"+(i+1)).innerHTML = Math.round(data.hourly[i].temp)+"°C";
        document.getElementById("imgtt"+(i+1)).src = "https://openweathermap.org/img/wn/"+data.hourly[i].weather[0].icon+"@2x.png"
    }


}

}
function searchlocation(){

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+document.getElementById('searchbarr').value+"&appid="+API_KEY).then(res => res.json()).then(datas => {
            console.log(document.getElementById('searchbarr').value)
            try{
                let {lat,lon} = datas.coord;
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&units=metric&appid="+API_KEY).then(res => res.json()).then(data => {
                console.log(data)
                showWeatherData(data);
            })
            }

            catch(error){
                console.log(error);
                document.getElementById("errorr").style.display = "flex";
            }
                
            
            
    })


function showWeatherData(data) {
    let {humidity, pressure, sunrise, sunset, visibility,feels_like,temp,weather, wind_deg, wind_speed} = data.current;

    const str = weather[0].description;

    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
}

    const str2 = arr.join(" ");

    Humidity.innerHTML = humidity + '%';
    Pressure.innerHTML = pressure + 'Pa';
    Visibility.innerHTML = visibility/1000 + 'Km';
    Feels.innerHTML = Math.round(feels_like)+ '°C';
    Sunrise.innerHTML = window.moment(sunrise *1000).format('HH:mm A');
    Sunset.innerHTML = window.moment(sunset *1000).format('HH:mm A');
    Temp.innerHTML = Math.round(temp) + '°C' ;
    Desc.innerHTML = str2;
    document.getElementById("img1").src="https://openweathermap.org/img/wn/"+weather[0].icon+"@2x.png";
    City.innerHTML = document.getElementById("searchbarr").value.charAt(0).toUpperCase()+document.getElementById("searchbarr").value.slice(1);
    WindD.innerHTML = wind_deg+" °";
    WindS.innerHTML = wind_speed +" m/s";

    document.getElementById("time").innerHTML = new Date().toLocaleString("en-US",{timeZone: data.timezone,timeStyle:'short',hourCycle:'h12'});

    

    for (i=0;i<7;i++){
        document.getElementById("temptable"+(i+1)).innerHTML = Math.round(data.daily[i].temp.day)+"°C";
        document.getElementById("imgt"+(i+1)).src = "https://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png"
        document.getElementById("daytable"+(i+1)).innerHTML = window.moment(data.daily[i].dt*1000).format('ddd');
    }

    for (i=0;i<24;i+=3){
        document.getElementById("table"+(i+1)).innerHTML = Math.round(data.hourly[i].temp)+"°C";
        document.getElementById("imgtt"+(i+1)).src = "https://openweathermap.org/img/wn/"+data.hourly[i].weather[0].icon+"@2x.png"
    }


}
}


function hide(){
    document.getElementById("errorr").style.display = "none";
}

