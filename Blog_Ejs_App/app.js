const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const path = require('path');
const routers = require('./src/routers/index');
const customErrorHandler = require('./src/middleware/error/customErrorHandler');

const app = new express();
app.use(expressLayouts);
app.use('/',routers);
app.use(customErrorHandler);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views/')); //normalde ayni dizinde view klasörünü arar biz src icine koydugumuzdan dolayi dizini degesitirdik.
app.use('/public',express.static(path.join(__dirname,"public"))); //static doslari belirtmemiz gerekir express okuyabilmesi icin
app.use(express.static(path.join(__dirname,"public"))); //static doslari belirtmemiz gerekir express okuyabilmesi icin


app.listen(3000, () => {
    console.log("server started with 3000 port");
})
