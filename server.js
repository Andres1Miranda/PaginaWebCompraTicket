import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app =express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/"));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/views/index.html")
});
app.get("/informacion",function(req,res){
    res.sendFile(__dirname + "/informacion.html")
});
/*app.post("/compra",function(req,res){
    res.sendFile(__dirname + "/compra.html"),
    app.use("/compra",routers)
});



app.listen(port,function(){
    console.log('Servidor corriendo en el puerto 3000')
})*/
// Usa una función async para importar el router y arrancar el servidor
const startServer = async () => {
  const { default: routers } = await import("./src/Routers/clienteRouters.js");

  app.use("/compra", routers); // ahora sí, el router ya está disponible

  app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
  });
};

startServer();
