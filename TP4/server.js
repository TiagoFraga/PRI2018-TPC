var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'})
    var parsed_url = url.parse(req.url,true)
    
    if(parsed_url.pathname == '/obra'){
        fs.readFile('website/html/obra'+parsed_url.query.id+'.html',(erro,dados)=>{
            if(!erro)
                res.write(dados)
            else
                res.write(erro)
             res.end()   
        }) 
    }else if(parsed_url.pathname == '/index'){
        fs.readFile('website/index.html',(erro,dados)=>{
            if(!erro)
                res.write(dados)
            else
                res.write(erro)
             res.end()   
        }) 
    }
    else{
        res.end('ERRO!!!')
    }

}).listen(5000, ()=>{
    console.log('Servidor á custa na porta 5000... ')
})