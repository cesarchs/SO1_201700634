package main

import (
	"fmt"
	"net/http"
	"strconv"
)

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

func CalculadoraHandler(w http.ResponseWriter, r *http.Request) {
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
		fmt.Fprintf(w, "El resultado es: %.3f", resultado)
	default:
		fmt.Fprintf(w, "Metodo no permitido")
	}
}

func main() {
	http.HandleFunc("/calculadora", CalculadoraHandler)
	http.ListenAndServe(":8080", nil)
}
