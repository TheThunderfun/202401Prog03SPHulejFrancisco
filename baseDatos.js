class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
        if (id != null && nombre != null && apellido != null) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.fechaNacimiento = fechaNacimiento;
        }
    }
    ToString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Fecha nacimiento: ${this.fechaNacimiento}`;
    }
}

class Ciudadano extends Persona {

    constructor(id, nombre, apellido, fechaNacimiento, dni) {

        super(id, nombre, apellido, fechaNacimiento);

        if (dni > 0) {
            this.dni = dni;
        }
    }

    ToString() {
        return `${super.ToString()},Fecha de nacimiento:${this.fechaNacimiento}}`;
    }

}


class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {

        super(id, nombre, apellido, fechaNacimiento);

        if (paisOrigen != null) {
            this.paisOrigen = paisOrigen;
        }
    }
    ToString() {

        return `${super.ToString()},Pais origen: ${this.paisOrigen}`;
    }
}


let personas = [];
const arrayPersonas = [];

//main
const botonAgregarGrid = document.getElementById("botonAgregarGrid");
const formABM = document.getElementById("FormAgregar");
const contenedorGrid = document.getElementById("contenedorGrid");
const tablaDatos = document.getElementById("tablaDatos");
//ABM
formABM.style.display = "none";
inputID = document.getElementsByName("inputId");
inputNombre = document.getElementsByName("inputNombre");
inputApellido = document.getElementsByName("inputApellido");
inputFechaNacimiento = document.getElementsByName("inputEdad");

inp1 = document.getElementsByName("inp1");
lbl1 = document.getElementById("lbl1");

inputSelect = document.getElementById("TipoSelect");

botonAceptarAbm = document.getElementById("botonAceptarABM");
//Tabla
function BorrarDatosTabla() {
    const filas = tablaDatos.querySelectorAll("tr:not(:first-child)");
    filas.forEach(filas => {
        tablaDatos.removeChild(filas);
    });
}

//ABM
function ValidarDatosAbm() {

    console.log(inputSelect.value);
    if ((inputNombre[0].value) === null || inputNombre[0].value.trim() === "" || isNaN(inputNombre[0].value) === false) {
        alert("Debe indicar un nombre valido");
        return false;
    }
    if ((inputApellido[0].value) === null || inputApellido[0].value.trim() === "" || isNaN(inputApellido[0].value) === false) {
        alert("Debe indicar un apellidovalido ");
        return false;
    }
    if (isNaN(inputFechaNacimiento[0].value)) {
        alert("Debe indicar un una fecha de nacimiento en valor numerico");
        return false;
    }

    if (inputFechaNacimiento[0].value === null) {
        alert("Debe indicar una fecha de nacimiento");
        return false;
    }
    switch (inputSelect.value) {
        case "Ciudadano":
            if (isNaN(inp1[0].value)) {
                alert("Debe indicar un dni en valor numerico");
                return false;
            }

            if (parseInt(inp1[0].value) < 0) {
                alert("Debe indicar un dni mayor a 0");
                return false;
            }
            if (inp1[0].value === null || inp1[0].value.trim() === "") {
                alert("Debe indicar un dni");
                return false;
            }

            break;
        case "Extranjero":
            if ((inp1[0].value) == null) {
                alert("Debe ingresar un dato");
                return false;
            }
            break;
    }
    return true;
}
function MostrarFormAbm() {
    contenedorGrid.style.display = "none"
    formABM.style.display = "block";
    botonEliminar.style.display = "none";
    botonModificar.style.display = "none";
}

function cambiarEstadoCamposAbm(bool) {
    inp1[0].disabled = bool;
    inputNombre[0].disabled = bool;
    inputApellido[0].disabled = bool;
    inputFechaNacimiento[0].disabled = bool;

}
function obtenerDatosFormAbm() {

    let id = inputID[0].value;
    let nombre = inputNombre[0].value;
    let apellido = inputApellido[0].value;
    let fechaNacimiento = inputFechaNacimiento[0].value;
    let tipoPersona = inputSelect.value;

    let persona;

    if (tipoPersona === "Ciudadano") {
        let dni = inp1[0].value;
        persona = new Ciudadano(parseInt(id), nombre, apellido, parseInt(fechaNacimiento), parseInt(dni));
    } else {
        let paisOrigen = inp1[0].value;
        persona = new Extranjero(parseInt(id), nombre, apellido, parseInt(fechaNacimiento), paisOrigen);
    }

    return persona;
}
function limpiarFormABM() {
    inputNombre[0].value = "";
    inputApellido[0].value = "";
    inputFechaNacimiento[0].value = "";
    inp1[0].value = "";
    inputSelect.disabled = false;
}
function ocultarFormAbm() {
    formABM.style.display = "none";
    contenedorGrid.style.display = "block"
}

//Both
botonAgregarGrid.addEventListener("click", function () {

    botonAceptarAbm.removeEventListener("click", handlerElimPersona);
    botonAceptarAbm.removeEventListener("click", handlerModfPersona);

    botonAceptarAbm.addEventListener("click", handlerAltaPersona);
    cambiarEstadoCamposAbm(false);
    limpiarFormABM();
    MostrarFormAbm();
});

botonCancelar.addEventListener("click", function () {
    ocultarFormAbm();
});

function cargarFormAbm(persona) {
    inputID[0].value = persona.id;
    inputNombre[0].value = persona.nombre;
    inputApellido[0].value = persona.apellido;
    inputFechaNacimiento[0].value = persona.fechaNacimiento;

    if (persona instanceof Ciudadano) {
        inputSelect.value = "Ciudadano";
        lbl1.textContent = "DNI";
        inp1[0].value = persona.dni;

    } else {
        inputSelect.value = "Extranjero";
        inp1[0].value = persona.paisOrigen;
        lbl1.textContent = "Pais origen";
    }
    inputSelect.disabled = true;
}

function cargarPersonasTabla(array) {

    array.forEach(persona => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.fechaNacimiento}</td>
        <td><button onclick="MostrarPersonaMod(this)">Modificar</button></td>
        <td><button onclick="MostrarPersonaElim(this)">Eliminar</button></td>
        `
        tablaDatos.appendChild(fila);
    })

}

