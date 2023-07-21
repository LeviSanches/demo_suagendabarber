const db = require("./db");

const agenda = db.sequelize.define("agenda", {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(30),
        allowNull: false
    },
    telefone: {
        type: db.Sequelize.STRING(20),
        allowNull: false
    },
    barbeiro: {
        type: db.Sequelize.STRING(30),
        allowNull: false
    },
    servico: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    },
    data: {
        type: db.Sequelize.DATEONLY(30),
        allowNull: false
    },
    hora: {
        type: db.Sequelize.STRING(5),
        allowNull: false
    }
})


module.exports = agenda;
