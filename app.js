const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const contatosImportado = require('./contatos.js')

const port = process.env.PORT || 8080

const app = express();

app.use((request, response, next) => {
  /*Permite gerenciar a origem das requisições da API,
   * o (*) significa que será pública
   * caso não for, deve ser escrito o IP
   */
  response.header("Access-Control-Allow-Origin", "*");

  /*Permite gerenciar quais métodos tem liberação para a requisição*/
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  /*Ativa no cors das requisições as permissões estabelecidas*/
  app.use(cors());

  next();
})



app.get('/v1/senai/contato', cors(), async function (request, response, next) {
  let id = request.query.uf

  let statusCode
  let dadosContato = {}

  if (id == '' || id == undefined || id.length != 1 || isNaN(id)) {
    statusCode = 400
    dadosContato.message = "Não é possível processar a requisição, pois o id do contato não foi informado ou não atende a quantidade de caracteres (1)."
  } else {
    let contatos = contatosImportado.getContato(id)
    if (contatos) {
      statusCode = 200
      dadosContato = contatos
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosContato)
})



app.get('/v1/senai/user', cors(), async function (request, response, next) {
  let id = request.query.uf

  let statusCode
  let dadosContato = {}

  if (id == '' || id == undefined || id.length != 1 || isNaN(id)) {
    statusCode = 400
    dadosContato.message = "Não é possível processar a requisição, pois o id do contato não foi informado ou não atende a quantidade de caracteres (1)."
  } else {
    let contatos = contatosImportado.getUser(id)
    if (contatos) {
      statusCode = 200
      dadosContato = contatos
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosContato)
})

app.listen(port, function () {
  console.log("Servidor aguardando requisições");
});