function MostrarPersonaMod(button) {

    botonAceptarAbm.removeEventListener("click", handlerAltaPersona);
    botonAceptarAbm.removeEventListener("click", handlerElimPersona);

    botonAceptarAbm.addEventListener("click", handlerModfPersona);
    cambiarEstadoCamposAbm(false);

    let fila = button.parentElement.parentElement;

    let id = parseInt(fila.cells[0].textContent);

    let persona = arrayPersonas.find(p => p.id === id);

    if (persona) {
        cargarFormAbm(persona);
        MostrarFormAbm();
    }
}


function MostrarPersonaElim(button) {

    botonAceptarAbm.removeEventListener("click", handlerAltaPersona);
    botonAceptarAbm.removeEventListener("click", handlerModfPersona);

    botonAceptarAbm.addEventListener("click", handlerElimPersona);
    cambiarEstadoCamposAbm(true);

    let fila = button.parentElement.parentElement;

    let id = parseInt(fila.cells[0].textContent);

    let persona = arrayPersonas.find(p => p.id === id);

    if (persona) {
        cargarFormAbm(persona);
        MostrarFormAbm();
    }
}

function handlerAltaPersona() {

    if (ValidarDatosAbm()) {
        mostrarSpinner();
        agregarPersona()
            .then(() => {
                ocultarSpinner();
                alert("Se creó la persona con éxito");
                ocultarFormAbm();
            })
            .catch(error => {

                ocultarSpinner();
                console.error('Error:', error);
                alert("No se pudo realizar la operación.");
                ocultarFormAbm();
            });
    }

 
}

async function handlerModfPersona() {

    if (ValidarDatosAbm()) {
        mostrarSpinner();
        await modificarPersona();
        ocultarFormAbm();
        alert("Se modifico la persona con exito");
        ocultarSpinner();
    }

}
async function handlerElimPersona() {
    mostrarSpinner();
    await eliminarPersona();
    ocultarFormAbm();
    alert("Se elimino la persona con exito");
    ocultarSpinner();

}

function actualizarPersonaEnArray(persona) {
    const index = arrayPersonas.findIndex(p => p.id === persona.id);
    if (index !== -1) {
        arrayPersonas[index] = persona;
    }
    console.log(index);
    console.log(arrayPersonas);
}

function eliminarPersonaArray(id) {
    const index = arrayPersonas.findIndex(persona => persona.id === id);

    if (index !== -1) {
        arrayPersonas.splice(index, 1);
    }
}

