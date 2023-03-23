//ES EL FORM QUE SURGE DE CREAR O ACTUALIZAR UN VEHICULO ES EMERGENTE


import { Hijos_procs/*,PID_proc,Nombre_proc*/ } from "../App";
//import axios from "axios"
//import { ArrayDefault } from "../App";


const formStyle = { // style para que al empesar inicie no visible y ya con los botones aparesca-----------------------------
    display: "block"
};


//tabla de los procesos hijos   ---------------------------------------------------------------------------------------------

const Formulario = () => {

    return (
        <div id="myDIV" style={formStyle}>
            Lista de procesos hijos

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-danger me-md-2" type="button" onClick={() => {
                    //boton de cerrar formulario
                    var x = document.getElementById("myDIV");
                    x.style.display = "none";//off
                }}
                >x</button>

            </div>

            <form>
            <table class="table" >
                    <thead class="table table-sm table-striped table-dark">
                        <tr>
                            <td>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">PID_PADRE</label>
                                    <input type="text" class="form-control" id="example1" ></input>
                                </div>
                            </td>

                            <td>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">NOMBRE_PADRE</label>
                                    <input type="text" class="form-control" id="example2" aria-describedby="emailHelp"></input>

                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>

            <table class="table table-primary table-striped" >
                <thead class="table table-sm table-striped table-dark">
                    <tr>
                        <th scope="col">No. Proceso</th>
                        <th scope="col">PID_hijo</th>
                        <th scope="col">Nombre_hijo</th>
                       
                    </tr>
                </thead>

                <tbody>
                    {Hijos_procs.map((Hijos_procs, i) => (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{Hijos_procs.PID_hijo}</td>
                            <td>{Hijos_procs.Nombre_hijo} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </form>

        </div>
    );
}
export default Formulario;