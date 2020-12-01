covidApp.controller('mapController', ['$scope', '$http', '$templateCache', function ($scope, $http, $templateCache) {

    $scope.worldNum = 0;
    $scope.infoCont = [];

    $('.modal-bg').add('.close-circle').on('click',() => {
        $('.circle-modal').removeClass('.slide-down');
        $('.circle-modal').addClass('swipe-up');
        $('.modal-bg').hide();
    })

    const continentsName = ['Asia', 'North America', 'South America', 'Europe', 'Africa', 'Oceania'];
    let color = '';
    const coord = [{
            cx: 700,
            cy: 140
        },
        {
            cx: 260,
            cy: 150
        },
        {
            cx: 350,
            cy: 300
        },
        {
            cx: 530,
            cy: 120
        },
        {
            cx: 520,
            cy: 240
        },
        {
            cx: 770,
            cy: 310
        }


    ]

    const svg = d3.select('svg');

    const projection = d3.geoCylindricalStereographic()
    const pathGenerator = d3.geoPath().projection(projection);

    g = svg.append('g');

    g.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({
            type: 'Sphere'
        }));

    const naData = svg.selectAll('circle').data([null]);

    d3.json('https://abdelhoss.github.io/abdelportfolio/projets/Covid_app/data/world-continents.json')
        .then((data, error) => {
            if (error) console.log(error);
            const continent = topojson.feature(data, data.objects.continent);

            g.selectAll('.continent').data(continent.features)
                .enter().append('path')
                .attr('class', 'continent')
                .attr('d', pathGenerator)
                .each(function (d, i) {
                    if (i == 0) {
                        for (let specs of coord) {
                            let index = coord.indexOf(specs);
                            naData.enter()
                                .append('circle')
                                .attr('r', '40')
                                .attr('cx', coord[index].cx)
                                .attr('cy', coord[index].cy)
                                .attr('class', 'data-circle');
                            let width = coord[index].cx - 45;
                            if (index === 0 || index === 3 || index === 4 || index === 5) {
                                width = coord[index].cx - 25;
                            }
                            naData.enter().append('text')
                                .text(continentsName[index])
                                .attr('x', width)
                                .attr('y', coord[index].cy)
                                .attr('class', 'circleText')
                        }
                    }
                    $http({
                            method: 'GET',
                            url: 'https://corona.lmao.ninja/v2/continents?yesterday=true&sort',
                            cache: $templateCache
                        })
                        .then((res) => {

                            data = res['data'][i]
                            $scope.worldNum += data.cases;
                            $scope.infoCont.push(data.cases * 100 / data.population);

                            $(this).add(`.data-circle:eq(${i})`).add(`.circleText:eq(${i})`).on('click', () => {
                                $('.data-span:eq(0)').text(continentsName[i]);
                                $('.data-span:eq(1)').text(res['data'][i].cases);
                                $('.data-span:eq(2)').text(res['data'][i].todayCases);
                                $('.data-span:eq(3)').text(res['data'][i].deaths);
                                $('.data-span:eq(4)').text(res['data'][i].todayDeaths);
                                $('.data-span:eq(5)').text(res['data'][i].recovered);
                                $('.data-span:eq(6)').text(res['data'][i].todayRecovered);
                                $('.circle-modal').removeClass('swipe-up');
                                $('.circle-modal').addClass('slide-down');
                                $('.modal-bg').show();
                                $('.circle-modal').show();
                            })

                            if ($scope.infoCont[i] >= 0 && $scope.infoCont[i] < 0.5) {
                                color = '#f79292'
                            } else if ($scope.infoCont[i] >= 0.5 && $scope.infoCont[i] < 1) {
                                color = '#ff7a7a'
                            } else if ($scope.infoCont[i] >= 1 && $scope.infoCont[i] < 1.5) {
                                color = '#f75e5e'
                            } else if ($scope.infoCont[i] >= 1.5 && $scope.infoCont[i] < 2) {
                                color = '#f33b3b'
                            } else {
                                color = '#ee2424'
                            }

                            $(this).css('fill', color);

                            if (i == 5) {
                                let worldCases = $scope.worldNum.toString();
                                let worldStr = '';
                                for (let x = 1; x <= worldCases.length + 1; x++) {
                                    if (x % 3 === 0) {
                                        worldStr += ' ';
                                    }
                                    worldStr += worldCases.charAt(x - 1);
                                }
                                $('.world-num').text(worldStr);
                            }
                        })

            
                })

        });

}])