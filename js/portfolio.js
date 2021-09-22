$('.carousel').carousel();

$(document).ready(function () {
  const langage = sessionStorage.getItem("abdel_portfolio_lang");
  if (langage !== null) setLangage(langage);
  else setLangage('english');

  $('.navbar-nav li a').on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function () {});
    }
  });

  $('.dropdown .dropdown-menu a').click(function () {
    setLangage($(this).attr('hreflang'));
    sessionStorage.setItem("abdel_portfolio_lang", $(this).attr('hreflang'));
  });
});

async function getJson() {
  const getData = await $.get('https://abdelhoss.github.io/abdelportfolio/data/infos.json')
  return getData[0];
}

async function setLangage(lang) {
  const siteData = await getJson();
  setHeader(siteData[lang]);
  setBody(siteData[lang]);
  setCarrousel(siteData);
  setProjects(siteData, lang);
  setFooter(siteData[lang]);
}

function setHeader(data) {
  let index = 0;
  for (let item in data.navbar) {
    $(`.navbar-nav li a:eq(${index})`).text(data.navbar[item]);
    index++;
  }
  $('.header_subtitle').text(data.body.profession)
}

function setBody(data) {
  $('.page-section__title:eq(0)').text(data.navbar.second_link);
  $('.page-section__title:eq(1)').text(data.body.title);
  $('.page-section__title:eq(2)').text(data.projects.title);
  $('.page-section__paragraph:eq(0)').text(data.body.about);
  $('.page-section__paragraph:eq(1)').text(data.body.study);
  $('.page-section__paragraph:eq(2)').text(data.projects.intro);
}

function setCarrousel(data) {
  let carrouselContent = '';
  const loop = Math.floor(data.knowledge.length / 3);
  const decimal = (data.knowledge.length / 3) - loop;
  for (let x = 0; x <= loop; x++) {
    if (x === loop && decimal > 0) carrouselContent += `<div class="item">${carrouselItems(x, data.knowledge, decimal - 0.2)}</div>`;
    else if (x < loop) {
      carrouselContent += `<div class="item${x === 0 ? ' active' : '' }">${carrouselItems(x, data.knowledge, false)}</div>`;
    }

  }
  $('#theCarousel .carousel-inner').html(carrouselContent);
}

function carrouselItems(index, data, decimal) {
  let itemContent = '';
  let maxNumber = decimal ? (index * 3) + Math.ceil(decimal * 3) : (index * 3) + 3;
  for (let y = index * 3; y < maxNumber; y++) {
    itemContent += `<div class="col-md-4">
    <div class="thumbnail text-center">
        <img class="skill-image" src="images/skills/${data[y].image}" alt="${data[y].technology}">
        <h4 class="skill__single-part__title">${data[y].technology}</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar"
                style="background-color: ${data[y].color};">
            </div>
        </div>
    </div>
  </div>`
  }
  return itemContent;
}


function setProjects(data, langage) {
  let ProjectsContent = '';
  data.projects_infos.map((item, index) => {
    const technologies = item.technology.replace('++', data[langage].conjunction);
    ProjectsContent += `<div class="col-md-4">
        <div class="portfolio__single-section mix category-a category-b category-c" data-order="${index + 1}">
            <img class="portfolio__single-section__image img-responsive"
                src="images/projects/${item.image}" alt="${data[langage].projects.list[index]}">
            <div class="portfolio__single-section__overlay">
                <div class="overlay-content">
                    <h4>${data[langage].projects.list[index]}</h4>
                    <p>${technologies}</p>
                </div>
                <div class="portfolio__single-section__search-icon">
                    <a href="${item.src}"><img src="images/search-icon.png"
                            alt="Search Icon"></a>
                </div>
            </div>
        </div>
    </div>`;
    if (index === data.projects_infos.length - 1) {
      ProjectsContent += `<div class="col-md-4">
      <div class="portfolio__single-section mix category-b category-d" data-order="${data.projects_infos.length}">
          <img class="portfolio__single-section__image img-responsive"
              src="images/projects/developper_card.jpg" alt="">
          <div class="portfolio__single-section__overlay">
              <div class="overlay-content">
                  <h4>${data[langage].projects.list[data.projects_infos.length]}</h4>
              </div>
              <div class="portfolio__single-section__search-icon">
                  <a href="#"><img src="images/search-icon.png" alt="Search Icon"></a>
              </div>
          </div>
      </div>
  </div>`
    }
  });
  $('#portfolio .projects').html(ProjectsContent);
}

function setFooter(data) {
  $('.footer__title').text(data.navbar.third_link);
  $('.footer__paragraph').text(`${new Date().getFullYear()} ${data.footer}`);
}