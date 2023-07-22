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
        return res.redirect("/autenticacao");
    }
}
// --------------------------------------------------------------------------
router.get("/", (req, res) => {  
    try {
        res.status(200).render("edsonbarber-index")
    } catch (error) {
        res.status(500).json({message: `Erro ao acessar a página: ${error}`})
    }    
});

router.get('/horarios/:data/:barbeiro', agenda.exibirHorariosAgendados);

router.post("/", agenda.agendar)

router.get("/agendado", (req, res) => {
    try {
        res.status(200).sendFile(__dirname + "/views/edsonbarber-agendado.html")
    } catch (error) {
        res.status(500).json({message: `Erro ao acessar a página: ${error}`})
    }    
})

// --------------------------------------------------------------------------

router.get("/autenticacao", (req, res) => {
    res.render("edsonbarber-senha");
});

router.post("/agenda", (req, res) => {
    try {
        const senha = req.body.senha;
        if (senha === "81431840") {
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
    try {
        res.status(200).render("edsonbarber-agenda");
    } catch (error) {
        res.status(500).json({message: `Erro ao acessar a página: ${error}`})
    }
    
});

router.post("/agenda-horarios", autenticacao, agenda.getAll);

router.get("/agenda-horarios", autenticacao, (req, res) => {
    res.status(200).redirect('/agenda')
});

router.get('/agenda/:id', (req, res) => {
    try {
        res.status(200).redirect('/agenda-horarios');
    } catch (error) {
        res.status(500).json({message: `Erro ao acessar os horários, erro: ${error}`});
    }
})

router.delete("/agenda/:id", agenda.remove);



module.exports = router;