var saldo=0;
var apuestas = [];
var apuestaActual = 0;
var numeroApostado = null;
var montoFichaSeleccionada = 1;
var numeroAleatorio=1;
var ganancias = 0;

const frecuenciaNumeros = {};

var historialNumeros = [];
var numerosCalientes = [];
//var numerosMenosFrecuentes = [];


const fichas = [1, 5, 10, 20, 50, 100];



var rojos = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
var negros = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
var pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
var impares = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
var primeraDocena = [1,2,3,4,5,6,7,8,9,10,11,12];
var segundaDocena = [13,14,15,16,17,18,19,20,21,22,23,24];
var terceraDocena = [25,26,27,28,29,30,31,32,33,34,35,36];
var primeraFila = [3,6,9,12,15,18,21,24,27,30,33,36];
var segundaFila = [2,5,8,11,14,17,20,23,26,29,32,35];
var terceraFila = [1,4,7,10,13,16,19,22,25,28,31,34];
var primeraMitad = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
var segundaMitad = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

// Obtén una referencia al elemento del temporizador
const timerBar = document.getElementById("timer");
const btnJugarYa = document.getElementById("btnJugarYa");
const ficha1 = document.getElementById("ficha1");
const ficha5 = document.getElementById("ficha5");
const ficha10 = document.getElementById("ficha10");
const ficha20 = document.getElementById("ficha20");
const ficha50 = document.getElementById("ficha50");
const ficha100 = document.getElementById("ficha100");

// Establece la duración del temporizador en milisegundos (por ejemplo, 20 segundos)
const duration = 2000;  // 20 segundos


const mensajeDuration = 1000;

// Función para iniciar el temporizador
function startTimer() {

    if (saldo <= 0) {
        
        mostrarMensaje("¡No tienes suficiente saldo para jugar!");
        return;
    }
    resetBarraTemporizadora();
    timerBar.style.transition = `width ${duration}ms linear`;
    timerBar.style.width = "0";

    document.getElementById("sound").play();

    // Llama a la función mostrarResultado después de que finalice el temporizador
    setTimeout(function () {
        mostrarResultado();
        validarApuesta();
        etiquetaApuesta.textContent = apuestaActual;  
        saldo += ganancias;  
        apuestaActual = 0;
        ganancias = 0;  
        actualizarSaldoEnPantalla();
        resetBarraTemporizadora();  
    }, duration);

    // Agrega un temporizador adicional para verificar si queda un segundo
    setTimeout(function () {
        if (timerBar.style.width === "0px") {
            // Muestra el mensaje en la pantalla cuando queda un segundo
            mostrarMensaje("¡No va más!");
            
        }
    }, duration - 2000); 
}

function resetBarraTemporizadora() {
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
}

// Función para mostrar un mensaje en la pantalla
function mostrarMensaje(mensaje) {
    var mensajeElemento = document.createElement("div");
    mensajeElemento.textContent = mensaje;
    mensajeElemento.style.position = "fixed";
    mensajeElemento.style.top = "50%";
    mensajeElemento.style.left = "50%";
    mensajeElemento.style.transform = "translate(-50%, -50%)";
    mensajeElemento.style.padding = "20px";
    mensajeElemento.style.background = "#ffffff";
    mensajeElemento.style.border = "1px solid #000000";
    mensajeElemento.style.zIndex = "1000";

    // Ajusta el tamaño del mensaje
    mensajeElemento.style.fontSize = "24px"; // Ajusta el tamaño del texto
    mensajeElemento.style.width = "300px"; // Ajusta el ancho del mensaje
    mensajeElemento.style.textAlign = "center"; // Ajusta la alineación del texto

    document.body.appendChild(mensajeElemento);

    // Oculta el mensaje después de un tiempo
    setTimeout(function () {
        document.body.removeChild(mensajeElemento);
    }, mensajeDuration); // Ajusta el tiempo de visualización del mensaje (en milisegundos)
  
    
}

btnJugarYa.addEventListener("click", startTimer);


