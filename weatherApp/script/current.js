//오늘 날씨

import config from '../config/apikey.js';
let apiKey = config.apiKey;

let url = 'https://api.openweathermap.org/data/2.5/weather?lat=37.3236&lon=126.8219&appid='+apiKey+'&units=metric';
$.getJSON(url, function(data){
  console.log(data);
  let city = data.name; //도시 이름
  let temp = Math.round(data.main.temp);  //Math.round를 활용해 소수점 반올림
  let humidity = data.main.humidity;  // 습도
  let temp_max = Math.round(data.main.temp_max);  //현재의 최고기온
  let temp_min = Math.round(data.main.temp_min);  //현재의 최저기온
  let wind = data.wind.speed; //풍속
  let icon = data.weather[0].icon;  //날씨에 맞는 아이콘
  if(icon === '01d' || icon === '01n'){ //clear sky
    $('#suggest').text('오늘은 우산을 챙기지 않아도 돼요!');
    $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    }
  }
  if(icon === '02d' || icon === '02n'){ //few clouds
    $('#suggest').text('오늘은 우산을 챙기지 않아도 돼요!');
    $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    }
  }
  if(icon === '03d' || icon === '03n'){ //scattered clouds
    $('#suggest').text('오늘은 구름이 많아 쌀쌀하니, 따뜻하게 입고 실내 습도를 챙기며 여유롭게 보내세요! 😊');
    $('#main-background').attr('src', 'assets/cloud_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/cloud_tablet.mp4');
    }
  }
  if(icon === '04d' || icon === '04n'){ //broken clouds
    $('#suggest').html('오늘은 구름이 많고 쌀쌀하니, <br/> 따뜻하게 입고 <br/> 실내 습도를 챙기며 여유롭게 보내세요! 😊');
    $('#main-background').attr('src', 'assets/cloud_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/cloud_tablet.mp4');
    }
  }
  if(icon === '09d' || icon === '09n'){ //shower rain
    $('#suggest').text('우산을 챙기고 방수 신발로 대비하세요! 🌧️');
    $('#main-background').attr('src', 'assets/rain_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/rain_tablet.mp4');
    }
  }
  if(icon === '10d' || icon === '10n'){ //rain
    $('#suggest').text('우산을 챙기고 방수 신발로 대비하세요! 🌧️');
    $('#main-background').attr('src', 'assets/rain_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/rain_tablet.mp4');
    }
  }
  if(icon === '11d' || icon === '11n'){ //thunderstorm
    $('#suggest').text('외출을 조심하세요!');
    $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/sunny_phone.mp4');
    }
  }
  if(icon === '13d' || icon === '13n'){ //snow
      $('#suggest').text('오늘은 눈이 내려 추우니 따뜻하게 입고 미끄러운 길 조심하세요! ❄️');
      $('#main-background').attr('src', 'assets/snow_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/snow_tablet.mp4');
    }
  }
  if(icon === '50d' || icon === '50n'){ //mist
      $('#suggest').text('오늘은 안개가 끼어 가시거리가 짧으니, 외출 시 안전에 유의하세요! 🌫️');
      $('#main-background').attr('src', 'assets/mist_phone.mp4');
    if (matchMedia("(min-width:1024px) and (max-width:1279px)").matches) {
      $('#main-background').attr('src', 'assets/mist_phone.mp4');
    }
  }
  
  $('#txt_humidity').text(humidity+" %");
  $('#txt_speed').text(wind+" m/s");
  $('#city').text(city)
  $('#temp').html(temp+'<span style="font-size: 6vw">℃</span>');
  $('#temp_max').html('<span style="font-weight: bold">↑</span> '+temp_max+'℃');
  $('#temp_min').html('<span style="font-weight: bold">↓</span> '+temp_min+'℃');

})