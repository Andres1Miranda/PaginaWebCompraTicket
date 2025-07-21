const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost", user: "root", database: "webboleto", port:3306, password:""})

db.connect(function(err){
    if(err){
        console.log("Fallo la conexion")
    }else{
        console.log("conectado exitosamente")
    }
})

module.exports = db