//ESTA PESTANYA ES LA TABLA QUE SE VISUALIZA Y QUE MUESTRA EL VEHICULO CON LOS 2 BOTONES


import { myFormulario,/* Vehiculo,*/ ArrayDefault/*,Registros*/ } from "../App";
import ReactDOM from "react-dom"
import Formulario from './form';
//para que se pueda borrar


//import axios from "axios"

//import { Leer } from "./banner";


function SetAtributos(pid,nombre) {

    ReactDOM.render(<Formulario />, document.getElementById("myDIV"))//para q se actualice la tabla de hijos en react XD

    document.getElementById("example1").value = pid//luego pongo los nombres
    document.getElementById("example2").value = nombre


    var x = document.getElementById("myDIV");
    x.style.display = "block";//on

    //alert("pid:"+pid+" ,nombre:"+nombre)

    //
    
}

//console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%55")

//-----------------------------------------------------------------------------------------------------
const ListaProcesos = () => {

    return (
        <div id="tablezzz">
            <table class="table table-dark table-striped" >
                <thead class="table table-sm table-striped table-dark">
                    <tr>
                        <th scope="col">No. Proceso</th>
                        <th scope="col">PID.</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Estado</th>
                        <th scope="col">%Ram</th>
                        <th scope="col">Hijos</th>
                    </tr>
                </thead>

                <tbody>
                    {ArrayDefault.map((d, i) => (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{d.PID}</td>
                            <td>{d.Nombre} </td>
                            <td>{d.Usuario}</td>
                            <td>{d.Estado}</td>
                            <td>{d.Ram}</td>
                            <td> <button type="button" class="btn btn-primary btn-block" onClick={() => {
                                 myFormulario(d.Hijos,d.PID,d.Nombre)//llamo a este para q me muestre los hijos del proceso seleccionado
 
                            SetAtributos(d.PID,d.Nombre)
                            }} >Ver Hijos </button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
export default ListaProcesos;