//5일치 날씨
import config from '../config/apikey.js';
let apiKey = config.apiKey;

Chart.register(ChartDataLabels);
let furl = 'https://api.openweathermap.org/data/2.5/forecast?lat=37.3236&lon=126.8219&appid='+apiKey+'&units=metric';
moment.locale('ko');

let temp_array = [];
let time_array = [];

let maxTemp_array = [];
let minTemp_array = [];

let icon_array = [];

$.getJSON(furl, function(data){
    for(let i=0; i<40 ; i++){   //40개 데이터 우선 추출
        let temp = Math.round(data.list[i].main.temp);  //기온
        let icon = data.list[i].weather[0].icon;    //날씨 아이콘
        let dt = data.list[i].dt;   //dateTime
        if(i == 0){ //.title-area에 필요한 강수확률
            let rain_per = data.list[i].pop * 100;  //강수확률
            $('#txt_rain').text(rain_per + " %");
        }
        let iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';  //icon-url
        let time = moment(dt * 1000).format('HH:mm');   //시간
        let week = moment(dt * 1000).format('dddd');    //요일
        let dom = $('<div style="width: 20%"><div>');   //3시간 간격에 필요한 DOM

        if( i < 5 ){    // 현재부터 3시간 간격 5개
            dom.append('<p>' + time + '</p>');
            dom.append('<img src="'+iconURL+'"/>');
            dom.append('<p>' + temp + ' ℃ </p>');
            $('.forecast_area').append(dom);
        }

        if(moment(data.list[0].dt * 1000).format('dddd') != week){  //요일이 같지 않을때 -> 다음날부터 시작
            if(moment(dt * 1000).format('HH:mm') === '15:00'){  //15시에 최고 온도
                maxTemp_array.push(temp + ' ℃');
                icon_array.push(iconURL); //그래프 하단에 사용할 아이콘 배열
            }
            if(moment(dt * 1000).format('HH:mm') === '03:00'){  //00시에 최저 온도
                minTemp_array.push(temp + ' ℃');
            }
            if(moment(dt * 1000).format('HH:mm') === '12:00'){  //12시 날씨를 그래프 적용
                time_array.push(week);
                temp_array.push(temp);
            }
        }
    }
    
    for(let i in maxTemp_array){
        let dom2 = $('<div class="wrap_maxmin"><div>');
        if(maxTemp_array[i] === 'undefined'){
            maxTemp_array[i] = minTemp_array[i];
        }
        if(minTemp_array[i] === 'undefined'){
            minTemp_array[i] = maxTemp_array[i];
        }
        dom2.append('<img width="80%" src="'+icon_array[i]+'"/>');
        dom2.append('<p>' + maxTemp_array[i] + '</p>');
        dom2.append('<p>' + minTemp_array[i] + '</p>');
        $('#dataContainer').append(dom2);
    }

    loadChart();
})

//chart
function loadChart() {
    if (matchMedia("(min-width:1024px").matches) {
      $('#myChart').attr('style', 'height: 40vh; width: 100%');
    }
    let ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: time_array,
            datasets: [{
                label: '온도',
                data: temp_array,   //저장한 temp_array 배열을 data로 사용
                borderColor: 'rgba(75, 192, 192, 1)',   //그래프 선 색
                borderWidth: 2,
                fill: false,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',  //그래프 포인트 색
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            title: {
                display: false, //범례 끄기
            },
            intersect: false,
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false, //범례 끄기
                    position: 'top',
                    align: 'center',
                    labels: {
                        boxWidth: 40,
                        padding: -40,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    display: true,
                    color: 'black',
                    anchor: 'end',
                    align: 'top',
                    offset: 0,
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    formatter: function(value) {    //data를 그래프 위에 보여주기 위한 formatter
                        return value + '℃';
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: 4,
                    padding: {
                        top: 4,
                        bottom: 4,
                        left: 8,
                        right: 8
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: 'black',
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    border: {
                        display: false
                    },
                },
                y: {
                    display: false,
                }
            },
            elements: {
                line: { tension: 0.4 }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 40,
                    bottom: 10
                }
            }
        }
    });
}