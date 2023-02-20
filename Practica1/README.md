**PRACTICA 1 - SISTEMAS OPERATIVOS 1 - Cesar Chamale**
----
**Explicacion de la practica**

Esta practica consistio en la elaboracion de un proyecto que funcionase con la ayuda de docker y docker compose, que brindan una mayor flexibilidad, comodidad y persistencia de informacion a la hora de realizar aplicaciones en diferentes tipos de entorno, como en este caso trabajandolo en ubuntu 18.04 desktop para su posterior ejecucion en el sistema de ubuntu server(KVM) y poder observar posteriormente la ejecucion de la aplicacion en la version desktop de ubuntu.

----

**Front-end**

En el front-end se utilizo la herramienta de react para su elaboracion, bootstrap para brindarle un estilo professional y axios para realizar las conexiones hacia el back-end (golang).

Se Diseñaron diferentes componentes(react) para trabajarlas individualmente y mas odenadamente en la funcionalidad del proyecto. 

-Panel:
El panel donde se visualizan los numeros se encuentra en el JS ejemplo, ahi se diseñaron los botones
 para el teclado de la calculadora .
Haciendo peticiones hacia el back-end por medio de axios.

Axios fue utilizado para todas las conexiones hacia el back-end. Estas poseen la direccion IP del ubuntu server para asi poderse visualizar en el host.

----
**Back-end**

Para el back-end se utilizo el lenguaje de golang, ademas de implementar diferentes bibliotecas tales como: rs cors y para la conexion hacia la base de datos que fue hecha en MySQL, con la excepcion de ser la version de docker por medio de un componente. 

En este back-end se realizaron diferentes metodos para la recepcion de informacion y su ejecucion por parte del front-end tales como:

-Realizar Operacion:
realizacion de operaciones matematicas con sus validaciones.

-Historial(log): 
Manda a la base de datos los log referentes a cada tipo de actividad realizada en el front-end.

Estas funciones hacen un llamado a la base de datos.

----
**Base de datos**

Se creo tanto un usuario inicial (usuario root) para administrar la base de datos y hacer posible la conexion con el back-end, ademas se creo la db admin que posee la coleccion de historial de peraciones. Historial es una coleccion que almacena "logs" de las acciones realizadas en la aplicacion. Esta esta hecha con la ayuda de la imagen que proporciona dockerhub.

----
Se hizo uso de docker-compose a travez de un YML para poder realizar dicha practica, en este se hizo uso de volume para la persistencia de informacion, para poder hacer uso de los comando docker-compose up y down.

Ademas de subir las imagenes del front-end, back-end a dockerhub en el siguiente link: https://hub.docker.com/

Para que asi el YML las descargara y diera inicio a la aplicacion por medio de docker.