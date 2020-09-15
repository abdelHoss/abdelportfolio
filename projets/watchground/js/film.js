$('.carousel').carousel({
    interval: 6000,
    pause: "false"
  });


  function fixedBottom() {
      if(window.innerWidth <= 420) {
        let foot = document.querySelector('.footer');
        foot.style.position = 'absolute';
        foot.style.bottom = '0';
        foot.style.left = '0'; 
      }
    
  }

  function looseBottom() {
    let foot = document.querySelector('.footer');
    foot.style.position = 'static';
  }

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

var tabFilms;
async function getContent(num) {
    await getData().then(response  => {tabFilms = response});
    var theContent = "";
    var theTitle = "";
   
    for(let data of tabFilms) {
        switch(num) {
        case 0:
            looseBottom();
            theTitle = "Tous nos films";
                theContent += `<div class="col-4" style="float:left">
            <div class="card text-white carteFilm text-center pt-2 pb-2 mb-4">
                <img src="${data.image}" alt="${data.filmName}" class="card-img-top img-responsive img-fluid rounded w-50 h-50 align-self-center">
                <div class="card-body d-none d-sm-block">
                    <h5 class="card-title text-responsive">${data.filmName}</h5>
                    <h6 class="card-subtitle text-responsive  mb-2">${data.category}</h6>
                    <h6 class="card-subtitle text-responsive  mb-2">${data.year}</h6>
                    <h6 class="card-subtitle text-responsive  mb-2">${data.duration} min</h6>
                    <p class="card-text text-responsive ">${data.producer}</p>
                </div>
            </div>
        </div>`;
        break;       
        case 1:
            fixedBottom();
            if(data.category=="Action") {
                theTitle = "Les films d'action";
                theContent += `<div class="col-4" style="float:left">
            <div class="card text-white carteFilm text-center pt-2 pb-2 mb-4">
                <img src="${data.image}" alt="${data.filmName}" class="card-img-top img-responsive img-fluid rounded w-50 h-50 align-self-center">
                <div class="card-body d-none d-sm-block">
                    <h5 class="card-title text-responsive">${data.filmName}</h5>
                    <h6 class="card-subtitle text-responsive  mb-2">${data.category}</h6>
                    <h6 class="card-subtitle text-responsive  mb-2">${data.year}</h6>
                    <h6 class="card-subtitle text-responsive  mb-2">${data.duration} min</h6>
                    <p class="card-text text-responsive ">${data.producer}</p>
                </div>
            </div>
        </div>`;
            
            }
            break;
            case 2:
                fixedBottom();
                if(data.category=="Aventure") {
                    theTitle = "Les films d'aventure";
                    theContent += `<div class="col-4" style="float:left">
                <div class="card text-white carteFilm text-center pt-2 pb-2 mb-4">
                    <img src="${data.image}" alt="${data.filmName}" class="card-img-top img-responsive img-fluid rounded w-50 h-50 align-self-center">
                    <div class="card-body d-none d-sm-block">
                        <h5 class="card-title text-responsive">${data.filmName}</h5>
                        <h6 class="card-subtitle text-responsive  mb-2">${data.category}</h6>
                        <h6 class="card-subtitle text-responsive  mb-2">${data.year}</h6>
                        <h6 class="card-subtitle text-responsive  mb-2">${data.duration} min</h6>
                        <p class="card-text text-responsive ">${data.producer}</p>
                    </div>
                </div>
            </div>`;
                }
                break;
            default:
                fixedBottom();
                    if(data.category=="Comédie") {
                        theTitle = "Les films de comédie";
                        theContent += `<div class="col-4" style="float:left">
                    <div class="card text-white carteFilm text-center pt-2 pb-2 mb-4">
                        <img src="${data.image}" alt="${data.filmName}" class="card-img-top img-responsive img-fluid rounded w-50 h-50 align-self-center">
                        <div class="card-body d-none d-sm-block">
                            <h5 class="card-title text-responsive">${data.filmName}</h5>
                            <h6 class="card-subtitle text-responsive  mb-2">${data.category}</h6>
                            <h6 class="card-subtitle text-responsive  mb-2">${data.year}</h6>
                            <h6 class="card-subtitle text-responsive  mb-2">${data.duration} min</h6>
                            <p class="card-text text-responsive ">${data.producer}</p>
                        </div>
                    </div>
                </div>`;
                    
                    }
    }
            
        

        }
$('#body-content').html(theContent);
$('#derniersFilms').html(theTitle);
}
