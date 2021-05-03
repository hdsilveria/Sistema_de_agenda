const Sequelize = require('sequelize')
const { where } = require('sequelize')
const { Op } = require("sequelize");

const sequelize = new Sequelize("Agendamento", "root", "root123", {
    host: 'localhost',
    dialect: 'mysql',
    PORT: 3306
  })


sequelize.authenticate().then(function(){console.log("Conexão com sucesso!")}).catch(function(req, res){ console.log("Conexão com erro" + err)
  })

module.exports = sequelize;

