import Big from "big.js";
import axios from "axios"

const baseURL = "http://localhost:8080/calculadora";

export default function operate(numeroUno, numeroDos, operador) {

  const uno = Big(numeroUno || "0");
  const dos = Big(numeroDos || (operador === "÷" || operador === 'x' ? "1": "0")); 

  if (operador === "+") {
    axios.get(baseURL + "?operando1="+numeroUno+"&operando2="+numeroDos+"&operacion=suma").then((response) => {
    console.log("entro al axios")
    console.log(response.data)
    return response.data.toString()
    });
  }
  
  

  if (operador === "-") return uno.minus(dos).toString()

  if (operador === "x") return uno.times(dos).toString()

  if (operador === "/") return uno.div(dos).toString()

}