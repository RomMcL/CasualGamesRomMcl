let weatherAppid = 'Ваш ключ с openweathermap.org';
let geoapifyKey = 'Ваш ключ с geoapify.com';
let keyMyAPI = 'Ключ от Ромы';


// Ниже мои ключи. Нужно будет их убрать отсюда.
// Для теста раскомментируйте.

weatherAppid = '423f76c6bd7a6c7df6e42bb4a28240d6';
geoapifyKey = 'fc9cca72d5c2441d8b8fea67c43ccecd';
keyMyAPI = secrets.KEY_MY_API;


let store = {
    dt: 0,
    city: JSON.parse(localStorage.getItem('weather_city')) ||'Москва',
    country: "",
    sunrise: 0,
    sunset: 0,
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    clouds: 0,
    id: 0,
    description: "",
    feelsLike: 0,
    humidity: 0,
    pressure: 0,
    visibility: 0,
    deg: 0,
    speed: 0
}


let weatherData = async (city) => {

    // ИМПОРТОЗАМЕЩЕНИЕ!
    /* В виду введённых против нашей страны санкций представителями api.openweathermap.org,
    при прямом подключении к их API с наших адресов, наблюдается нестабильность работы
    в виде частого (почти постоянного) отсутствия ответа на запросы.
    Чтобы избежать этого неудобства я подключаюсь к своему API-обертке.
    Т.к. мой API "живёт" на буржуйском сервере (хоть и бесплатном), запросы к оригинальному API
    проходят без санкционного воздействия.
    Что бы подключаться напрямую, раскомментируйте прямой запрос и закомментируйте мой.
    !!! В любом случае, не забудте указать свои ключи! */

    
    // Прямой запрос к API openweathermap.org ----------------------------------------------------------------

    /* let weather_link = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherAppid}&lang=ru&units=metric`; 
    let response = await fetch(`${weather_link}&q=${city}`); */
    
    // -------------------------------------------------------------------------------------------------------
   
    // Запрос к моему API openweathermapSosiBibu.pythonanywhere.com ------------------------------------------

    let myAPI_link = `https://openweathermapsosibibu.pythonanywhere.com/parametrs?`;
    let response = await fetch(`${myAPI_link}key=${keyMyAPI}&appid=${weatherAppid}&city=${city}`,
        { 
            method: 'get', 
            mode: 'cors' 
        });
    
    // -------------------------------------------------------------------------------------------------------


    let data = await response.json();
    /* console.log(data); */


    if (data['romaSay'] != undefined) {
        romaSay(data);
    } 
    else {
        let {
            sys: { country, sunrise, sunset },
            main: { feels_like: feelsLike, humidity, pressure, temp, temp_max: tempMax, temp_min: tempMin },
            clouds: { all: clouds },
            wind: { deg, speed },
            visibility,
            dt
        } = data;

        store = {
            ...store,
            dt: calculWeatherTimes(dt, 'hm'),
            country,
            sunrise: calculWeatherTimes(sunrise, 'hms'),
            sunset: calculWeatherTimes(sunset, 'hms'),
            temp: Math.round(temp),
            tempMax: Math.ceil(tempMax),
            tempMin: Math.floor(tempMin),
            id: data.weather[0].id,
            description: data.weather[0].description,
            clouds,
            feelsLike: Math.round(feelsLike),
            humidity,
            visibility: visibility / 1000,
            pressure: Math.round(pressure / 1.33307087),
            deg,
            speed
        };

        renderComponent();
    }
};


weatherData(store.city);


async function renderComponent() {  
    createComponent();
    fillingWithData();
    windNav();  
}

function createComponent() {

    $('.loader').detach();

    $('#weather_window').append(
        '<div class="container">' +
            '<div class="main_weather">' +
                '<div id="head_weather"></div>' +
                '<div id="middle_weather"></div>' +
                '<div id="description_weather"></div>' +
            '</div>' +
        '</div>');

    $('#head_weather').append(
        '<div class="region">' +
            '<div class="region_title">' +
                '<span></span>' + '<span></span>' +
            '</div>' +
            '<div class="fw-bold city">' +
                '<span></span>' +
            '</div>' + 
        '</div>' + 
        '<div class="sun">' +
            '<span class="fw-bold"></span>' +
            '<div class="indicator">' +
                '<span></span>' +
            '</div>' + 
        '</div>' +
        '<div class="sun">' +
            '<span class="fw-bold"></span>' +
            '<div class="indicator">' +
                '<span></span>' +
            '</div>' + 
        '</div>');

        $('#middle_weather').append(
            '<div id="temp">' +
                '<img class="weather_icon" />' +     
                '<div class="temperature">' +
                    '<span></span>' +
                '</div>' +
                '<div id="max_min">' +
                    '<span></span>' +
                    '<div class="indicator">' +
                        '<span></span>' +
                    '</div>' +
                '</div>' +

            '</div>');

        let descriptionDiv = 3
        while (descriptionDiv--) {
            $('#description_weather').append(
                '<div class="description"">' +
                    '<span></span>' + '<span class="fw-bold"></span>' +
                '</div>'
            );
        }

        let additionalDiv = 2
        while (additionalDiv--) {
            $('.main_weather').append('<div class="additional_div""></div>');   
        } 

        $('.additional_div').each((index, item) => {
            let additional = 2
            while (additional--) {
                $(item).append('<div class="additional""></div>');
            }
        });

        $('.additional').each((index, item) => {           
            $(item).append(
                '<img class="additional_icon" />' +
                '<div class="additional_value">' +
                    '<span class="fw-bold"></span>' + 
                    '<div>' +
                        '<span></span> ' + 
                    '</div>' +
                '</div>');
        });

        $('.additional_value:eq(2)').append(
            '<div id="wind-div">' +
                '<img class="wind_nav" />' +
                '<span></span>' +
            '</div>');
}

