async function getData() {
    let url = "https://abdelhoss.github.io/abdelportfolio.github.io/projets/Sites de films/data/films.json";
    let response = await fetch(url);
    response = await response.json();
    return response;
}
