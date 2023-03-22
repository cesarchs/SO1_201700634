import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import axios from "axios"
//import { ArrayDefault,JSON_DEL_NODE } from "./App";

/*
  //PRUEBA 1 ENVIAR ALGO AL BACKEND Y QUE REACCIONE ==========================================================
  axios.get("http://localhost:7000/getCPU")
  .then(result => {
      console.log("me devuelve del backendNode:")
      console.log(result)
      var CPU = result.data// ya aqui tengo el objeto
      console.log("-------------------")
      console.log(CPU);//[indice,{objeto}]
      console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")

      JSON_DEL_NODE=CPU
      
      //&ArrayDefault.splice(0, ArrayDefault.length);
      
      //ingreso los vehiculos obtenidos del backEnd---------------------------por ahora comentado
      //&for (var i in CPU) {
      //&    ArrayDefault.push(CPU[i]);
       //&   console.log(CPU[i])
     //& }
      //refrescar el componenete tabla de mi pagina
      //&console.log("::::2"+ArrayDefault);
      //ReactDOM.render(<ListaCarros />, document.getElementById("tablezzz"))//para q se actualice la tabla en react XD
      //por si hay error
  }).catch(console.log)*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
