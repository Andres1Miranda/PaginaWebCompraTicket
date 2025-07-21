const clienteControllers = require("../Controllers/clienteControllers");
const express = require("express")
const routers = express.Router();

routers.get("/",clienteControllers.getCliente)
routers.get("/:id",clienteControllers.getClienteID)
routers.post("/",clienteControllers.postCliente)
routers.delete("/:id",clienteControllers.deleteCliente)

module.exports=routers