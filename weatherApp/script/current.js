//오늘 날씨

import config from '../config/apikey.js';
let apiKey = config.apiKey;

let url = 'https://api.openweathermap.org/data/2.5/weather?lat=37.3236&lon=126.8219&appid='+apiKey+'&units=metric';
$.getJSON(url, function(data){
  console.log(data);
  let city = data.name;
  let weather = data.weather[0].main;
  let temp = Math.floor(data.main.temp);
  let humidity = data.main.humidity;
  $('#txt_humidity').text(humidity+" %");
  let temp_max = Math.floor(data.main.temp_max);
  let temp_min = Math.floor(data.main.temp_min);
  let wind = data.wind.speed;
  $('#txt_speed').text(wind+" m/s");
  let icon = data.weather[0].icon;
  let iconURL = icon+'.png';

  if(icon === '01d' || icon === '01n'){ //clear sky
      $('#suggest').text('오늘은 우산을 챙기지 않아도 돼요!');
      $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    //화면의 크기가 760px 이상일때 적용 할 코드
    if (matchMedia("screen and (max-width: 479px)").matches) {
      $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    }
  }
  if(icon === '04d' || icon === '04n'){ //broken clouds
      $('#suggest').text('빨래가 마르지 않아요 😥');
      $('#main-background').attr('src', 'assets/cloud_phone.mp4');
    //화면의 크기가 760px 이상일때 적용 할 코드
    if (matchMedia("screen and (max-width: 479px)").matches) {
      $('#main-background').attr('src', 'assets/cloud_phone.mp4');
    }
  }
  if(icon === '10d' || icon === '10n'){ //rain
    $('#suggest').text('꼭 우산을 챙기세요!');
    $('#main-background').attr('src', 'assets/rain_phone.mp4');
    //화면의 크기가 760px 이상일때 적용 할 코드
    if (matchMedia("screen and (max-width: 479px)").matches) {
      
    }
  }

  $('#city').text(city)
  // $('#weather').text(weather);
  $('#temp').html(temp+'<span style="font-size: 6vw">℃</span>');
  $('#temp_max').html('<span style="font-weight: bold">↑</span> '+temp_max+'℃');
  $('#temp_min').html('<span style="font-weight: bold">↓</span> '+temp_min+'℃');
})