function fillingWithData() {

    const { dt, country, sunrise, sunset, city, temp, tempMax, tempMin, id, description, clouds, feelsLike, humidity, visibility, deg, speed, pressure } = store;

    $('.region_title').children('span').first().html(`Регион ${country}`);
    $('.region_title').children('span').last().html(`Данные на: ${dt}`);    
    $('.city').children('span').html(`${city}`);
    $('.sun').each((index, item) => {
        switch (index){
            case 0: $(item).children('span').html('Восход');
                    $(item).children('span').next().children('span').html(`${sunrise}`);
                    break;
            case 1: $(item).children('span').html('Закат');
                    $(item).children('span').next().children('span').html(`${sunset}`);
                    break;
        }
    })
    $('.weather_icon').attr({
        src: `img/weather/${getWeatherIcon(id)}`,
        alt: "WeatherIcon"
    });
    $('.temperature').children('span').html(`${temp}°`);
    $('#max_min').children('span').html('В разных районах города');
    $('#max_min').children('span').next().children('span').html(`от ${tempMin}° до ${tempMax}°`);
    $('.description').each((index, item) => {
        switch (index){
            case 0: $(item).children('span').first().html('Сейчас на улице ');
                    $(item).children('span').last().html(`${description}.`);
                    break;
            case 1: $(item).children('span').first().html('Облачность ');
                    $(item).children('span').last().html(`${clouds}%.`);
                    break;
            case 2: $(item).children('span').first().html('Температура ощущается как ');
                    $(item).children('span').last().html(`${feelsLike}°.`);
                    break;
        }
    })

    $('.additional_icon').each((index, item) => {
        switch (index){
            case 0: $(item).attr({
                        src: 'img/weather/humidity.png',
                        alt: 'HumidityIcon'
                    });
                    break;
            case 1: $(item).attr({
                        src: 'img/weather/visibility.png',
                        alt: 'VisibilityIcon'
                    });
                    break;
            case 2: $(item).attr({
                        src: 'img/weather/wind.png',
                        alt: 'WindIcon'
                    });
                    break;
            case 3: $(item).attr({
                        src: 'img/weather/pressure.png',
                        alt: 'PressureIcon'
                    });
                    break;
        }
    })
    
    $('.additional_value').each((index, item) => {
        switch (index){
            case 0: $(item).children('span').html('Влажность');
                    $(item).children('div').first().html(`${humidity}%`);
                    break;
            case 1: $(item).children('span').html('Видимость');
                    $(item).children('div').first().html(`${visibility} км`);
                    break;
            case 2: $(item).children('span').html('Ветер');
                    $(item).children('div').first().html(`${windDirection(deg)}`);
                    break;
            case 3: $(item).children('span').html('Давление');
                    $(item).children('div').first().html(`${pressure}<br>мм рт. ст.`);
                    break;
        }
    })
          
    $('.wind_nav').attr({
        src: 'img/navigation.svg',
        alt: 'Wind'
    });

    $('.wind_nav').next().html(`${speed} м/с`);

    $('#wind-div').prev().addClass('wind_nav_name');
}

function windDirection(deg) {

    if (deg > 337.5) return "северный";
    if (deg > 292.5) return "северо-западный";
    if (deg > 247.5) return "западный";
    if (deg > 202.5) return "юго-западный";
    if (deg > 157.5) return "южный";
    if (deg > 122.5) return "юго-восточный";
    if (deg > 67.5) return "восточный";
    if (deg > 22.5) return "северо-восточный";
    return "северный";
}

