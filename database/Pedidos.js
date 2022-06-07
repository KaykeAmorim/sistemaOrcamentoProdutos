const Sequelize = require('sequelize')
const connection = require('./database')

const Pedidos = connection.define('Pedidos',{
    id:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cliente:{
        type: Sequelize.STRING,
        allowNull: false
    },
    orcamento:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
    },
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Pedidos.sync({force: false}).then()

module.exports = Pedidos;