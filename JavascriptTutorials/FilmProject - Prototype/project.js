const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clearFilmsElement = document.getElementById("clear-films");

const ui = new UI();
const storage = new Storage();

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
      ui.showAlert("danger","Please fill blanks...")
    } else {
        const newFilm = new Film(title, director, url);
        ui.addFilmToUI(newFilm);
        storage.setFilmFromStorage(newFilm);
        ui.showAlert("info","Film Added..")
    }

    ui.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}

function loadToDosUI() {
    let films = storage.getFilmFromStorage();
    for (film of films) {
        ui.addFilmToUI(film);
    }
}

function deleteFilm(e)
{
    if(e.target.id === "delete-film")
    {
      storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      e.target.parentElement.parentElement.remove();
      ui.showAlert("info","Film deleted")
    }
}

function clearAllFilms(e)
{
    if(confirm("Are you sure that?"))
    {
        ui.clearAllFilmsFromUI();
        storage.clearFilmsFromStorage();
        ui.showAlert("info","Films deleted...")
    }
}