// Función para mostrar el resultado en el nuevo modal
function mostrarResultado() {
    // Generar un número aleatorio entre 0 y 36 (inclusive)
   //var numeroAleatorio = Math.floor(Math.random() * 37);
   var numeroAleatorio=1;
   resetBarraTemporizadora();
   
     
    // Determinar el color y si es par o impar
    var color = numeroAleatorio === 0 ? "Verde" : (numeroAleatorio % 2 === 0 ? "Negro" : "Rojo");
    var paridad = numeroAleatorio === 0 ? "Cero" : (numeroAleatorio % 2 === 0 ? "Par" : "Impar");

    // Mostrar el resultado en el nuevo modal
    document.getElementById("resultadoNumero").textContent = 'Número: ' + numeroAleatorio;
    document.getElementById("resultadoColor").textContent = 'Color: ' + color;
    document.getElementById("resultadoParidad").textContent = 'Par-Impar: ' + paridad;

    // Mostrar el nuevo modal
    mostrarModal('modalResultado');
    actualizarHistorialNumeros(numeroAleatorio);
    
}


// Función para mostrar la hora
function mostrarHora() {
    var elementoHora = document.getElementById("laHora");
    var fechaActual = new Date();
    var hora = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();

    // Agrega un cero delante si los minutos o segundos son menores que 10
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Muestra la hora actual en el elemento con id "hora"
    elementoHora.textContent = hora + ":" + minutos + ":" + segundos;
}

setInterval(mostrarHora, 1000);

//Función para el botón de Ingresar y retirar
document.getElementById("btnaceptarSaldo").addEventListener("click",ingresar,false);
document.getElementById("btnaceptarRetirar").addEventListener("click", retirar, false);
document.getElementById("btncancelarSaldo").addEventListener("click",cancelar,false)

function mostrarModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = "block";
}

function cerrarModal(idModal) {
    var modal = document.getElementById(idModal);
    modal.style.display = "none";
}

function ingresar() {
    saldo = parseInt(document.getElementById("ingresarCantidad").value);
    cerrarModal("modalIngresar");

    if(document.getElementById("lblSaldo").innerHTML === "0"){
        document.getElementById("lblSaldo").innerHTML = saldo;
    } else {
        document.getElementById("lblSaldo").innerHTML = parseInt(document.getElementById("lblSaldo").innerHTML) + saldo;
    }
}

function retirar() {
    saldo = parseInt(document.getElementById("retirarCantidad").value);
    cerrarModal("modalRetirar");

    if(document.getElementById("lblSaldo").innerHTML === "0"){
        document.getElementById("lblSaldo").innerHTML = saldo;
    } else {
        document.getElementById("lblSaldo").innerHTML = parseInt(document.getElementById("lblSaldo").innerHTML) - saldo;
    }
}

function cancelar() {
  cerrarModal("modalIngresar");
  cerrarModal("modalRetirar");
}

//Clase que m crea el numero y la cantidad apostada
class Apuesta {
    constructor(numero,cantidadApostada) {
        
        this.numero=numero;
        this.cantidadApostada = cantidadApostada;
    }
}
document.getElementById("rojo1").addEventListener("click", function () {
    agregarApuesta(1);
    console.log("Estoy apostando");
}, false);
document.getElementById("negro2").addEventListener("click", function () {
    agregarApuesta(2);
}, false);

document.getElementById("rojo3").addEventListener("click", function () {
    agregarApuesta(3);
}, false);

document.getElementById("negro4").addEventListener("click", function () {
    agregarApuesta(4);
}, false);

document.getElementById("rojo5").addEventListener("click", function () {
    agregarApuesta(5);
}, false);

document.getElementById("negro6").addEventListener("click", function () {
    agregarApuesta(6);
}, false);

document.getElementById("rojo7").addEventListener("click", function () {
    agregarApuesta(7);
}, false);

document.getElementById("negro8").addEventListener("click", function () {
    agregarApuesta(8);
}, false);

