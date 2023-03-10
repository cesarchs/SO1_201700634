package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

type Usuario struct {
	ID       int    `json:"id"`
	Nombre   string `json:"nombre"`
	Apellido string `json:"apellido"`
}

var db *sql.DB

type Calculadora struct {
	Operando1 float64
	Operando2 float64
	Operacion string
}

func (c Calculadora) Resultado() float64 {
	switch c.Operacion {
	case "suma":
		return c.Operando1 + c.Operando2
	case "resta":
		return c.Operando1 - c.Operando2
	case "multiplicacion":
		return c.Operando1 * c.Operando2
	case "division":
		if c.Operando2 == 0.0 {
			return 0.00
		} else {
			return c.Operando1 / c.Operando2
		}
	default:
		return 0
	}
}
func setupResponse(w *http.ResponseWriter, req *http.Request) {
	//(*w).Header().Set("Access-Control-Allow-Origin", "POST")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

}
func CalculadoraHandler(w http.ResponseWriter, r *http.Request) {
	header := w.Header()
	header.Add("Access-Control-Allow-Origin", "*")
	header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
	setupResponse(&w, r)
	switch r.Method {
	case "GET":
		queryValues := r.URL.Query()
		operando1 := queryValues.Get("operando1")
		operando2 := queryValues.Get("operando2")
		operacion := queryValues.Get("operacion")
		pi1, _ := strconv.ParseFloat(operando1, 64)
		pi2, _ := strconv.ParseFloat(operando2, 64)
		calculadora := Calculadora{Operando1: pi1, Operando2: pi2, Operacion: operacion}
		resultado := calculadora.Resultado()
		fmt.Fprintf(w, "%.3f", resultado)
	default:
		fmt.Fprintf(w, "Metodo no permitido")
	}
}

func main() {
	db, _ = sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/database")
	defer db.Close()
	http.HandleFunc("/calculadora", CalculadoraHandler)
	http.ListenAndServe(":8080", nil)
}

func getUsuarios(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var usuarios []Usuario

	rows, err := db.Query("SELECT * FROM usuarios")
	if err != nil {
		fmt.Fprintf(w, "Error en la consulta")
	}
	defer rows.Close()

	for rows.Next() {
		var usuario Usuario
		rows.Scan(&usuario.ID, &usuario.Nombre, &usuario.Apellido)
		usuarios = append(usuarios, usuario)
	}

	json.NewEncoder(w).Encode(usuarios)
}
