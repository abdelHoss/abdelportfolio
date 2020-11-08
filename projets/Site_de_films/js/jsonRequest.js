async function getData() {
    let url = "https://abdelhoss.github.io/abdelportfolio/projets/Site_de_films/data/films.json";
    let response = await fetch(url);
    response = await response.json();
    return response;
}
