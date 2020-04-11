const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'cliente',
  {
    id_cliente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tx_cliente: {
      type: Sequelize.STRING
    },
    id_tipo_cliente: {
      type: Sequelize.INTEGER
    },
    observaciones: {
      type: Sequelize.STRING
    },
    fecha_alta: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    id_usuario: {
      type: Sequelize.INTEGER
    },    
    baja: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, 
  {
    timestamps: false
  }
)