function windNav() {

    switch ($('.wind_nav_name').text()) {
        case "южный":
            $('.wind_nav').attr('style', 'transform: rotate(0deg)');
            break;
        case "юго-западный":
            $('.wind_nav').attr('style', 'transform: rotate(45deg)');
            break;
        case "западный":
            $('.wind_nav').attr('style', 'transform: rotate(90deg)');
            break;
        case "северо-западный":
            $('.wind_nav').attr('style', 'transform: rotate(135deg)');
            break;
        case "северный":
            $('.wind_nav').attr('style', 'transform: rotate(180deg)');
            break;
        case "северо-восточный":
            $('.wind_nav').attr('style', 'transform: rotate(225deg)');
            break;
        case "восточный":
            $('.wind_nav').attr('style', 'transform: rotate(270deg)');
            break;
        case "юго-восточный":
            $('.wind_nav').attr('style', 'transform: rotate(315deg)');
            break;
        default: $('.wind_nav').attr('style', 'transform: rotate(0deg)');
    }
}

function getWeatherIcon(id) {

    if (id == 800) return "sun800.png";
    if (id == 801) return "sun801.png";
    if (id == 802) return "sun802.png";
    if (id == 803) return "pas803.png";
    if (id == 804) return "pas804.png";

    if (id >= 300 && id <= 400) return "rain300.png";
    if (id >= 500 && id <= 505) return "rain500.png";
    if (id == 511) return "snowR.png";
    if (id >= 515 && id <= 540) return "rain555.png";
    if (id >= 200 && id <= 250) return "rain200.png";

    if (id == 600) return "snow600.png";
    if (id == 601 || id == 602) return "snow610.png";
    if (id >= 611 && id <= 650) return "snowR.png";

    if (id >= 700 && id <= 765) return "tuman666.png";
    if (id >= 770 && id <= 790) return "rain666.png";
}

function calculWeatherTimes(date_unix, option_return) {
    let date_standart = new Date(date_unix * 1000),
        hour = date_standart.getHours(),
        minute = date_standart.getMinutes(),
        second = date_standart.getSeconds();

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    switch (option_return) {
        case 'hms':
            return hour + ':' + minute + ':' + second;
        case 'hm':
            return hour + ':' + minute;
    }
}

function romaSay(keyErrorData) {
    $('.loader').detach();

    $('#weather_window').append(
        '<div class="container">' +
            '<h1></h1>' + '<p></p>' +
        '</div>');

    $('.container').children('h1').html(`${keyErrorData['noValidKey']}`);
    $('.container').children('p').html(`${keyErrorData['romaSay']}`);
    $('.container').children('p').attr('style', 'text-align: center;');
}


/* Смена города */

$('#weather_change_city').hover(
    function(){
        $('#change_img').addClass('cci_hover_change');
    },
    function(){
      $('#change_img').removeClass('cci_hover_change');
    }
  );


$('#weather_change_city').on('click', () => {

    $('.container').css('--opacity', '1');
    $('.region').html('');

    const setNewCity = () => {  
        return `<div id="new_city_form">
                    <span>Ищем город:</span>
                    <input type="text" id="input_new_city">
                    <div>
                        <button id="new_city_search">Найти</button>
                        <button id="new_city_save">Найти и запомнить</button> 
                    </div>
                    <div id="new_city_close">
                        <img src="img/close.svg" alt="Close"> 
                    </div>            
                </div>`;
      };

    $('.region').html(setNewCity());

    $('#new_city_search').on('click', searchCity);

    $('#new_city_save').on('click', saveCity);

    $('#new_city_close').on('click', () => {
        $('.container').css('--opacity', '0');
        $('#weather_window').html('');
        renderComponent();
    });
})


async function searchCity () {

    const input_new_city = $('#input_new_city').val();
    
    if(!input_new_city) {
        return;
    }

    try {        
        await weatherData(input_new_city);
        store.city = capitalizeFirstLetter(input_new_city);
        $('.container').css('--opacity', '0');
        $('#weather_window').html('');  
        renderComponent();
    } catch (error) {
        showError();
        console.log(error);
    }
}

function showError() {
    $('.region').css('--visibility', 'none');
    setTimeout(() => {
        $('.region').css('--visibility', 'hidden');
    }, 1500);
}

async function saveCity () {
    await searchCity();
    localStorage.setItem('weather_city', JSON.stringify(store.city));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Геолокация */

$('#weather_my_city').hover(
    function(){
        $('#my_img').addClass('cci_hover_change');
    },
    function(){
      $('#my_img').removeClass('cci_hover_change');
    }
  );

$('#weather_my_city').on('click', () => {

    const options = {
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0
    }

    const success = async (pos) => {
        const coordinates = pos.coords;
        const response  = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&lang=ru&apiKey=${geoapifyKey}`);

        const result = await response.json();

        store.city = result.features[0].properties.city;

        $('#weather_window').html('');
        weatherData(store.city);
    };

    const error = (err) => {
        console.log(err.code + "" + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

})
