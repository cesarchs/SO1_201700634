//ES EL FORM QUE MUESTRA EL % DE RAM Y CPU



//import axios from "axios"
//import { ArrayDefault } from "../App";


const formStyle = { // style para que al empesar inicie no visible y ya con los botones aparesca-----------------------------
    display: "block"
};


//tabla de los procesos hijos   ---------------------------------------------------------------------------------------------

const Porcentaje = () => {

    return (
        <div id="myDIVPorcentaje" style={formStyle}>
            Porcentaje de uso de la practica 2
            <form>
            <table class="table" >
                    <thead class="table table-sm table-striped table-dark">

                        <tr>
                            <td>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">%RAM</label>
                                    <input type="text" class="form-control" id="example8" ></input>
                                </div>
                            </td>

                            <td>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">%CPU</label>
                                    <input type="text" class="form-control" id="example9" aria-describedby="emailHelp"></input>

                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="2">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Total de Procesos</label>
                                    <input id="example14" type="text" class="form-control" aria-describedby="emailHelp"></input>

                                </div>
                            </td>
                        </tr>


                        <tr>
                            <td>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">EJECUCION</label>
                                    <input type="text" class="form-control" id="example10" ></input>
                                </div>
                            </td>

                            <td>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">SUSPENDIDOS</label>
                                    <input type="text" class="form-control" id="example11" aria-describedby="emailHelp"></input>

                                </div>
                            </td>
                        </tr>



                        <tr>
                            <td>

                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">DETENIDOS</label>
                                    <input type="text" class="form-control" id="example12" ></input>
                                </div>
                            </td>

                            <td>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">ZOMBIE</label>
                                    <input type="text" class="form-control" id="example13" aria-describedby="emailHelp"></input>

                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>

            </form>

        </div>
    );
}
export default Porcentaje;