function UI() {

}
UI.prototype.addFilmToUI = function (newFilm) {
    const filmList = document.getElementById("films");
    filmList.innerHTML += `
    <tr>
        <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
        <td>${newFilm.title}</td>
        <td>${newFilm.director}</td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
    </tr>
    `;
};

UI.prototype.clearInputs = function (element1, element2, element3) {
    element1.value = "";
    element2.value = "";
    element3.value = "";
};

UI.prototype.showAlert = function (type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.querySelector(".card-header").appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);
};

UI.prototype.clearAllFilmsFromUI = function () {
    const filmBody = document.getElementById("films");
    while (filmBody.firstChild != null) {
        filmBody.removeChild(filmBody.firstChild);
    }
}
