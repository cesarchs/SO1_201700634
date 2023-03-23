//colocar el password e ip validos!

var mysql = require('mysql')


//require('dotenv').config({path:'../../../.env'})//llamo a mis variables de entorno
require('dotenv').config({path:'./.env'})//llamo a mis variables de entorno

//const puerto=process.env.PORT ||5000//indico env, puedo agregarle valor si no exite ese env con: process.env.PORT || 5000

/*
console.log("------------------------------")
console.log(process.env.IP)
console.log(process.env.PASSWORD)
console.log("------------------------------")
*/


var conn = mysql.createConnection({
    host:process.env.IP,
    user:'root',
    password:process.env.PASSWORD,
    database:'tarea',
    port:'3306'
})
conn.connect(function(err){
    if(err)throw err
    console.log("Conexion a mysql!")
    
})
module.exports = conn