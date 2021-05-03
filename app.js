const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()
const sequelize = require("./bd_agendamento/conexão_bd")
const clientes = require("./bd_agendamento/horarios")
const lista_clientes = require("./bd_agendamento/lista")


app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())


app.engine("handlebars", handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')


app.use('/css',express.static('css'))
app.use('/js',express.static('js'))
app.use('/img',express.static('img'))


 app.get("/", function(req, res){
    res.render('inserir')
})
    

app.post("/criar_horario", function(req, res){
        clientes.create({
            cliente: req.body.cliente,
            horario: req.body.horario,
            data: req.body.data,
            procedimento: req.body.procedimento,
            tipo: req.body.manuaplica
        }).then(function(){console.log("Sucesso no cadastramento"), res.render('inserir')}).catch(function(err){console.log("erro" + err), res.render('inserir')})
})


app.get("/listar", function(req, res){

    if (req.body.filtro1 && req.body.filtro2 == null || !req.body.filtro1 && !req.body.filtro2 ){
        clientes.findAll().then(function(horarios){ 
            res.render('horarios', {horarios: horarios}) })
    }

    else {

    clientes.findAll({ order: [['data','DESC'],['horario','ASC']], where: { data: {[Op.between]:[ req.body.filtro1, req.body.filtro2 ]}}}).then(function(horarios){ 
        res.render('horarios', {horarios: horarios}) }) } 
})



app.get("/deletar/:id", function(req, res){
        clientes.destroy({
        where: { id: req.params.id }}).then(function(){ 
            res.redirect('/listar')  })
})


app.get('/clientes', function(req, res){
        lista_clientes.findAll().then(function(clientes){ res.render('clientes', {clientes: clientes}) })
})
       


app.post("/add-clientes", function(req, res){
        lista_clientes.create({
            cliente: req.body.listacliente,
            contato: req.body.listacontato,
            aniversario: req.body.listaaniversario,
            outro: req.body.listaoutros
        }).then(function(){console.log("Sucesso no cadastramento"), res.redirect('/clientes')}).catch(function(err){console.log("erro" + err), res.redirect('/clientes')})
})



app.get("/deletarcliente/:id", function(req, res){
        lista_clientes.destroy({
            where: { id: req.params.id }}).then(function(){ 
            res.redirect('/clientes')  })
})
       

app.listen(8080, function(req, res){
    console.log("Servidor em produção")
})