document.getElementById("rojo9").addEventListener("click", function () {
    agregarApuesta(9);
}, false);

document.getElementById("negro10").addEventListener("click", function () {
    agregarApuesta(10);
}, false);

document.getElementById("rojo11").addEventListener("click", function () {
    agregarApuesta(11);
}, false);

document.getElementById("negro12").addEventListener("click", function () {
    agregarApuesta(12);
}, false);

document.getElementById("rojo13").addEventListener("click", function () {
    agregarApuesta(13);
}, false);

document.getElementById("negro14").addEventListener("click", function () {
    agregarApuesta(14);
}, false);

document.getElementById("rojo15").addEventListener("click", function () {
    agregarApuesta(15);
}, false);

document.getElementById("negro16").addEventListener("click", function () {
    agregarApuesta(16);
}, false);

document.getElementById("rojo17").addEventListener("click", function () {
    agregarApuesta(17);
}, false);

document.getElementById("negro18").addEventListener("click", function () {
    agregarApuesta(18);
}, false);

document.getElementById("rojo19").addEventListener("click", function () {
    agregarApuesta(19);
}, false);

document.getElementById("negro20").addEventListener("click", function () {
    agregarApuesta(20);
}, false);

document.getElementById("rojo21").addEventListener("click", function () {
    agregarApuesta(21);
}, false);

document.getElementById("negro22").addEventListener("click", function () {
    agregarApuesta(22);
}, false);

document.getElementById("rojo23").addEventListener("click", function () {
    agregarApuesta(23);
}, false);

document.getElementById("negro24").addEventListener("click", function () {
    agregarApuesta(24);
}, false);

document.getElementById("rojo25").addEventListener("click", function () {
    agregarApuesta(25);
}, false);

document.getElementById("negro26").addEventListener("click", function () {
    agregarApuesta(26);
}, false);

document.getElementById("rojo27").addEventListener("click", function () {
    agregarApuesta(27);
}, false);

document.getElementById("negro28").addEventListener("click", function () {
    agregarApuesta(28);
}, false);

document.getElementById("rojo29").addEventListener("click", function () {
    agregarApuesta(29);
}, false);

document.getElementById("negro30").addEventListener("click", function () {
    agregarApuesta(30);
}, false);

document.getElementById("rojo31").addEventListener("click", function () {
    agregarApuesta(31);
}, false);

document.getElementById("negro32").addEventListener("click", function () {
    agregarApuesta(32);
}, false);

document.getElementById("rojo33").addEventListener("click", function () {
    agregarApuesta(33);
}, false);

document.getElementById("negro34").addEventListener("click", function () {
    agregarApuesta(34);
}, false);

document.getElementById("rojo35").addEventListener("click", function () {
    agregarApuesta(35);
}, false);

document.getElementById("negro36").addEventListener("click", function () {
    agregarApuesta(36);
}, false);

document.getElementById("rojoRombo").addEventListener("click", function () {
    agregarApuesta("rojo");
}, false);
document.getElementById("negroRombo").addEventListener("click", function () {
    agregarApuesta("negro");
}, false);
document.getElementById("verdePar").addEventListener("click", function () {
    agregarApuesta("par");
}, false);
document.getElementById("verdeImpar").addEventListener("click", function () {
    agregarApuesta("impar");
}, false);
document.getElementById("verdeAl18").addEventListener("click", function () {
    agregarApuesta("primeraMitad");
}, false);
document.getElementById("verdeAl36").addEventListener("click", function () {
    agregarApuesta("segundaMitad");
}, false);
document.getElementById("verde1fila").addEventListener("click", function () {
    agregarApuesta("primeraFila");
}, false);
document.getElementById("verde2fila").addEventListener("click", function () {
    agregarApuesta("segundaFila");
}, false);
document.getElementById("verde3fila").addEventListener("click", function () {
    agregarApuesta("terceraFila");
}, false);
document.getElementById("verdeDocena1").addEventListener("click", function () {
    agregarApuesta("primeraDocena");
}, false);
document.getElementById("verdeDocena2").addEventListener("click", function () {
    agregarApuesta("segundaDocena");
}, false);
document.getElementById("verdeDocena3").addEventListener("click", function () {
    agregarApuesta("terceraDocena");
}, false);





