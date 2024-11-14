//5일치 날씨

import config from '../config/apikey.js';
let apiKey = config.apiKey;

let furl = 'https://api.openweathermap.org/data/2.5/forecast?lat=37.3236&lon=126.8219&appid='+apiKey+'&units=metric';

let weather_array = [];
let temp_array = [];
let time_array = [];
$.getJSON(furl, function(data){
    console.log(data);

    for(let i=0; i<40 ; i++){
        let fweather = data.list[i].weather[0].main;
        let temp = Math.floor(data.list[i].main.temp);
        let icon = data.list[i].weather[0].icon;
        let dt = data.list[i].dt;
        if(i == 0){
            let rain_per = data.list[i].pop * 100;
            $('#txt_rain').text(rain_per + " %");
        }
        let iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';
        let time = moment(dt * 1000).format('HH:mm');
        let dom = $('<div style="width: 20%"><div>');

        if( i < 5 ){
            dom.append('<p>' + time + '</p>');
            dom.append('<img src="'+iconURL+'"/>');
            dom.append('<p>' + temp + ' ℃ </p>');
            $('.forecast_area').append(dom);
        }

        weather_array.push(data.list[i].weather[0].main);
        
        if(i % 8 == 7){
            temp_array.push(temp);
            time_array.push(moment(dt * 1000).format('MM월 DD일'));
        }
    }
    loadChart();
})

//chart
function loadChart() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: time_array,
            datasets: [{
                label: '온도',
                data: temp_array,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
                color: '#FFF'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                fontColor: 'white',
            },
			legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    display: false
                }
            },
            elements: {
                line: { tension: 0.4 }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 50,
                    bottom: 0
                }
            },
        }
    });
}