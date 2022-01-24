const express = require("express");
const dotenv = require("dotenv"); //env dosyalarini okumak icin
const connectDatabase = require('./helpers/database/connectDatabase');
const app = express();
dotenv.config({ path: "./config/env/config.env" });
const port = process.env.PORT;
const routers = require("./routers/index");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path"); // express icersinde mevcuttur bu paket, path ile ilgili islem yapmak isternirse kullanilir


app.use(express.json()); //req.body kullanabilmemiz icin bu middleware ekliyoruz


//Routers Middleware
app.use("/api", routers);

app.use(express.static(path.join(__dirname,"public"))); //Express de static dosyalarimizi onlara erismek icin tanitmamiz gerekiyor. Örnegin yüklenen bir fotoya bu sekilde erisebiliriz

app.use(customErrorHandler);
connectDatabase();

app.listen(port, () => {
    console.log(`App started on ${port} : ${process.env.NODE_ENV}`);
});

