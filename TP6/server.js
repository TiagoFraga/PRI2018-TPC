var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var {parse} = require('querystring')
var jsonfile = require('jsonfile')
 
var myBD = "teses.json"
 
var myServer = http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)
    var query = purl.query
 
    console.log('Recebi o pedido: ' + req.url)
    console.log('Método: ' + req.method)
   
    if(req.method == 'GET'){
        if(purl.pathname == '/'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(pug.renderFile('index.pug'))
            res.end()
        }
        else if(purl.pathname == '/uminho.png'){
            res.writeHead(200, {'Content-Type': 'image/png'})
            fs.readFile('uminho.png',(erro,dados)=>{
                if(!erro){
                    res.write(dados)
                }
                else{
                    res.write(pug.renderFile('erro.pug',{e: erro}))
                }
                res.end()
            }) 
        }
        else if(purl.pathname == '/registo'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(pug.renderFile('registo.pug'))
            res.end()
        }
        else if (purl.pathname == '/lista'){
            jsonfile.readFile(myBD,(erro,teses)=>{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                if(!erro){
                    res.write(pug.renderFile('lista.pug',{lista: teses}))
                }else{
                    res.write(pug.renderFile('erro.pug',{e: erro}))
                }
                res.end()
            })
        }
        else if(purl.pathname == '/processaForm'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(pug.renderFile('processaForm.pug',{tese: query}))
            res.end()
        }
        else if(purl.pathname == '/w3.css'){
            res.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('estilo/w3.css',(erro,dados)=>{
                if(!erro){
                    res.write(dados)
                }
                else{
                    res.write(pug.renderFile('erro.pug',{e: erro}))
                }
                res.end()
            })
        }
        else{
            res.writeHead(501, {'Content-Type': 'text/html;charset=utf-8'})
            res.end('Erro: ' + purl.pathname + ' não está implementado...')
        }
    }
    else{
        if(req.method == 'POST'){
            if(purl.pathname == '/processaForm'){
                recuperaInfo(req, resultado => {
                    jsonfile.readFile(myBD, (erro,teses)=>{
                        if(!erro){
                            teses.push(resultado)
                            console.dir(teses)
                            jsonfile.writeFile(myBD,teses,erro2 =>{
                                if(!erro2){
                                    console.log('Registo da TESE gravado com sucesso!!!')
                                }
                                else{
                                    console.log('Erro a registar a Tese: ' + erro2)
                                }
                            })
                        }
                        else{
                            console.log('Erro a abrir a Base de Dados: ' + erro)
                        }
                    })
                    res.end(pug.renderFile('processaForm.pug',{tese: resultado}))
                })
            }
            else{
                res.writeHead(501, {'Content-Type': 'text/html;charset=utf-8'})
                res.end('Erro: ' + purl.pathname + ' não está implementado...')
            }
        }
        else{
            res.writeHead(501, {'Content-Type': 'text/html;charset=utf-8'})
            res.end('Erro: ' + req.method + ' não suportado...')
            }
        }
})
 
myServer.listen(4006, ()=>{
    console.log('Servidor à escuta na porta 4006...')
})
 
function recuperaInfo(request, callback){
    const FORM_URLENCODED = 'application/x-www-form-urlencoded'
    if(request.headers['content-type'] === FORM_URLENCODED ){
        let body = ''
        request.on('data', chunk =>{
            body += chunk.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
    else{
        callback(null)
    }
}