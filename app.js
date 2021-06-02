const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()


const sequelize = require("./bd_agendamento/conexão_bd")
const clientes = require("./bd_agendamento/horarios")
const lista_clientes = require("./bd_agendamento/lista")
const { where } = require('sequelize')
const { Op } = require("sequelize");


app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())


app.engine("handlebars", handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')


app.use('/css',express.static('css'))
app.use('/img',express.static('img'))


 app.get("/", (req, res) => {
    res.render('inserir')
})


app.get("/listar", (req, res) => {

    if ( !req.body.filtro1 && !req.body.filtro2 ){
        clientes.findAll().then((horarios) => {
            console.log("Pesquisou todos!")
            res.render('horarios', {horarios: horarios}) })
    }

    else {
        clientes.findAll({ order: [['data','DESC'],['horario','ASC']], where: 
        { data: {[Op.between]: [ req.body.filtro1, req.body.filtro2 ]} } })
            .then((horarios) => { 
                res.render('horarios', {horarios: horarios}) })
    }
})



app.get('/clientes', (req, res) => {
    lista_clientes.findAll().then((clientes) => { 
        res.render('clientes', {clientes: clientes}) })
})
       


app.post("/add-clientes", (req, res) => {
    lista_clientes.create({
        cliente: req.body.listacliente,
        contato: req.body.listacontato,
        aniversario: req.body.listaaniversario,
        outro: req.body.listaoutros})
        
    .then(() => {
        console.log("Sucesso no cadastramento"), 
        res.redirect('/clientes')})

    .catch((err) => {
        console.log("erro" + err), 
        res.redirect('/clientes')})
})

    

app.post("/criar_horario", (req, res) => {
    clientes.create({
        cliente: req.body.cliente,
        horario: req.body.horario,
        data: req.body.data,
        procedimento: req.body.procedimento,
        tipo: req.body.manuaplica})
        
        .then(() => {
            console.log("Sucesso no cadastramento"), 
            res.render('inserir')})
            
        .catch((err) => {
            console.log("erro" + err), 
            res.render('inserir')})
})



app.get("/deletarcliente/:id", (req, res) => {
        lista_clientes.destroy({
            where: { id: req.params.id }})
        .then(() => { 
            res.redirect('/clientes') })
})


app.get("/deletar/:id", (req, res) => {
    clientes.destroy({
        where: { id: req.params.id }}).then(() => { 
        res.redirect('/listar')  })
})
       

app.listen(8080, (req, res) => {
    console.log("Servidor em produção - http://localhost:8080/ ")
})