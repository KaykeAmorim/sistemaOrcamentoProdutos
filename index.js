const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const express = require('express')
const port = 8080

const Pedidos = require('./database/Pedidos')
const req = require('express/lib/request')
const { where } = require('sequelize')
const { render } = require('express/lib/response')

const app = express()

connection.authenticate()
    .then(()=>{
        console.log('Conexão estabelecida com sucesso !')
    })
    .catch((err)=>{
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('sistemaOrcamentoProdutos'))
app.use('/js',express.static('js'))
app.use('/imagens',express.static('imagens'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => console.log("Servidor online!"))

app.get('/novoOrcamento',function(req,res){
    res.render('orcamento')
})

app.post('/enviarOrcamento',function(req,res){
    const document = req.body.orcamento
    const cliente = req.body.cliente
    console.log(cliente)
    Pedidos.create({
        cliente: cliente,
        orcamento: document,
        status: false
    }).then(()=>{
        res.redirect('/novoOrcamento')
    })
})

app.get('/pedidos',function(req,res){
    Pedidos.findAll({
        raw:true,
        attributes: ['id','cliente'],
        where:{
            status:false
        }
    }).then((result)=>{
        res.render('pedidos',{pedidos:result})
    })
})

app.get('/pedido/:ID',function(req,res){
    Pedidos.findAll({
        raw:true,
        attributes:['id','orcamento','cliente'],
        where:{
            id: req.params.ID
        }
    }).then((result)=>{ 
        res.render('pedido',{pedido:result[0]})
    })
})

app.post('/alterarOrcamento/:ID', function(req,res){
    const document = req.body.orcamento
    const ID = req.params.ID
    Pedidos.update(
        {orcamento: document},
        {where:{
            id: ID
        }}
    ).then(()=>{
        res.redirect('/pedidos')
    })
})

app.get('/finalizarPedido/:ID',function(req,res) {
    const ID = req.params.ID

    Pedidos.update({status:true},{where:{id:ID}}).then(()=>{
        res.redirect(`/pedidos`)
    })
})

app.get('/cancelarPedido/:ID',function(req,res){
    const ID = req.params.ID
    Pedidos.destroy({
        where:{id:ID}
    }).then(()=>{
        res.redirect(`/pedidos`)
    })
})

app.get('/pedidosFinalizados', function(req,res){
    Pedidos.findAll({
        raw:true,
        attributes: ['id','cliente'],
        where:{
            status:true
        }
    }).then((result)=>{
        res.render('pedidos',{pedidos:result})
    })
})