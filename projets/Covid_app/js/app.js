

 covidApp.controller('covidController', ['$scope', '$http', '$templateCache',
     function ($scope, $http, $templateCache) {
         $scope.countryTab = [];

         $scope.showList = (num) => {
            let sent = $(`.learn-p:eq(${num})`).text(); 
            if(sent == ' Click here to learn more') {
                $(`.learn-p:eq(${num})`).text('Reduce this');
            }
            else {
                $(`.learn-p:eq(${num})`).text(' Click here to learn more');

            }
            $(`.toggle-list:eq(${num})`).slideToggle('slow');
        
         }

         $scope.showLinks = () => {
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
         }
           
         $scope.scrollTop = () => {
            $('html, body').animate({
                scrollTop: $('#theHeader').offset().top
            }, 400);
        }


         $http({
             method: 'GET',
             url: 'https://corona.lmao.ninja/v2/countries?yesterday&sort',
             cache: $templateCache
         }).then((res) => {
             $scope.status = res.status;
             $scope.tabCountry = res.data;
             $scope.count = res.data.length
         })

     
     }
 ]);

