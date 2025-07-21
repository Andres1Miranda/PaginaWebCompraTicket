const clientesRouters = require("./src/Routers/clienteRouters")
const express = require("express")
const app =express()

const port = 3000

app.use(express.json())

app.use("/api/comprab",clientesRouters)

app.listen(port,function(){
    console.log('Servidor corriendo')
})