//Funcion para realizar la apuesta

function agregarApuesta(casilla) {
    var apuesta = new Apuesta(casilla, montoFichaSeleccionada);
    apuestas.push(apuesta);
    window.alert(apuestas);
}

function validarApuesta() {
    var ganancias = 0;
    var gananciasTotales = 0;
    console.log("numeroAleatorio:", numeroAleatorio);

    for (var i = 0; i < apuestas.length; i++) {
        console.log("Apuesta actual:", apuestas[i]);

        if (!isNaN(parseInt(apuestas[i].numero))) {
            // Aquí entra si es un número
            console.log("Es un número");
            if (apuestas[i].numero == numeroAleatorio) {
                // Multiplica la cantidad apostada por la probabilidad y el valor de la ficha
                ganancias = 36 * montoFichaSeleccionada;
                console.log("Ganancia directa a número:", ganancias);
            }
        } else {
            // Aquí entra si no es un número
            console.log("No es un número");
            if (apuestas[i].numero == "rojo" && rojos.includes(numeroAleatorio)) {
                ganancias = 2 * montoFichaSeleccionada;
                console.log("Ganancia en rojo:", ganancias);
            } else if (apuestas[i].numero == "negro" && negros.includes(numeroAleatorio)) {
                ganancias = 2 * montoFichaSeleccionada;
                console.log("Ganancia en negro:", ganancias);
            } else if (apuestas[i].numero == "par" && numeroAleatorio % 2 == 0) {
                ganancias = 2 * montoFichaSeleccionada;
                console.log("Ganancia en par:", ganancias);
            } else if (apuestas[i].numero == "impar" && (numeroAleatorio % 2 !== 0)) {
                ganancias = 2 * montoFichaSeleccionada;
                console.log("Ganancia en impar:", ganancias);
            } else if (apuestas[i].numero == "primeraDocena" && primeraDocena.includes(numeroAleatorio)) {
                ganancias = 3 * montoFichaSeleccionada;
                console.log("Ganancia en primera Docena:", ganancias);
            } else if (apuestas[i].numero == "segundaDocena" && segundaDocena.includes(numeroAleatorio)) {
                ganancias = 3 * montoFichaSeleccionada;
                console.log("Ganancia en segunda Docena:", ganancias);
            } else if (apuestas[i].numero == "terceraDocena" && terceraDocena.includes(numeroAleatorio)) {
                ganancias = 3 * montoFichaSeleccionada;
                console.log("Ganancia en tercera Docena:", ganancias);
            } else if (apuestas[i].numero == "primeraFila" && primeraFila.includes(numeroAleatorio)) {
                ganancias = 3 * montoFichaSeleccionada;
                console.log("Ganancia en primera Fila:", ganancias);
            } else if (apuestas[i].numero == "segundaFila" && segundaFila.includes(numeroAleatorio)) {
                ganancias = 3 * montoFichaSeleccionada;
                console.log("Ganancia en segunda Fila:", ganancias);
            } else if (apuestas[i].numero == "terceraFila" && terceraFila.includes(numeroAleatorio)) {
                ganancias = 3 * montoFichaSeleccionada;
                console.log("Ganancia en tercera Fila:", ganancias);
            } else if (apuestas[i].numero == "primeraMitad" && primeraMitad.includes(numeroAleatorio)) {
                ganancias = 2 * montoFichaSeleccionada;
                console.log("Ganancia en primera Mitad:", ganancias);
            } else if (apuestas[i].numero == "segundaMitad" && segundaMitad.includes(numeroAleatorio)) {
                ganancias = 2 * montoFichaSeleccionada;
                console.log("Ganancia en segunda Mitad:", ganancias);
            }
        }

        saldo += ganancias;
        gananciasTotales += ganancias;
        console.log("Saldo actual:", saldo);
        console.log("Ganancias totales:", gananciasTotales);
    }

    // Actualizar el elemento HTML con el nuevo valor de ganancias
    document.getElementById("infoGanancia").innerHTML = gananciasTotales.toString();
    

    // Actualizar el elemento HTML con el nuevo valor de saldo
    document.getElementById("lblSaldo").innerHTML = saldo.toString();

    apuestas = [];
}


