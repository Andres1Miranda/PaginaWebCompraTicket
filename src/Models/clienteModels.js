const db = require("../Config/database")

class cliente {
    getCliente(callback){
        let sql = "SELECT * FROM cliente"
        db.query(sql,callback)
    }

    getClienteID(id,callback){
        let sql = "SELECT * FROM cliente WHERE id_cliente=?"
        db.query(sql,(id),callback)
    }

    postCliente(cedula,nombre,apellido,correo,telefono,tarjeta,cantidad,precio,callback){
        let sql = "INSERT INTO cliente(cedula,nombre,apellido,correo,telefono,tarjeta,cantidad,precio) VALUES (?,?,?,?,?,?,?,?)"
        db.query(sql,[cedula,nombre,apellido,correo,telefono,tarjeta,cantidad,precio],function(err,result){
            if(err){
                return callback(err,null)
            }
            return callback(null,result.insertId)
        })
    }
    
    deleteCliente(id,callback){
        let sql = "DELETE FROM cliente WHERE id_cliente=?"
        db.query(sql,(id),callback)
    }
}

module.exports = new cliente()