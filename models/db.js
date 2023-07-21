const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("teste_agendabarber", "root", "B@ss10051997456456", {    
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