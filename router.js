const express = require('express');
const router = express.Router();
const session = require("express-session")
const agenda = require('./controller/agendaController');

router.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

function autenticacao(req, res, next) {
    if (req.session && req.session.autenticado) {
        return next();
    } else {
        return res.redirect("/edsonbarber-senha");
    }
}

app.get("/edsonbarber-senha", (req, res) => {
    res.render("edsonbarber-senha");
  });
  
//rota da agenda
app.post("/agenda", (req, res) => {
    try {
        const senha = req.body.senha;
        if (senha === "123") {
            req.session.autenticado = true;
            res.status(200).json({ sucess: true });    
        } else {
            res.status(500).json({ sucess: false });
        }
    } catch (error) {
        res.status(500).json({message: `Erro ao autenticar: ${error}`});
    }    
});

router.get("/agenda", autenticacao, (req, res) => {
    res.status(200).render("edsonbarber-agenda");
});
router.post("/agenda/horarios", autenticacao, agenda.getAll);
router.delete("/agenda/horarios/:id", autenticacao, agenda.remove);



module.exports = router;