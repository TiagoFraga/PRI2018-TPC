var express = require('express')
var http = require('http')
var logger = require('morgan')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')
var jsonfile = require('jsonfile')

var myBD = "ficheiros.json"

var app = express()

app.use(logger('combined'))

app.all('*',(req,res,next)=>{
    if(req.url != '/w3.css'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    }
    next()
})


app.get('/', (req,res)=>{
	jsonfile.readFile(myBD, (erro, ficheiros)=>{
		if(!erro){
			res.write(pug.renderFile('form-ficheiro.pug', {lista: ficheiros}))
			res.end()
		}
		else{
			res.write(pug.renderFile('erro.pug', {e: "Erro: na lista da base de dados"}))
			res.end()
		}
	})
})

app.get('/w3.css',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/css'})
    fs.readFile('estilo/w3.css', (erro,dados)=>{
        if(!erro){
            res.write(dados)
        }else{
            res.write(pug.renderFile('erro.pug',{e:erro}))
        }
        res.end()
    })
})

app.post('/',(req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req,(erro,fields,files)=>{
        var fenviado = files.ficheiro.path
        var fnovo = './uploaded/'+files.ficheiro.name
        fs.rename(fenviado,fnovo,(erro)=>{
            if(!erro){
                jsonfile.readFile(myBD,(erro, ficheiros)=>{
                    if(!erro){
                        ficheiros.push({nome:files.ficheiro.name,link:fnovo,status: "Ficheiro recebido e guardado com sucesso."})
                        jsonfile.writeFile(myBD, ficheiros, erro =>{
                            if(erro){
                                console.log(erro)
                                res.write(pug.renderFile('erro.pug',{e:"Ocorreram erros na gravação do ficheiro enviado: "+erro}))
                                res.end()

                            }else{
                                console.log('Registo gravado com sucesso.')
                                jsonfile.readFile(myBD, (erro, ficheiros)=>{
                                    if(!erro){
                                        res.write(pug.renderFile('form-ficheiro.pug', {lista: ficheiros}))
                                        res.end()
                                    }
                                    else{
                                        res.write(pug.renderFile('erro.pug', {e: "Erro: na lista da base de dados"}))
                                        res.end()
                                    }
                                })
                            }
                        })
                    }
                })
            }else{
                res.write(pug.renderFile('erro.pug',{e:"Ocorreram erros na gravação do ficheiro enviado: "+erro}))
                res.end()
            }
        })
    })
})

http.createServer(app).listen(4007)