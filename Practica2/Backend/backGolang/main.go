//conexion hacia mysql desde go
//ojo colocar el password,ip para que funcione
/*----------------------------------
SE USARON LAS SIGUIENTES LIBRERIAS
go get github.com/gorilla/mux
go get -u github.com/go-sql-driver/mysql

go get github.com/joho/godotenv
*/
package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

type User struct {
	Name   string `json:"nombre"` //acomodado de acuerdo a mi db de mysql tarea 2 sopes
	Carnet int    `json:"carnet"` //acomodado de acuerdo a mi db de mysql tarea 2 sopes
}

var conn = MySQLConnection()

func MySQLConnection() *sql.DB {

	//obtengo mis variables de entorno
	if err := godotenv.Load("./.env"); err != nil {
		fmt.Println(err)
	}

	//uso las necesarias
	ip := os.Getenv("IP")
	pwd := os.Getenv("PASSWORD")

	//usuario:password@tcp(ip:puerto)/db
	connString := "root:" + pwd + "@tcp(" + ip + ")/tarea" //terminar de configurar aqui xd
	conn, err := sql.Open("mysql", connString)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("se ha conectado a mysql!")
	}
	return conn
}

//------------------------------------------------------------------------------------------------

func createUser(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var usr User
	json.NewDecoder((request.Body)).Decode(&usr)
	query := `INSERT INTO tarea2(nombre,carnet) VALUES (?,?);` //inserto de forma dinamica
	result, err := conn.Exec(query, usr.Name, usr.Carnet)
	if err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(response).Encode(result)
}

func getUser(response http.ResponseWriter, request *http.Request) { //funciona 100%
	response.Header().Add("content-type", "application/json")
	var listUsr []User
	query := "SELECT * FROM tarea2;" //selecciono la tabla porq la db ya lo fue en MySQLConnection
	result, err := conn.Query(query)
	if err != nil {
		fmt.Println(err)
	}
	for result.Next() {
		var usr User
		err := result.Scan(&usr.Name, &usr.Carnet)
		if err != nil {
			fmt.Println(err)
		}
		listUsr = append(listUsr, usr)
	}
	json.NewEncoder(response).Encode(listUsr)
}

// -------------------------beta
type cpuinfo struct {
	Cpu         []cpu `json:"cpu"` //[]cpuinfo `json:"data"`
	Ejecucion   int   `json:"ejecucion"`
	Suspendidos int   `json:"suspendidos"`
	Detenidos   int   `json:"detenidos"`
	Zombie      int   `json:"zombie"`
	Uso         int   `json:"uso"`
}

type cpu struct {
	PID     int       `json:"PID"`
	Nombre  string    `json:"Nombre"`
	Usuario int       `json:"Usuario"`
	Estado  int       `json:"Estado"`
	Ram     int64     `json:"Ram"`   //float de go xd
	Hijos   []cpuhijo `json:"Hijos"` //[]cpuinfo `json:"data"`
}

type cpuhijo struct {
	PID_hijo    int    `json:"PID_hijo"`
	Nombre_hijo string `json:"Nombre_hijo"`
}

// oficial------------------------------------
type raminfo struct {
	Porc int `json:"porcentaje"`
}

func getRAM(w http.ResponseWriter, r *http.Request) {
	var info raminfo

	out, err := exec.Command("cat", "/proc/ram_201700634").Output() //ojo tener abierto con insmod para q funcione xd
	if err != nil {
		fmt.Fprintf(w, "Error al obtener proc de modulo de CPU")
	}

	json.Unmarshal(out, &info)

	fmt.Println(">>>>>>>")
	fmt.Println(info)

	//GUARDAR HACIA MYSQL
	result, err := conn.Exec("DELETE from ram;") //borro lo q tenia, esto para q solo exista 1 dato    // WHERE porcentaje != 0
	if err != nil {
		fmt.Println(err) //error pues no hay elementos q actualizar

	}
	fmt.Println("Siiiuuuuu! borre EN MYSQL XD ", result)

	//-------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------

	//tonces insertamos porq esta vacio, no actualizo
	query := `INSERT INTO ram(porcentaje) VALUES (?);` //inserto de forma dinamica
	result, err = conn.Exec(query, info.Porc)          //le meto los valores
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Siiiuuuuu! GUARDE EN MYSQL XD")
	json.NewEncoder(w).Encode(result)

	fmt.Println("llegue aqui :v en ram")

}

//make in progress

