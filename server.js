const express = require('express');
const process = require('process');
const hbs = require('hbs');
const fs = require('fs');
const { request, response } = require('express');
const server = express();


hbs.registerPartials(__dirname +'/views/partials/')

server.use(express.static(__dirname+ '/views/')); 
server.set('view engine','hbs');


server.use((request,response, next)=>{
    var now = new Date().toString();
    var log = now + request.url + request.method;
    console.log(log)
    fs.appendFile('file1.log',log +'\n',(err)=>{
        console.log("Error has been occured while appending file");
    })
    next();
})

server.use((request,response,next)=>{
    response.render('main.hbs');
    next();
})


// hbs.registerHelper('screamIt',(text)=>{
//     return text.toUpperCase();
// })


server.get('/',(request,response)=>{
   response.render('main.hbs',{
       pagetitle : "Home Page",
       welcomemessage : "Hello welcome to home page",
       currentyear : new Date().getFullYear()
   })
})

server.get('/about',(request,response)=>{
    // response.send("About Page");
    response.render('about.hbs',{
        title : "About Page",
        currentyear : new Date().getFullYear()
    });
    
})

server.get('/bad',(request,response)=>{
    response.send({
        errorMessage : 'Unable to handle request'
    });
})

server.get('/projects',(request,response)=>{
    response.render('projects.hbs',{
        message: 'Welcome to Projects Page'
    })
})


server.listen(3000,() => {
    console.log("Server has been started on port 3000");
})