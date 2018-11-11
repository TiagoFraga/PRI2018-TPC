var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')

var myBD = __dirname + "/data/ficheiros.json"
console.log('BD in: ' + __dirname + '/data')

/* GET home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/ficheiros', (req,res) => {
  jsonfile.readFile(myBD, (erro, ficheiros) => {
    if(!erro) res.render('lista', {lista: ficheiros})
    else res.json(erro)
  })
})


router.post('/ficheiros/guardar', (req,res) => {
  var form = new formidable.IncomingForm()
  form.parse(req,(erro,fields,files)=>{
    if(!erro){
      var fenviado = files.ficheiro.path
      var fnovo = __dirname + '/../public/uploaded/' + files.ficheiro.name
      fs.rename(fenviado,fnovo,(erro)=>{
        if(!erro){
          jsonfile.readFile(myBD, (erroLeitura, ficheiros) => {
            if(!erroLeitura){
              ficheiros.push({nome:files.ficheiro.name,link:fnovo,descricao: files.descricao})
              console.dir(ficheiros)
              jsonfile.writeFile(myBD, ficheiros, erroEscrita => {
                if(!erroEscrita){ 
                  console.log('Ficheiro gravado com sucesso');
                  res.json(JSON.stringify(fnovo))
                }
                else console.log('Erro: ' + erroEscrita)
              })
            }else{
              console.log('Erro: ' + erroLeitura) 
            }
          })
        }else{
          console.log('Erro: ' + erro) 
        }
      })
    }else{
      console.log('Erro: ' + erro)  
    }
  })
})



module.exports = router;