func getCPU(w http.ResponseWriter, r *http.Request) {
	var datos cpuinfo
	out, err := exec.Command("cat", "/proc/cpu_201700634").Output()
	if err != nil {
		fmt.Fprintf(w, "Error al obtener proc de modulo de CPU")
	}

	output := string(out[:])
	fmt.Println("-----------------------------------")
	fmt.Println(output)

	json.Unmarshal(out, &datos) //pasamos a JSON

	//test get%cpu
	out, err = exec.Command("mpstat").Output() //egrep --color 'Cache|Mem|Swap' /proc/meminfo
	if err != nil {
		fmt.Fprintf(w, "Error al obtener CPU%")
	}

	output = string(out[:])
	fmt.Println("-----------------------------------")
	fmt.Println(output)
	ssd := strings.Split(output, "\n")
	fmt.Println(ssd)
	fmt.Println("____")
	ssd2 := strings.Split(ssd[len(ssd)-2], " ")
	fmt.Println(ssd2[len(ssd2)-1]) //idle %cpu usado en inactividad
	notUsado, errorXD := strconv.ParseFloat(ssd2[len(ssd2)-1], 64)

	if errorXD != nil {
		fmt.Fprintf(w, "Error al obtener CPU% parse int")
		notUsado = 0
	}
	cpuUsado := 100 - (notUsado)
	fmt.Println(cpuUsado) //valor de %cpu usado activamente

	/*


		ssd2 := strings.Split(ssd[len(ssd)-2], " ")

			for i := 0; i < len(ssd2); i++ {
				fmt.Println("indice:" + strconv.Itoa(i) + "      valor:" + ssd2[i])
			}

			fmt.Println(ssd2[8])



	*/
	//fmt.Println(datos)                INSERT INTO cpu_full VALUES(JSON_OBJECT(

	//GUARDAR HACIA MYSQL lo del cpu----------------------------------------------------------------------
	result, err := conn.Exec("DELETE from cpu_full;") //borro lo q tenia, esto para q solo exista 1 dato
	if err != nil {
		fmt.Println(err) //error pues no hay elementos q actualizar

	}
	//INSERT INTO tipos(ejecucion,suspendidos,detenidos,zombie) VALUES (?,?,?,?);
	fmt.Println("Siiiuuuuu! borre EN MYSQL XD la tabla cpu_full", result)

	//completo el json--------------------------------
	//pasamos de float a int y a string al final
	s := fmt.Sprintf("%.0f", cpuUsado)
	asd2, errf := strconv.Atoi(s)
	if errf != nil {
		fmt.Println(errf)
	}
	//fmt.Printf("hello, world "+strconv.Itoa(asd2)+"\n")

	//usoCPUuso:= strconv.Itoa(asd2)//ya guarde el objeto CPUINFO
	datos.Uso = asd2

	b, err := json.MarshalIndent(datos, "", "  ")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Print(string(b))
	fmt.Println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

	query := " INSERT INTO cpu_full VALUES('" + string(b) + "');" //inserto de forma dinamica
	result, err = conn.Exec(query)                                //le meto los valores
	if err != nil {
		fmt.Println(err)
	}

	/*

		//----------------------------------------------------------------------
		//----------------------------------------------------------------------
		//GUARDAR HACIA MYSQL lo del cpu----------------------------------------------------------------------
		result, err := conn.Exec("DELETE from cpu;") //borro lo q tenia, esto para q solo exista 1 dato
		if err != nil {
			fmt.Println(err) //error pues no hay elementos q actualizar

		}
		fmt.Println("Siiiuuuuu! borre EN MYSQL XD la tabla cpu", result)
		//guardamos hijos--------------------------------------------------------------------------------------
		result, err = conn.Exec("DELETE from cpu_hijos;") //borro lo q tenia, esto para q solo exista 1 dato
		if err != nil {
			fmt.Println(err) //error pues no hay elementos q actualizar

		}
		fmt.Println("Siiiuuuuu! borre EN MYSQL XD la tabla cpu_hijos", result)

		for i := 0; i < len(datos.Cpu); i++ {
			query := `INSERT INTO cpu(PID,Nombre,Usuario,Estado,Ram) VALUES (?,?,?,?,?);`                                                      //inserto de forma dinamica
			result, err = conn.Exec(query, datos.Cpu[i].PID, datos.Cpu[i].Nombre, datos.Cpu[i].Usuario, datos.Cpu[i].Estado, datos.Cpu[i].Ram) //le meto los valores
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println("Padre", datos.Cpu[i].Nombre)
			//meto hijos
			query = `INSERT INTO cpu_hijos(PID_hijo,Nombre_hijo,PID) VALUES (?,?,?);` //inserto de forma dinamica
			for j := 0; j < len(datos.Cpu[i].Hijos); j++ {
				result, err = conn.Exec(query, datos.Cpu[i].Hijos[j].PID_hijo, datos.Cpu[i].Hijos[j].Nombre_hijo, datos.Cpu[i].PID) //le meto los valores
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("hijo", datos.Cpu[i].Hijos[j].PID_hijo)
			}

		}
		fmt.Println("-----------------------------sali de padres e hijos---------------------")

		//guardamos los tipos de procesos----------------------------------------------------------------------
		result, err = conn.Exec("DELETE from tipos;") //borro lo q tenia, esto para q solo exista 1 dato
		if err != nil {
			fmt.Println(err) //error pues no hay elementos q actualizar

		}
		fmt.Println("Siiiuuuuu! borre EN MYSQL XD la tabla tipos", result)
		query := `INSERT INTO tipos(ejecucion,suspendidos,detenidos,zombie) VALUES (?,?,?,?);`            //inserto de forma dinamica
		result, err = conn.Exec(query, datos.Ejecucion, datos.Suspendidos, datos.Detenidos, datos.Zombie) //le meto los valores
		if err != nil {
			fmt.Println(err)
		}

		//todo salio bien xd

		fmt.Println(result) //para evitar error golang

	*/

	json.NewEncoder(w).Encode(datos) //ojala funcione TuT

	//fmt.Println(datos)
	fmt.Println("llegue aqui :v en cpu")
}

func main() {

	router := mux.NewRouter()
	router.HandleFunc("/create", createUser).Methods("POST") //tarea2
	router.HandleFunc("/get", getUser).Methods("GET")        //tarea2
	router.HandleFunc("/getCPU", getCPU).Methods("GET")
	router.HandleFunc("/getRAM", getRAM).Methods("GET")
	fmt.Println("Server on port", 8000)
	err := http.ListenAndServe(":8000", router)
	if err != nil {
		fmt.Println(err)
	}

}
