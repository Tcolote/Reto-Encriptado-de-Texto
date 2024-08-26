// Selección de elementos
var botonEncriptar = document.querySelector(".btnencriptar");
var botonDesencriptar = document.querySelector(".btndesencriptar");
var muneco = document.querySelector(".contenedormuneco img");
var contenedorParrafo = document.querySelector(".contenedorparrafo");
var resultado = document.querySelector(".textoresultado");
var cajaTexto = document.querySelector(".texto");
var mensajeError = document.querySelector("#mensaje-error"); // Elemento para mostrar el mensaje de error

// Event listeners para los botones
botonEncriptar.addEventListener("click", encriptar);
botonDesencriptar.addEventListener("click", desencriptar);

function encriptar() {
    var texto = recuperarTexto();
    if (validarEntrada(texto)) {
        ocultarAdelante();
        resultado.textContent = encriptarTexto(texto);
    }
}

function desencriptar() {
    var texto = recuperarTexto();
    if (validarEntrada(texto)) {
        ocultarAdelante();
        resultado.textContent = desencriptarTexto(texto);
    }
}

function recuperarTexto() {
    return cajaTexto.value;
}

function ocultarAdelante() {
    muneco.classList.add("ocultar");
    contenedorParrafo.classList.add("ocultar");
}

// Función para validar la entrada
function validarEntrada(texto) {
    var regex = /^[a-z\s]*$/;
    if (!regex.test(texto)) {
        mensajeError.textContent = "No se permite ingresar esto";
        mensajeError.classList.remove("ocultar");
        return false;
    } else {
        mensajeError.classList.add("ocultar");
        return true;
    }
}

function encriptarTexto(mensaje) {
    var texto = mensaje;
    var textoFinal = "";

    for (var i = 0; i < texto.length; i++) {
        if (texto[i] === "a") {
            textoFinal += "ai";
        } else if (texto[i] === "e") {
            textoFinal += "enter";
        } else if (texto[i] === "i") {
            textoFinal += "imes";
        } else if (texto[i] === "o") {
            textoFinal += "ober";
        } else if (texto[i] === "u") {
            textoFinal += "ufat";
        } else {
            textoFinal += texto[i];
        }
    }
    return textoFinal;
}

function desencriptarTexto(mensaje) {
    var texto = mensaje;
    var textoFinal = "";

    var mappings = { "ai": "a", "enter": "e", "imes": "i", "ober": "o", "ufat": "u" };
    var keys = Object.keys(mappings);

    for (var i = 0; i < texto.length; i++) {
        var matched = false;
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            if (texto.startsWith(key, i)) {
                textoFinal += mappings[key];
                i += key.length - 1;
                matched = true;
                break;
            }
        }
        if (!matched) {
            textoFinal += texto[i];
        }
    }
    return textoFinal;
}

// Función para copiar el texto al portapapeles
const btnCopiar = document.querySelector(".btncopiar");
btnCopiar.addEventListener("click", () => {
    var contenido = resultado.textContent;
    navigator.clipboard.writeText(contenido).then(() => {
        console.log("Texto copiado al portapapeles");
        // Regresar a la imagen de inicio y limpiar el campo de texto
        cajaTexto.value = ""; // Limpiar el campo de texto
        resultado.textContent = ""; // Limpiar el resultado
        muneco.classList.remove("ocultar"); // Mostrar la imagen de inicio
        contenedorParrafo.classList.remove("ocultar"); // Mostrar el mensaje inicial
        mensajeError.classList.add("ocultar"); // Ocultar el mensaje de error
    });
});
