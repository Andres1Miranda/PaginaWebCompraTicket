const clienteModels = require("../Models/clienteModels");

module.exports ={
    getCliente:function(req,res){
        clientModels.getCliente((err,result)=>{
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            res.status(200).json({data:result})
        })
    },

    getClienteID:function(req,res){
        let id = req.params.id
        clienteModels.getClienteID(id,function(err,result){
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            if(result.length ===0){
                res.status(404).json=({message:"Registro no encontrado"});
                return;
            }
            res.status(200).json({data:{result}})
        })
    },

    postCliente:function(req,res){
        let cedula = req.body.cedula
        let nombre = req.body.nombre
        let apellido = req.body.apellido
        let correo = req.body.correo
        let telefono = req.body.telefono
        let tarjeta = req.body.tarjeta
        let cantidad = req.body.cantidad

        clienteModels.postCliente(cedula,nombre,apellido,correo,telefono,tarjeta,cantidad,function(err,result){
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            res.status(200).json({message:"Registo ingresado correctamente"})
        })
    },

    deleteCliente:function(req,res){
        let id = req.params.id
        clienteModels.deleteCliente(id,function(err,result){
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            res.status(200).json({message:"Registro eliminado correctamente"})
        })
    }
}