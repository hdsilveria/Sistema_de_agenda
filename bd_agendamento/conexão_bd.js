const Sequelize = require('sequelize')


const sequelize = new Sequelize("Agendamento", "root", "root123", {
    host: 'localhost',
    dialect: 'mysql',
    PORT: 3306
  })


sequelize.authenticate()
  .then(() => {
      console.log("Conexão com sucesso!")
  })

  .catch((req, res) => { 
      console.log("Conexão com erro" + err)
  })

module.exports = sequelize;

