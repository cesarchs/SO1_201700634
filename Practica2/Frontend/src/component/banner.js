//ES EL BANNER NEGRO QUE POSEE LA FUNCION DE CREAR,LEER, FILTRAR


//import { myFormulario } from "../App";
import axios from "axios"

import { ArrayDefault/*,Registros*/ } from "../App";
import ListaProcesos from "./lista"
//import Porcentaje from "./porcentaje";
import BarChart from './Grafico';

import { /*scores,*/data } from "./Grafico";


//import ReactDOM from "react-dom"
import ReactDOM from "react-dom/client";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function Leer(){

    
    //aqui vendria el ciclo infinito no?  ================================================================================
    for(let i =0;true;i++){
        var CarrosDelBackEnd;
        
        axios.get("http://localhost:7000/getCPU")//     cpu
            .then(result => {
                console.log("me devuelve del backend_NODEJS:")
                console.log(result)
                CarrosDelBackEnd = result.data// ya aqui tengo el objeto

                //reset array del front
                ArrayDefault.splice(0, ArrayDefault.length);

                //ingreso los procesos obtenidos del backEnd
                for (var i in CarrosDelBackEnd.cpu) {
                    ArrayDefault.push(CarrosDelBackEnd.cpu[i]);
                    //console.log(CarrosDelBackEnd.cpu[i])
                }
                //refrescar el componenete tabla de mi pagina
                
            }).catch(console.log)//por si hay error

    //=========================2ndo get de nodeJS==================================================================================
            axios.get("http://localhost:7000/getRAM")
            .then(result => {
                console.log("me devuelve del backend_NODEJS:")
                console.log(result)
                var usoRam = result.data// ya aqui tengo el objeto

                //refrescar el componenete tabla de mi pagina
                document.getElementById("example8").value = "";//para reset textArea del form de porcentajes
                document.getElementById("example9").value = "";//para reset textArea del form de porcentajes
                document.getElementById("example10").value = "";//para reset textArea del form de porcentajes
                document.getElementById("example11").value = "";//para reset textArea del form de porcentajes
                document.getElementById("example12").value = "";//para reset textArea del form de porcentajes
                document.getElementById("example13").value = "";//para reset textArea del form de porcentajes
                document.getElementById("example14").value = "";//para reset textArea del form de porcentajes

                document.getElementById("example8").value = usoRam.porcentaje//luego pongo los valores de ram y cpu
                document.getElementById("example9").value =  CarrosDelBackEnd.uso
                document.getElementById("example10").value = CarrosDelBackEnd.ejecucion;//para valores de ejecucion,suspendidos etc.
                document.getElementById("example11").value = CarrosDelBackEnd.suspendidos;//
                document.getElementById("example12").value = CarrosDelBackEnd.detenidos;
                document.getElementById("example13").value = CarrosDelBackEnd.zombie;
                document.getElementById("example14").value = CarrosDelBackEnd.ejecucion+CarrosDelBackEnd.suspendidos+CarrosDelBackEnd.detenidos+CarrosDelBackEnd.zombie;

                console.log("@@@@  "+usoRam.porcentaje+"   "+CarrosDelBackEnd.uso)
                //console.log(typeof(usoRam.porcentaje))
                //console.log(typeof(CarrosDelBackEnd.uso))

                //scores[0]=Number(usoRam.porcentaje)
                //scores[1]=Number(CarrosDelBackEnd.uso)

                //meto los datos dentro del chart js pero no se actualizan :(
                data.datasets[0].data[0]=Number(usoRam.porcentaje)
                data.datasets[0].data[1]=Number(CarrosDelBackEnd.uso)

                //BarChart()

                

                //por si hay error
            }).catch(console.log)
//====================================================================================================================
workUp()//mando a actualizar el div
                        
await sleep(5*1000)    

    }
}

function workUp(){//actualice el grafico de barras y la tabla

    //ReactDOM.render(<ListaProcesos />, document.getElementById("tablezzz"))//para q se actualice la tabla en react XD 
    const lista = ReactDOM.createRoot(document.getElementById('tablezzz'));
    lista.render(<ListaProcesos />);
    
     //ReactDOM.render(<BarChart />, document.getElementById("BarrasWWW"))//para q se actualice la tabla en react XD
    const root = ReactDOM.createRoot(document.getElementById('BarrasWWW'));
    root.render(<BarChart />);

}


//-----------------------------------------------------------------------------------------------------

const Banner = () => {

    return (

        <nav class="navbar navbar-expand-lg bg-dark">

            <div class="row">
                
                <div class="col col-lg-2">
                    <button type="button" class="btn btn-outline-info" onClick={() => { Leer() }}>Read</button>
                </div>
                
                
            </div>

        </nav>
    );
}
export default Banner;