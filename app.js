const express = require("express");
const app = express();
const router = require('./router');
const handlebars = require("express-handlebars");
const agenda = require("./models/Agenda");
const agendaController = require('./controller/agendaController');
const axios = require("axios");
const port = process.env.PORT || 4003;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(router);
app.use(express.static("public"));
app.engine("handlebars", handlebars({defaultLayout: "principal"}));
app.set("view engine", "handlebars");





//realiza um agendamento


app.listen(port, () => {
  console.log("Servidor rodando na porta: " + port )
});
