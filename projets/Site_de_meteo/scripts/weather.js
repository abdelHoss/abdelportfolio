$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('.alert').alert();
});


var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('weatherController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
    
    var activeClock = function () {
        $scope.fullDate = Date.now();
  
    }


    
    $scope.cityInput = '';
    $interval(activeClock, 1000);
  
    $scope.reset = function() {
                $scope.cityInput = '';
                $scope.isEmpty = false;
                $scope.showAlert = false;
                $('.city_name').text("");
                $('.city_temp').text("");
                $('.city_feels_like').text("");
                $('.city_des').text("");
                $('.city_hum').text("");
                $('#app-bg').css('background-image', 'url("images/cloud-bg.jpg")');
            }


    $(document).keyup(function (event) {

        // Declaration of variables for the API

        let city = $('.the-input').val();
        let url_base = "https://api.openweathermap.org/data/2.5/";
        let api = "219ce5d87bc65a79e74dab5eecd270a8";

        if (event.which === 13) {
            
            switch(city) {
                case '':
                    $scope.isEmpty = true;
                    break;

                    default:
                    $scope.isEmpty = false;

            
            $('.temp_info > ul > li').css('opacity', 0);
            $.getJSON(`${url_base}weather?q=${city}&units=metric&APPID=${api}`, (data) => {
              
                let temp = Math.round(data.main.temp);
                let feels_like = Math.round(data.main.feels_like);

                $('.city_name').text(`${data.name}, ${data.sys.country}`);
                $('.city_temp').text(`${temp}°c`);
                $('.city_feels_like').text(`${feels_like}°c`);
                $('.city_des').text(data.weather[0].description);
                $('.city_hum').text(`${data.main.humidity}%`);
                let imgUrl = '';
                if (temp >= 20) {
                     imgUrl = 'url("./images/hot-weather-bg.jpg")';
                } else if (temp < 20 && temp > 0) {
                    imgUrl =  'url("./images/automn-weather-bg.jpg")';
                } else {
                    imgUrl =  'url("./images/cold-weather-bg.jpg")'
                }
                $('#app-bg').css('background-image', imgUrl);
                
                
                $(document).ready(function () {
                    $('.temp_info > ul > li').animate({
                        'opacity': 1,
                    });
                });
                $scope.showAlert = false;
            }).fail(() => {
                $scope.showAlert = true;
                    $timeout(function () {
                        $scope.showAlert = false;
                    }, 6000);

            })
        }
        }
    });


}]);