/**
 * 
 * Arquivo:  noticia.js
 * Author: Simone Oliveira
 * Descrição: Modelo da classe Noticia
 * Data de Criação: 08/10/2020
 * 
 */
   var mongoose = require('mongoose');
   var Schema = mongoose.Schema;

 /**
  * Noticia:
  * 
  * -> Id: int
  * -> Titulo: String
  * -> Conteudo: String
  * -> Data_Publicacao; Date 
  * 
  */

  var NoticiaSchema = new Schema({
    titulo: String,
    conteudo: String,
    data_Publicacao: Date

  })

  module.exports = mongoose.model('Noticia', NoticiaSchema);
