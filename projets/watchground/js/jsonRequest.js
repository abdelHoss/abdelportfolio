async function getData() {
    let url = "http://localhost/netflix/data/films.json";
    let response = await fetch(url);
    response = await response.json();
    return response;
}
