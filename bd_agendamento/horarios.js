const Sequelize = require('sequelize')
const sequelize = require("./conexão_bd")
const moment = require('moment')


const clientes = sequelize.define('clientes',{
    cliente: { type: Sequelize.STRING(35), notNull: true},
    horario: { type: Sequelize.STRING(40), notNull: true},
    procedimento: { type: Sequelize.STRING(40), notNull: true},
    data: { type: Sequelize.DATEONLY },
    tipo: { type: Sequelize.STRING}
  })

clientes.sync()


module.exports = clientes;