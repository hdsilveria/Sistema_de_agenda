const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()
const Sequelize = require('sequelize')
const { where } = require('sequelize')
const { Op } = require("sequelize");

const mysql2 = require('mysql2')


//configurar o bodyparser
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

//tamplate engine
app.engine("handlebars", handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//arquivos estaticos de imagens, css e jv para front-end
app.use('/css',express.static('css'))
app.use('/js',express.static('js'))
app.use('/img',express.static('img'))


//rotas

app.get("/", function(req, res){
    res.render('login')})


 //conexão com o banco

 app.post("/logar", function(req, res){

    if ( !req.body.nome || !req.body.senha || req.body.senha == null || req.body.nome == null || req.body.nome !== "root" || req.body.senha !== "duarte2016" ){ res.render('login')}

    else{
    const sequelize = new Sequelize('sistema_agendamento', req.body.nome, req.body.senha, {
        host: 'mysqlserver.cduggwjhuwst.us-east-2.rds.amazonaws.com',
        dialect: 'mysql',
        PORT: 3306
      })
      

      sequelize.authenticate().then(function(){console.log("Conexão com sucesso!")}).catch(function(req, res){ res.render('login'), console.log("Conexão com erro" + err)});

      const clientes = sequelize.define('clientes',{
        cliente: { type: Sequelize.STRING(25), notNull: true},
        horario: { type: Sequelize.STRING(40), notNull: true},
        procedimento: { type: Sequelize.STRING(40), notNull: true},
        data: { type: Sequelize.STRING}
    })

    

    clientes.sync();

    res.render('inserir')
    
    app.post("/criar", function(req, res){
        clientes.create({
            cliente: req.body.cliente,
            horario: req.body.horario,
            data: req.body.data,
            procedimento: req.body.procedimento
        }).then(function(){console.log("Sucesso no cadastramento"), res.render('inserir')}).catch(function(err){console.log("erro" + err), res.render('inserir')})
    })


    app.post("/listar", function(req, res){

        clientes.findAll({ order: [['data','DESC'],['horario','ASC']], where: { data: {[Op.between]:[ req.body.filtro1, req.body.filtro2 ]}}}).then(function(horarios){ 
          res.render('horarios', {horarios: horarios})
            
        })})
    

    app.get('/agenda', function(req,res){
        res.render('inserir')
    })

    app.get("/deletar/:id", function(req, res){
        clientes.destroy({
            where: { id: req.params.id }})
        })

    app.get('/sair', function(req, res ) {
     sequelize.close().then(function(){
         console.log("Deslogado com sucesso"), res.redirect('/'), process.exit(1) }).catch(function(err){ console.log("Erro " + err)})
    })


    app.get('/clientes', function(req, res ) {
        res.render('clientes')
       })


}})


//start do servidor
const PORT = process.env.PORT || 8085
app.listen(PORT, function(req, res){
    console.log("Servidor em produção")
})