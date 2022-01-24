const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clearFilmsElement = document.getElementById("clear-films");




eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", loadToDosUI);
    cardBody.addEventListener("click",deleteFilm);
    clearFilmsElement.addEventListener("click",clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if (title === "" || director === "" || url === "") {
      UI.showAlert("danger","Please fill blanks...")
    } else {
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm);
        Storage.setFilmFromStorage(newFilm);
        UI.showAlert("info","Film Added..")
    }

    UI.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}

function loadToDosUI() {
    let films = Storage.getFilmFromStorage();
    for (film of films) {
        UI.addFilmToUI(film);
    }
}

function deleteFilm(e)
{
    if(e.target.id === "delete-film")
    {
      Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      e.target.parentElement.parentElement.remove();
      UI.showAlert("info","Film deleted")
    }
}

function clearAllFilms(e)
{
    if(confirm("Are you sure that?"))
    {
        UI.clearAllFilmsFromUI();
        Storage.clearFilmsFromStorage();
        UI.showAlert("info","Films deleted...")
    }
}