const express = require("express");
const req = require("express/lib/request");
const app = express();
const port = 5000;
app.use(express.json()); //req.body kullanabilmemiz icin bu middleware ekliyoruz

const users = [
    { id: 1, name: "Erdem Savar", place: "Köln" },
    { id: 2, name: "Burhan Savar", place: "Izmir" }
];

app.listen(port, () => {
    console.log("Server started");
});

app.get("/users", (req, res, next) => {
    res.json(users);
});

app.post("/users", (req, res, next) => {
    users.push(req.body);
    res.json(users);
});

app.put("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users[i] = {
                ...users[i],
                ...req.body
            }; //Body icinde gelen parametreye göre güncelleme yapar
        }

    }
    res.json(users);
});

app.delete("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users.splice(i, 1);
        }

    }
    res.json(users);
});