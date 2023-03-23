import './App.css';
import ListaProcesos from './component/lista';
import Banner from './component/banner';
import Formulario from './component/form';
import Porcentaje from './component/porcentaje';
import BarChart from './component/Grafico';


//variables para el % de ram y cpu en el grafico de barras
export var FFF =[75,35]




export var ArrayDefault = [//lista ejemplo de todos los procesos -------------------------------------------------------------

];

export var Proceso = {//objeto molde
  PID: -1
};

export var JSON_DEL_NODE;

export var Hijos_procs=[];


function resetForm() {//borrar contenido de las celdas principales
  //document.getElementById("example1").setAttribute('value', " ");//NO SIRVE
  document.getElementById("example1").value = "";//para reset textArea del form
  document.getElementById("example2").value = "";//para reset textArea del form
}

export function myFormulario(Hijos,PID,Nombre) { //----------------------------------------------------------

  resetForm() //reseteo los input del form donde dice el padre proc


  //ahora defino en que modo presentare el form si para crearVehiculo o para ActualizarVehiculo
  Hijos_procs=Hijos

  for (var i in Hijos_procs) {
    console.log("***"+Hijos_procs[i].PID_hijo+"  "+Hijos_procs[i].Nombre_hijo)
    //console.log(typeof CarrosDelBackEnd[i])
  }

  
}


//estilos para definir el cuerpo de la pagina web-----------------------------------------------

const style = {
  fontSize: '12px',
  padding: '1px',
  width: '6%',
  heigth: '5%',
  textAlign: 'left'

  //position: 'absolute'
};

const TableStyle = {
  fontSize: '16px',
  padding: '10px',
  width: '40%',
  heigth: '50%',
  textAlign: 'center'
};

//-------------------------------------------------------------------------------------

function App() {//componente root

  return (

    <div className="App">
        <Banner />
        

        

    
      <table>
        <tr>
          <td style={style}></td>
          <td style={TableStyle}>CESAR LEONEL CHAMALE SICAN - 201700634</td>
          <td style={style}></td>
        </tr>

        <tr>
          <td style={style}></td>
          <td style={TableStyle}> <BarChart /> </td>
          <td style={style}></td>
        </tr>

        <tr>
          <td style={style}></td>
          <td style={TableStyle}> -----------------------------------------------------------------------------------------------------------------------</td>
          <td style={style}></td>
        </tr>

        <tr>
          <td style={style}></td>
          <td style={TableStyle}>  <Porcentaje /> </td>
          <td style={style}></td>
        </tr>

        <tr>
          <td style={style}></td>
          <td style={TableStyle}>  <Formulario /> </td>
          <td style={style}></td>
        </tr>

        <tr>
          <td></td>
          <td id="legulas"> <h2>Visualizador de procesos</h2> <ListaProcesos />  </td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <th>Practica 2 1S 2023</th>
          <td></td>
        </tr>
      </table>

    </div>

  );

}

export default App;