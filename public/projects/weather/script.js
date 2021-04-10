
class Weather {
    constructor() {
        this.lon = null; //longtitude
        this.lat = null; //latitude
        // this.proxy = 'https://cors-anywhere.herokuapp.com/'; //for localhost testing
        this.apiKey = '7d381ea8c10e9bda6841b96c50176d2f';
        this.api = null;
        this.gotLocation = false;
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition((x) => {
            //On Success
            document.querySelector('.city').innerHTML = 'Loading...'
            this.lon = x.coords.longitude;
            this.lat = x.coords.latitude;
            this.getWeather();
        }, (x) => {
            //On Failure
            document.querySelector('.city').innerHTML = x.message; 
        })
    }

    getWeather() {
            // this.api = `${this.proxy}api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
            this.api = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
            // this.api = `${this.proxy}api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
            console.log('running getweather')
            fetch(this.api)
                .then(data => { return data.json(); })
                .then(data => {
                    console.log(data.weather[0].description);                
                    let celcius = (data.main.temp - 273.15).toFixed(1); 
                    // document.querySelector('.gpsWarning').innerHTML = '';
                    document.querySelector('.city').innerHTML = `${data.name}`; 
                    document.querySelector('.description').innerHTML = `${data.weather[0].description}`; 
                    document.querySelector('.temperature').innerHTML = `${celcius}° C`;

                }).catch((e) => {
                    // document.querySelector('.city').innerHTML = `Something Went Wrong`; 
                    document.querySelector('.city').innerHTML = e; 
                })
    }
} 

let weather = new Weather();
weather.getLocation();

