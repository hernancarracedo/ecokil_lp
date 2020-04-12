const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'cliente_tipo',
  {
    id_tipo_cliente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tx_tipo_cliente: {
      type: Sequelize.STRING
    },
    baja: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NULL
    }
  }, 
  {
    timestamps: false
  }
)
