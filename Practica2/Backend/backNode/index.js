//conexion hacia mysql desde js

/*----------------------------------------ojo con cors si hubiera interfaz
npm init -y
npm i express mysql cors dotenv nodemon axios

"scripts": {
    "serve": "nodemon server.js"
  },

npm run serve
*/

var express = require('express')
const axios = require('axios');
//const { format } = require('./db')
var conn = require('./db')
var app = express()
app.use(express.json())//para que no de problemas

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

/*
require('dotenv').config({path:'./.env'})//llamo a mis variables de entorno
*/

//const puerto=process.env.PORT ||5000//indico env, puedo agregarle valor si no exite ese env con: process.env.PORT || 5000

/*
console.log("------------------------------2")
console.log(process.env.IP)
console.log(process.env.PASSWORD)
console.log("------------------------------2")
*/

app.get('/getRAM', function (req, res) {
    var query = conn.query(
        'SELECT * FROM ram;',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla/ para acceder a una columna
            if (err) throw err      //se le hace asi: result[n].columna
            
            //aqui envio a react y le digo a go que en 8000/getRAM para q guarde en mysql
            //1ero a react----------------------------------
            console.log("==========================================================================================\n")
            console.log(result[0].porcentaje)//[0].porcentaje

            //2ndo a golang---------------------------------
            console.log("#####################################################\n\n")
            axios.get('http://localhost:8000/getRAM').then(resp => { //ojo trabajr con las ips de la VMs de GCP         !!!!!!!!!
                console.log(resp.data);// en teoria ya actualice en mysql ESTO ES LO DEVOLVIDO POR GOLANG
            }).catch(function (error) {
                console.log(error);
            });

            res.send(result[0])     //no le puedo dar a porcentaje como getCPU puesto q es un int
            
        }
    )
})


app.get('/getCPU', function (req, res) {
    var query = conn.query(
        'SELECT * FROM cpu_full;',
        function (err, result) {    //result en un array cada indice es una tupla de la respectiva tabla/ para acceder a una columna
            if (err) throw err      //se le hace asi: result[n].columna
            
            //aqui envio a react y le digo a go que en 8000/getCPU para q guarde en mysql
            //1ero a react----------------------------------
            //res.send(result[0].cpu)//le doy a cpu porq eso es un json
            console.log("==========================================================================================\n")
            console.log(result[0].cpu)
            
            //2ndo a golang---------------------------------
            console.log("#####################################################\n\n")
            axios.get('http://localhost:8000/getCPU').then(resp => {//ojo trabajr con las ips de la VMs de GCP          !!!!!!!!!
                console.log(resp.data);// en teoria ya actualice en mysql ESTO ES LO DEVOLVIDO POR GOLANG
            }).catch(function (error) {
                console.log(error);
            });

            res.send(result[0].cpu)//le doy a cpu porq eso es un json
            
        }
    )
})

app.post('/create', function (req, res) {
    var query = conn.query(
        `INSERT INTO tarea2(nombre,carnet) VALUES ('${req.body.nombre}', ${req.body.carnet});`,
        function (err, result) {
            if (err) throw err
            res.send(result)
        }

        /*
            for (let i = 0; i < cars.length; i++) {
            text += cars[i] + "<br>";}
        */
    )
})

app.listen(//ojo con el puerto
    7000,
    () => console.log('Server on port', 7000)
)