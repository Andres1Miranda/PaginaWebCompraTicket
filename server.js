const clientesRouters = require("./src/Routers/clienteRouters")
const express = require("express")
const app =express()

const port = 3000

app.use(express.json())

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index")
})
app.listen(port,function(){
    console.log('Servidor corriendo en el puerto 3000')
})