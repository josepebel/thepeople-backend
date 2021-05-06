require('dotenv').config()
const express = require("express");
const app = express();
const createError = require("http-errors");
const path = require("path");
const routes = require("./src/routes/routes");
const helmet = require("helmet");
const connection = require("./src/connection");
const passport = require("passport");
const cors = require('cors');

app.use(passport.initialize())

var corsOption = {
   origin: true,
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   exposedHeaders: ['x-auth-token', 'content-type', 'X-Requested-With', 'Authorization', 'Accept', 'Origin'],
}
app.use(cors(corsOption))



app.use(helmet());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(routes);

app.use(express.static(path.join(__dirname, "./public")));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (err.status == 404) {
    res.sendFile(path.join(__dirname, "./public/404.html"));
  } else {
    res.json({
      status: err.status,
      error: err.message,
    });
  }
});

connection
  .then(() => {
    console.log("Conectado a la base de datos...");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Servidor iniciado");
    });
  })
  .catch(function (err) {
    console.log(`Error al conectar a la base de datos: ${err}`);
  });
