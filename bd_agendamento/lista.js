const Sequelize = require('sequelize')
const sequelize = require("./conexão_bd")


const lista_clientes = sequelize.define('lista_clientes',{
    cliente: {type: Sequelize.STRING, notNull: true},
    contato: {type: Sequelize.STRING, notNull: true},
    aniversario: {type: Sequelize.STRING, notNull: true},
    outro: {type: Sequelize.STRING}
  })

  module.exports = lista_clientes;