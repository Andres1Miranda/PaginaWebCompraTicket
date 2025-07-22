const db = require("../Config/database")

class cliente {
    getCliente(callback){
        let sql = "SELECT * FROM clientes"
        db.query(sql,callback)
    }

    getClienteID(id,callback){
        let sql = "SELECT * FROM clientes WHERE id_cliente=?"
        db.query(sql,(id),callback)
    }

    postCliente(cedula,nombre,apellido,correo,telefono,tarjeta,cantidad,precio){
        let sql = "INSERT INTO clientes(cedula,nombre,apellido,correo,telefono,tarjeta,cantidad,precio) VALUES (?,?,?,?,?,?,?,?"
        db.query(sql,[cedula,nombre,apellido,correo,telefono,tarjeta,cantidad],function(err,result){
            if(err){
                return callback(err,null)
            }
            return callback(null,result.insertedID)
        })
    }
    
    deleteCliente(id,callback){
        let sql = "DELETE FROM clientes WHERE id_cliente=?"
        db.query(sql,(id),callback)
    }
}

module.exports = new cliente()