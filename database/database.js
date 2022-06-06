const Sequelize = require('sequelize')

const connection = new Sequelize('maderguil','kayke','K310104+a',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection