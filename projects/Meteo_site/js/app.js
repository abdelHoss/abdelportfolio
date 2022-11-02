$(document).ready(() => {
    if(window.matchMedia("(max-width: 767px)").matches){
   $('.select-container').removeClass('select-container');
}

    const apiKey = '219ce5d87bc65a79e74dab5eecd270a8';
    const api = 'https://api.openweathermap.org/data/2.5/find?q=';
    const selector = $('#country-select');
    let city = $('#city-input');
    let country = $('#country-select');
    let background = '';
    let sunsetTime = null;
    let localTime = '';
    let timer = '';
    let alertOpen = false;
    let closeALert = '';


    for (let x = 0; x <= 99; x++) {
        $('.app-bg').prepend(`<div class="hidden-snow"></div>`);
    }

    for (let y = 0; y <= 199; y++) {
        $('.app-bg').append(`<div class="hidden-rain"></div>`);
    }

    $('.header-logo').click(() => {
        $('.app-bg').fadeOut(100, () => {
            $('.app-bg').css("background-image", "url('./images/bg/cloud-bg.jpg')").fadeIn();
            $('.city-info ul li').hide();
        });


        $('.hidden-snow').removeClass('snow-flakes');
        $('.hidden-rain').removeClass('teardrop');
        clearTimeout(closeALert);
        $('.w3-panel').fadeOut(500);
    });

    $('#country-select').focus(() => $('.select-container').addClass('select-container-down'));

    $('#country-select').focusout(() => $('.select-container').removeClass('select-container-down'));


    $('.modal-trigger').click(() => {
        $('.w3-modal').css({
            display: 'block'
        });
    });

    $('.close').click(() => {
        $('.w3-modal').css({
            display: 'none'
        });
    });

    $('.erase').click(() => {
        $('#city-input').val('')
    });

    $('.modal-trigger').mouseover(() => {
        $('.tooltip').fadeIn(500);
    });

    $('.modal-trigger').mouseout(() => {
        $('.tooltip').fadeOut(500);
    });

    $('.w3-panel span').click(() => {
        $('.w3-panel').fadeOut(500);
    })

    $('.weather-format').click(() => {
        var temp = $('.city-tempc').text();
        var feels_temp = $('.city-feels').text();
        var ico = $('.weather-format').text();
        if (ico === '℉') {
            $('.city-tempc').text(Math.round(eval(temp) * 9 / 5) + 32);
            $('.temp-ico').html('&#8457;');
            $('.feels-ico').html('&#8457;');
            $('.weather-format').html('&#8451;');
            $('.city-feels').text(Math.round(eval(feels_temp) * 9 / 5) + 32);
        } else {
            $('.city-tempc').text(Math.round((eval(temp) - 32) * 5 / 9));
            $('.temp-ico').html('&#8451;');
            $('.feels-ico').html('&#8451;');
            $('.weather-format').html('&#8457;');
            $('.city-feels').text(Math.round((eval(feels_temp) - 32) * 5 / 9));
        }
    })

    $.ajax({
            type: 'GET',
            url: 'https://abdelhoss.github.io/abdelportfolio/projects/Meteo_site/data/countries.json',
            dataType: 'json',
            success: (data) => {
                countriesTab = data;
                for (let country in data) {
                    selector.append(new Option(data[country].name, data[country].code))
                }
            }
        })
        .catch((err) => {
            console.log('Error: ' + err.message)
        });

    $(document).keyup((e) => {
        if (e.which === 13) {
            if (city.val() !== '') {
                let countrySelected = $('#country-select option:selected').text();

                const getXml = (data) => {

                    let cityName = $(data).find('city').attr('name');
                    let countryName = $(data).find('country:first').text();
                    let temp = eval(Math.round($(data).find('temperature').attr('value')));
                    let feels_like = eval(Math.round($(data).find('feels_like').attr('value')));
                    let humidity = $(data).find('humidity').attr('value');
                    let feature = $(data).find('weather').attr('value');

                    if (cityName === undefined) {
                        clearTimeout(closeALert);
                        if (countrySelected !== 'Choose country') {
                            $('.w3-panel p').text('No city named ' + city.val() + ' in ' + countrySelected + ' was found');
                            $('.w3-panel').fadeIn(500);
                        } else {
                            $('.w3-panel p').text('No city named ' + city.val() + ' was found');
                            $('.w3-panel').fadeIn(500);
                        }
                        alertOpen = true;
                    } else {
                        $('.w3-panel').fadeOut(500);

                        $('.hidden-snow').removeClass('snow-flakes');
                        $('.hidden-rain').removeClass('teardrop');

                        let long = $(data).find('coord').attr('lon');
                        let lat = $(data).find('coord').attr('lat');
                        const date = new Date();
                        let timeZn = tzlookup(lat, long);
                        let rise = date.sunrise(lat, long);
                        let set = date.sunset(lat, long);

                        let sunrise = rise.toLocaleTimeString("en-US", {
                            timeZone: timeZn
                        });
                        let sunset = set.toLocaleTimeString("en-US", {
                            timeZone: timeZn
                        });
                        localTime = date.toLocaleTimeString("en-US", {
                            timeZone: timeZn
                        });
                        let time_tab = [];
                        let tab_min = [];
                        time_tab.push(sunrise.split(':'), sunset.split(':'), localTime.split(':'));
                        if (sunrise === 'Invalid Date' || sunset === 'Invalid Date' || localTime === 'Invalid Date') {
                            sunsetTime = false;
                        } else {
                            time_tab.forEach((time, index) => {
                                if ((time[2]).slice(time[2].length - 2, time[2].length) === 'PM' && time[0] !== '12') {
                                    tab_min[index] = (eval(time[0]) + 12) * 60 + eval(time[1]);
                                } else if (time[0] === '12' && (time[2]).slice(time[2].length - 2, time[2].length) === 'AM') {
                                    tab_min[index] = eval(time[1])
                                } else {
                                    tab_min[index] = eval(time[0]) * 60 + eval(time[1]);
                                }
                            });

                            if (tab_min[2] > tab_min[0] && tab_min[2] < tab_min[1]) {
                                sunsetTime = false;
                            } else {
                                sunsetTime = true;

                            }
                        }


                        $('.city-info ul li').css('display', 'none');
                        $('.city-name').text(cityName + ', ' + countryName);
                        $('.city-tempc').text(temp);
                        $('.city-time').text(localTime);
                        $('.temp-ico').html('&#8451;');
                        $('.feels-ico').html('&#8451;');
                        $('.city-feels').text(feels_like);
                        $('.city-hum').html(humidity + '&#37;');
                        $('.city-features').text(feature);


                        if (eval(temp) >= 20) {
                            background = "url('./images/bg/summer-bg.jpg')";
                            if (sunsetTime) {
                                background = "url('./images/bg/summer-night-bg.jpg')";
                            }

                        } else if (eval(temp) < 20 && eval(temp) >= 0) {
                            background = "url('./images/bg/autumn-bg.jpg')";
                            if (sunsetTime) {
                                background = "url('./images/bg/autumn-night-bg.jpg')";
                            }
                        } else {
                            background = "url('./images/bg/winter-bg.jpg')";

                            if (sunsetTime) {
                                background = "url('./images/bg/winter-night-bg.jpg')";
                            }
                        }

                        if (sunsetTime) {

                            $('.moment-img').attr('src', './images/icon/moon.png');
                            $('.city-info ul li').css({
                                'color': '#cccccc'
                            });
                        } else {
                            $('.moment-img').attr('src', './images/icon/sun.png');
                            $('.city-info ul li').css({
                                'color': '#000'
                            });
                        }
                        $('.app-bg').fadeOut(100, () => {
                            $('.app-bg').css({'background-image': background}).fadeIn();
                            $('.city-info ul li').fadeIn(600);
                        });


                        if (feature.search('snow') !== -1) {
                            $('.hidden-snow').addClass('snow-flakes');
                        } else if (feature.search('rain') !== -1) {
                            $('.hidden-rain').addClass('teardrop');
                        }

                        const runTime = () => {
                            time = new Date().toLocaleTimeString("en-US", {
                                timeZone: timeZn
                            });
                            $('.city-time').text(time);
                        }
                        clearInterval(timer);
                        timer = setInterval(runTime, 1000)

                    }


                }


                if (countrySelected == 'Choose country') {
                    $.ajax({
                        type: 'GET',
                        url: `${api}${city.val()}&mode=xml&units=metric&appid=${apiKey}`,
                        dataType: 'xml',
                        error: () => {
                            clearTimeout(closeALert);
                            $('.w3-panel p').text('You may have an issue with your query or internet connection');
                            $('.w3-panel').fadeIn(500);
                            alertOpen = true;
                        },
                        success: (data) => {
                            getXml(data);
                        }
                    });

                } else {
                    $.ajax({
                        type: 'GET',
                        url: `${api}${city.val()},${country.val()}&mode=xml&units=metric&appid=${apiKey}`,
                        dataType: 'xml',
                        error: () => {
                            clearTimeout(closeALert);
                            $('.w3-panel p').text('You may have an issue with your query or internet connection');
                            $('.w3-panel').fadeIn(500);
                            alertOpen = true;
                        },
                        success: (data) => {
                            getXml(data);
                        }
                    })
                }

            } else {
                clearTimeout(closeALert);
                $('.w3-panel p').text('You must type in a city name before presing enter !');
                $('.w3-panel').fadeIn(500);
                alertOpen = true;

            }
            closeALert = setTimeout(() => {
                if (alertOpen) {
                    $('.w3-panel').fadeOut(500)
                }
            }, 6000);

        }
    })

})
