class Storage {
    static getFilmFromStorage() {
        let todos = (localStorage.getItem("films") !== null) ? JSON.parse(localStorage.getItem("films")) : [];
        return todos;
    };

    static setFilmFromStorage(newFilm) {
        let films = this.getFilmFromStorage();
        films.push(newFilm);
        localStorage.setItem("films", JSON.stringify(films));
    };

    static deleteFilmFromStorage(deleteFilmTitle) {
        let films = this.getFilmFromStorage();
        films.forEach(function (film, index) {
            if (film.title === deleteFilmTitle) films.splice(index, 1);
        });

        localStorage.setItem("films", JSON.stringify(films));

    };

    static clearFilmsFromStorage() {
        localStorage.removeItem("films");
    };

}






