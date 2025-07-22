import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app =express()
const port = 3000

app.use(express.json())

app.use(express.static(__dirname + "/"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/views/index.html")
});
app.get("/informacion",function(req,res){
    res.sendFile(__dirname + "/informacion.html")
});
app.get("/compra",function(req,res){
    res.sendFile(__dirname + "/compra.html")
});

app.listen(port,function(){
    console.log('Servidor corriendo en el puerto 3000')
})