function actualizarTabla() {
    tablaDatos.innerHTML = '';
    cargarPersonasTabla(arrayPersonas);
}

async function eliminarPersona() {
    let persona = obtenerDatosFormAbm();
    let idPersona = persona.id;

    try {
        const response = await fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idPersona })
        });

        if (response.ok) {
            eliminarPersonaArray(idPersona);
            BorrarDatosTabla();
            cargarPersonasTabla(arrayPersonas);
        } else {
            console.warn('No se pudo realizar la operación:', response.statusText);
            throw new Error('Error en la solicitud DELETE');
        }
    } catch (error) {
        console.error('Error de red o servidor:', error);
        throw new Error('Error de red o servidor');
    }
}

function modificarPersona() {

    let persona = obtenerDatosFormAbm()
    mostrarSpinner();
    // console.log(persona.nombre);
    return new Promise((resolve, reject) => {

        fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        })
            .then(response => {

                ocultarSpinner();

                if (response.ok) {

                    BorrarDatosTabla();
                    actualizarPersonaEnArray(persona);
                    cargarPersonasTabla(arrayPersonas);

                    ocultarFormAbm();

                    resolve(); 
                } else {
                    console.warn('No se pudo realizar la operación:', response.statusText);
                    reject('No se pudo realizar la operación');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);


                ocultarSpinner();


                console.warn('No se pudo realizar la operación:', error);
                ocultarFormAbm();
                reject('Error en la solicitud');
            });
    });
}


let gifBack = document.getElementById('loading-contenedor');
//let formABM = document.getElementById("FormAgregar");




function obtenerDatosXML() {
    mostrarSpinner();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', false);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            personas = data;

            personas.forEach(element => {
                if (element.hasOwnProperty('dni')) {
                    let ciudadano = new Ciudadano(element.id, element.nombre, element.apellido, element.fechaNacimiento, element.dni);
                    arrayPersonas.push(ciudadano);
                } else {
                    let extranjero = new Extranjero(element.id, element.nombre, element.apellido, element.fechaNacimiento, element.paisOrigen);
                    arrayPersonas.push(extranjero);
                }
            });

            cargarPersonasTabla(arrayPersonas);

        } else {
            console.warn("Error al obtener los datos:", xhr.statusText);
        }
        ocultarSpinner();
    };

    xhr.onerror = function () {
        console.error("Error en la solicitud:", xhr.statusText);
        gifBack.style.display = "none"; 
    };

    xhr.send();
}
console.log(arrayPersonas);


obtenerDatosXML();


function agregarPersona() {
    return new Promise((resolve, reject) => {
        inputID[0].value = "";
        let nombre = inputNombre[0].value;
        let apellido = inputApellido[0].value;
        let fechaNacimiento = inputFechaNacimiento[0].value;
        let tipoPersona = inputSelect.value;
        let id = 1;
        let persona;

        if (tipoPersona === "Ciudadano") {
            let dni = inp1[0].value;
            persona = new Ciudadano(id, nombre, apellido, fechaNacimiento, dni);
        } else {
            let paisOrigen = inp1[0].value;
            persona = new Extranjero(id, nombre, apellido, fechaNacimiento, paisOrigen);
        }

        let body = {};
        if (tipoPersona === "Ciudadano") {
            body = {
                nombre: nombre,
                apellido: apellido,
                fechaNacimiento: fechaNacimiento,
                dni: inp1[0].value,
            };
        } else if (tipoPersona === "Extranjero") {
            body = {
                nombre: nombre,
                apellido: apellido,
                fechaNacimiento: fechaNacimiento,
                paisOrigen: inp1[0].value
            };
        }

        fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                let id = data.id; 
                body.id = id;

                let persona;
                if (tipoPersona === "Ciudadano") {
                    persona = new Ciudadano(body.id, body.nombre, body.apellido, body.fechaNacimiento, body.dni);
                } else if (tipoPersona === "Extranjero") {
                    persona = new Extranjero(body.id, body.nombre, body.apellido, body.fechaNacimiento, body.paisOrigen);
                }
                BorrarDatosTabla();
                arrayPersonas.push(persona);
                cargarPersonasTabla(arrayPersonas);

                resolve();
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

function mostrarSpinner() {
    gifBack.style.display = "block";
}

function ocultarSpinner() {
    gifBack.style.display = "none";
}


