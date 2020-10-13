/* /**
 * 
 * Arquivo:  server.js
 * Descrição: Responsável por levantar o serviço do Node para a execução da api através do Express js
 * Author: Simone Oliveira
 * Data de Criação: 08/10/2020
 * 
 */
 // Configurar Setup App:
 // Pacotes chamadas:

 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var Noticia = require('./app/models/Noticia');
 const { Router } = require('express');
 
 mongoose.Promise = global.Promise;

 //mongoose.connect('mongodb://localhost/node-crud-api', {useNewUrlParser: true, useUnifiedTopology: true});

 mongoose.connect('mongodb+srv://desafio:desafio@node-crud-api.fsk6k.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// Configuração variável app para utilizar o 'body-parser()':
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

// Definição porta api:
 var port = process.env.port || 8000;

 // Criação instância Rootas Express:
 var router = express.Router();

// Rota Exenmplo:

router.use(function(req,res,next) {
    console.log('Ocorreu algum problema. Favor contactar o administrador');
    next();
 });  

 router.get('/', function(req,res) {
     res.json({message: 'Sucesso! Seja bem vindo(a)'})
 });

// Rota API'S:
// GET ALL & POST
router.route('/noticias')

// Criar Noticia POST: (http://localhost:8000/api/noticias)
.post(function(req,res){
    var noticia = new Noticia();

    // Campos da Noticia
    noticia.titulo = req.body.titulo;
    noticia.conteudo = req.body.conteudo;
    noticia.data_Publicacao = req.body.data_Publicacao;
    
    noticia.save(function(error) {
        if (error)
            res.send('Erro ao tentar salvar a Noticia...: ' + error);

        res.json({message: 'Noticia cadastrada com sucesso'});
    });
})

// Selecionar Todas as Noticia (POST: (http://localhost:8000/api/noticias)
.get(function(req,res) {
    Noticia.find(function(error, noticias){
    if (error)
        res.send('Erro ao tentar selecionar todas as Noticias...: ' + error);

        res.json({noticias});      

    });
});

 // Terminadas em 'noticias/:noticias_id' (GET, PU & DELETE)
 router.route('/noticias/:noticia_id')

    // Selecionar Por ID (GET: (http://localhost:8000/api/noticias/:noticia_id)
    .get(function(req,res){

        Noticia.findById(req.params.noticia_id, function(error, noticia){
            if (error)
             res.send('Id da Noticia não encontrado ' + error);

            res.json({noticia});  
        });
    })

    // Atualizar Por ID (PUT: (http://localhost:8000/api/noticias/:noticia_id)
    .put(function(req,res){
        Noticia.findById(req.params.noticia_id, function(error, noticia){
            if (error)
             res.send('Id da Noticia não encontrado ' + error);

            noticia.titulo = req.body.titulo;
            noticia.conteudo = req.body.conteudo;
            noticia.data_Publicacao = req.body.data_Publicacao;

            noticia.save(function(error){
             if (error)
                res.send('Erro ao atualizar a Noticia ' + error);    
                
            res.json({message: 'Noticia atualizada com sucesso'});   
            });
        });
    })

    // Excluir Por ID (PUT: (http://localhost:8000/api/noticias/:noticia_id)
    .delete(function(req,res){
        Noticia.remove({
            _id: req.params.noticia_id
            },function(error) {
              if (error)
                res.send('Id da Noticia não encontrado ' + error);

                res.json({message: 'Noticia excluída com sucesso'});            
            });
        })


 // Padrão Rotas:
 app.use('/api', router);

// Iniciando a Aplicação(servidor):
 app.listen(port);
 console.log("Iniciando App na porta " + port);
 