ficha1.addEventListener("click", function () {
    
    if (saldo >= 1) {
        saldo -= 1;
        montoFichaSeleccionada = 1;
        actualizarSaldoEnPantalla();
    } else {
        // Puedes mostrar un mensaje o realizar otra acción si el saldo es insuficiente.
        console.log("Saldo insuficiente para la ficha seleccionada");
    }
}, false);


ficha5.addEventListener("click", function () {
    if (saldo >= 5) {
        saldo -= 5;
        montoFichaSeleccionada = 5;
        actualizarGanancia(); // Actualiza la ganancia al seleccionar una nueva ficha
        actualizarSaldoEnPantalla();
    } else {
        console.log("Saldo insuficiente para la ficha seleccionada");
    }
}, false);

ficha10.addEventListener("click", function () {
    if (saldo >= 10) {
        saldo -= 10;
        montoFichaSeleccionada = 10;
        actualizarGanancia(); // Actualiza la ganancia al seleccionar una nueva ficha
        actualizarSaldoEnPantalla();
    } else {
        console.log("Saldo insuficiente para la ficha seleccionada");
    }
}, false);

ficha20.addEventListener("click", function () {
    if (saldo >= 20) {
        saldo -= 20;
        montoFichaSeleccionada = 20;
        actualizarGanancia(); // Actualiza la ganancia al seleccionar una nueva ficha
        actualizarSaldoEnPantalla();
    } else {
        console.log("Saldo insuficiente para la ficha seleccionada");
    }
}, false);

ficha50.addEventListener("click", function () {
    if (saldo >= 50) {
        saldo -= 50;
        montoFichaSeleccionada = 50;
        actualizarGanancia(); // Actualiza la ganancia al seleccionar una nueva ficha
        actualizarSaldoEnPantalla();
    } else {
        console.log("Saldo insuficiente para la ficha seleccionada");
    }
}, false);

ficha100.addEventListener("click", function () {
    if (saldo >= 100) {
        saldo -= 100;
        montoFichaSeleccionada = 100;
        actualizarGanancia(); // Actualiza la ganancia al seleccionar una nueva ficha
        actualizarSaldoEnPantalla();
    } else {
        console.log("Saldo insuficiente para la ficha seleccionada");
    }
}, false);


function actualizarGanancia() {
    const ganancia = apuestaActual * 36; // Actualiza según la apuesta actual (puedes ajustar esto según tus necesidades)
    
    // Multiplica la ganancia por el valor de la ficha seleccionada
    const gananciaFinal = ganancia * montoFichaSeleccionada;

    // Actualiza el elemento HTML con el nuevo valor de ganancias
    document.getElementById("infoGanancia").innerHTML = gananciaFinal.toString();
}



function actualizarSaldoEnPantalla() {
    // Actualiza el elemento en la pantalla que muestra el saldo
    document.getElementById("lblSaldo").innerHTML = saldo;
}

for (let i = 0; i < fichas.length; i++) {
    const fichaElement = document.getElementById("ficha" + fichas[i]);

    fichaElement.addEventListener("click", function () {
        montoFichaSeleccionada = fichas[i];
        actualizarGanancia(); // Actualiza la ganancia al seleccionar una nueva ficha
    }, false);
}

// Nueva función para manejar el historial de números


