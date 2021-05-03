const Sequelize = require('sequelize')
const sequelize = require("./conexão_bd")
const { where } = require('sequelize')
const { Op } = require("sequelize");

const clientes = sequelize.define('clientes',{
    cliente: { type: Sequelize.STRING(35), notNull: true},
    horario: { type: Sequelize.STRING(40), notNull: true},
    procedimento: { type: Sequelize.STRING(40), notNull: true},
    data: { type: Sequelize.STRING},
    tipo: { type: Sequelize.STRING}
  })


  module.exports = clientes;