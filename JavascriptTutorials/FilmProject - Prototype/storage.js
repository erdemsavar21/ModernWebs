function Storage() {

}
Storage.prototype.getFilmFromStorage = function () {
    let todos = (localStorage.getItem("films") !== null) ? JSON.parse(localStorage.getItem("films")) : [];
    return todos;
};

Storage.prototype.setFilmFromStorage = function (newFilm) {
    let films = this.getFilmFromStorage();
    films.push(newFilm);
    localStorage.setItem("films", JSON.stringify(films));
};

Storage.prototype.deleteFilmFromStorage = function (deleteFilmTitle) {
    let films = this.getFilmFromStorage();
    films.forEach(function (film, index) {
        if (film.title === deleteFilmTitle) films.splice(index, 1);
    });

    localStorage.setItem("films", JSON.stringify(films));

};

Storage.prototype.clearFilmsFromStorage = function(){
    localStorage.removeItem("films");
};