function actualizarHistorialNumeros(numero) {
    historialNumeros.push(numero);

    // Muestra hasta un máximo de 6 números en el historial
    if (historialNumeros.length > 6) {
        historialNumeros.shift();  // Elimina el primer elemento (el más antiguo)
    }

    // Actualiza los elementos HTML con el historial de números
    const seccion1 = document.querySelector('.seccion1');
    seccion1.innerHTML = '';  // Borra el contenido actual

    // Añade seis huecos al div con la clase seccion1
    for (var i = 0; i < 6; i++) {
        const numeroFrio = document.createElement('div');
        numeroFrio.className = 'numero-frio';

        // Calcula el índice inverso para mostrar los números en orden inverso
        const indiceInverso = historialNumeros.length - 1 - i;

        if (historialNumeros[indiceInverso] !== undefined) {
            numeroFrio.textContent = historialNumeros[indiceInverso];
        }

        seccion1.appendChild(numeroFrio);
    }
}

/////////////////////
// Función para actualizar el historial de números calientes
function actualizarHistorialNumeros(numero) {
    historialNumeros.push(numero);

    // Muestra hasta un máximo de 6 números en el historial
    if (historialNumeros.length > 6) {
        historialNumeros.shift();  // Elimina el primer elemento (el más antiguo)
    }

    // Actualiza los elementos HTML con el historial de números fríos
    const seccion1 = document.querySelector('.seccion1');
    seccion1.innerHTML = '';  // Borra el contenido actual

    // Añade seis huecos al div con la clase seccion1
    for (var i = 0; i < 6; i++) {
        const numeroFrio = document.createElement('div');
        numeroFrio.className = 'numero-frio';

        // Calcula el índice inverso para mostrar los números en orden inverso
        const indiceInverso = historialNumeros.length - 1 - i;

        if (historialNumeros[indiceInverso] !== undefined) {
            numeroFrio.textContent = historialNumeros[indiceInverso];
        }

        seccion1.appendChild(numeroFrio);
    }

    // Actualiza los números calientes
    actualizarNumerosCalientes();
    
}

// Función para actualizar los números calientes
function actualizarNumerosCalientes() {
    // Cuenta la frecuencia de cada número en el historial
    const frecuenciaNumeros = {};
    historialNumeros.forEach(numero => {
        frecuenciaNumeros[numero] = (frecuenciaNumeros[numero] || 0) + 1;
    });

    // Ordena los números por frecuencia descendente
    const numerosOrdenados = Object.keys(frecuenciaNumeros).sort((a, b) => frecuenciaNumeros[b] - frecuenciaNumeros[a]);

    // Actualiza los números calientes (los 4 más frecuentes)
    numerosCalientes = numerosOrdenados.slice(0, 4);

    // Actualiza los elementos HTML con los números calientes
    const seccionNumerosCalientes = document.querySelector('.seccion');
    seccionNumerosCalientes.innerHTML = '';  // Borra el contenido actual

    // Añade los números calientes al div con la clase seccion
    for (let i = 0; i < 4; i++) {
        const numeroCaliente = document.createElement('div');
        numeroCaliente.className = 'numero-caliente';

        if (numerosCalientes[i] !== undefined) {
            numeroCaliente.textContent = numerosCalientes[i];
        }

        seccionNumerosCalientes.appendChild(numeroCaliente);
    }
}



////////////////
// Función para actualizar los números fríos y menos frecuentes

// Función para realizar la apuesta
function agregarApuesta(casilla) {
    var apuesta = new Apuesta(casilla, montoFichaSeleccionada);
    apuestas.push(apuesta);
    apuestaActual += montoFichaSeleccionada;
    actualizarSaldoEnPantalla();
    // Actualiza el contenido del elemento HTML con la apuesta actual
    etiquetaApuesta.textContent = apuestaActual;
}

// Resto del código...
const etiquetaApuesta = document.getElementById('infoApuesta');

function agregarApuesta(casilla) {
    var apuesta = new Apuesta(casilla, montoFichaSeleccionada);
    apuestas.push(apuesta);
    apuestaActual += montoFichaSeleccionada;
    actualizarSaldoEnPantalla();
    // Actualiza el contenido del elemento HTML con la apuesta actual
    etiquetaApuesta.textContent = apuestaActual;
}

// Resto del código...






