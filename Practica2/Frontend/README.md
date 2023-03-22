
**MANUAL TECNICO**

---

**Backend Goolang**

Se hizo uso de 2 modulos los cuales serian los encargados de recopilar la informacion por medio del kernel de linux, para asi poder obtener tanto la informacion necesaria del porcentaje de uso de RAM y de CPU como de los procesos ejecutandose tipos y como de los hijos de estos procesos. Ademas de levantarlo como API para asi poder hacer uso de sus 2 endpoints los cuales escriben la informacion recolectada de la memoria RAM(getRAM) y CPU(getCPU) hacia el servicio de MYSQL de GCP.

MODULO_CPU:
Por medio del comando make y de insmod se logran cargar informacion por medio de /proc habiendo escrito la informacion previamente en esa ruta.
Se hizo uso de la libreria hugelb.h como de sched y sched/signal para la recoleccion de los procesos ejecutandose como de sus hijos, el numero de tipos de porcesos ejecutandose etc. se hizo uso de un formato JSON para poder pasar dicha informacion a structs de golang para asi poder guardar la informacion en mysql en la tabla cpu.

MODULO_RAM:
Por medio del comando make y de insmod se logran cargar informacion por medio de /proc habiendo escrito la informacion previamente en esa ruta.
Se hizo uso de la libreria sysinfo.h para la recoleccion de los datos referentes a uso de memoria ram para asi poder sacar el %ram utilizado. se hizo uso de un formato JSON para poder pasar dicha informacion a structs de golang para asi poder guardar la informacion en mysql en la tabla ram.



ENDPOINTS:

getRAM: Este envia a mysql el json de raminfo y lo guarda en la tabla ram de mysql.

getCPU: Este envia a mysql el json de cpu_info y lo guarda en la tabla cpu de mysql. Ademas por medio del comando mpstat se obtiene el porcentaje de uso de CPU el cual se agrega al struct cpuinfo y se guarda en mysql como json.

---

**Backend NodeJS**

getRAM: Este recibe de mysql el json de raminfo que previamente golang habia guardado y lo envia a react. Ademas hace el llamado al endpoint referente de golang para que genere nueva informacion de ram y la almacene en mysql.

getCPU: Este recibe de mysql el json de cpuinfo que previamente golang habia guardado y lo envia a react. Ademas hace el llamado al endpoint referente de golang para que genere nueva informacion de cpu y la almacene en mysql.

----

**Frontend React**

Recibe la informacion de nodeJS y la plasma en tablas y grafico de barras por medio de chartJS.

Componentes:

1 Banner:
Es la barra con la cual se inicia el ciclo de read perpetuo, en este se hacen los get por medio de axios, ademas de que se manda a dormir el proceso 5s para que de el tiempo suficiente de que golang guarde informacio en mysql, como de que node js reciba dicha informacion de mysql y se la envie a react para mostrar.

2 Lista: Tabla que muestra la informacion requerida para la practica como el PID, NOMBRE, RAM, HIJOS etc. Esta cuenta por cada proceso un boton el cual desplega la informacion referente a los hijos del proceso.

3 Form: Muestra la informacion de los hijos referentes a los procesos tocados en el punto anterior.

4 Grafico: Grafico de ChartJS el cual muestra un grafico de barras el cual contiene el %uso de cpu y de ram actualizando en tiempo real.