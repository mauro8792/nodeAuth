const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const port = 3000
require('dotenv').config()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
});
const routes = require( '../routes/routes.js' )
const morgan = require('morgan')
const bodyParser = require('body-parser');
const aplicacion = express.static(__dirname + '/public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(aplicacion);

app.use(morgan("dev"));
routes(app);

app.get("*", (req, res) =>
  res.status(400).send({
    message: "No se encuentra el recurso"
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));