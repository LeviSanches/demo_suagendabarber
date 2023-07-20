const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("teste_agendabarber", "root", "123123", {    
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true,
        modelName: 'agenda'
    }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}