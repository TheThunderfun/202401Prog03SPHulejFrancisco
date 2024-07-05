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

class Empleado extends Persona {

    constructor(id, nombre, apellido, edad, sueldo, ventas) {

        super(id, nombre, apellido, edad);

        if ((ventas > 0 && ventas !== null) && (sueldo > 0 && sueldo !== null)) {
            this.ventas = ventas;
            this.sueldo = sueldo;
        }
    }

    ToString() {
        return `${super.ToString()},Ventas: ${this.ventas},Sueldo:${this.sueldo}`;
    }
    ToJson() {
        return {
            ...super.ToJson(),
            ventas: this.ventas,
            sueldo: this.sueldo,
        };
    }
}


class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {

        super(id, nombre, apellido, edad);

        if (telefono != null) {
            this.compras = compras;
            this.telefono = telefono;
        }
    }

    ToString() {

        return `${super.ToString()},Compras: ${this.compras}telefono: ${this.telefono}`;
    }
    ToJson() {
        return {
            ...super.ToJson(),
            telefono: this.telefono,
            compras: this.compras,
        };
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
inputEdad = document.getElementsByName("inputEdad");

inp1 = document.getElementsByName("inp1");
lbl1 = document.getElementById("lbl1");

inp2 = document.getElementsByName("inp2");
lbl2 = document.getElementById("lbl2");
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
function MostrarFormAbm() {
    contenedorGrid.style.display = "none"
    formABM.style.display = "block";
    botonEliminar.style.display = "none";
    botonModificar.style.display = "none";
}

function obtenerDatosFormAbm() {

    let id = inputID[0].value;
    let nombre = inputNombre[0].value;
    let apellido = inputApellido[0].value;
    let edad = inputEdad[0].value;
    let tipoPersona = inputSelect.value;

    let persona;

    if (tipoPersona === "Cliente") {
        let telefono = inp1[0].value;
        let compras = inp2[0].value;
        persona = new Cliente(parseInt(id), nombre, apellido, parseInt(edad), parseInt(compras), parseInt(telefono));
    } else {
        let ventas = inp1[0].value;
        let sueldo = inp2[0].value;
        persona = new Empleado(parseInt(id), nombre, apellido, parseInt(edad), parseInt(sueldo), parseInt(ventas));
    }

    return persona;
}
function limpiarFormABM() {
    inputNombre[0].value = "";
    inputApellido[0].value = "";
    inputEdad[0].value = "";
    inp1[0].value = "";
    inp2[0].value = "";
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
    inputEdad[0].value = persona.edad;

    if (persona instanceof Empleado) {
        inputSelect.value = "Empleado";
        lbl1.textContent = "Ventas";
        inp1[0].value = persona.ventas;
        lbl2.textContent = "Sueldo";
        inp2[0].value = persona.sueldo;

    } else {
        inputSelect.value = "Cliente";
        inp1[0].value = persona.telefono;
        lbl1.textContent = "Telefono";
        inp2[0].value = persona.compras;
        lbl2.textContent = "Compras";
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
        <td>${persona.edad}</td>
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

    let fila = button.parentElement.parentElement;

    let id = parseInt(fila.cells[0].textContent);

    let persona = arrayPersonas.find(p => p.id === id);

    if (persona) {
        cargarFormAbm(persona);
        MostrarFormAbm();
    }
}

function handlerAltaPersona() {
    mostrarSpinner();

    // Llamar a la función para agregar la persona
    agregarPersona()
        .then(() => {
            // Ocultar el spinner si todo salió bien
            ocultarSpinner();
            alert("Se creó la persona con éxito");
            ocultarFormAbm();
        })
        .catch(error => {
            // Ocultar el spinner en caso de error y mostrar mensaje de error
            ocultarSpinner();
            console.error('Error:', error);
            alert("No se pudo realizar la operación.");
            ocultarFormAbm(); // Aquí decide si también quieres ocultar el formulario en caso de error
        });
}

async function handlerModfPersona() {
    mostrarSpinner();
    await modificarPersona();
    ocultarFormAbm();
    alert("Se modifico la persona con exito");
    ocultarSpinner();
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

async function modificarPersona() {

    let persona = obtenerDatosFormAbm()
    // console.log(persona.nombre);
    try {
        const response = await fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        });
        console.log('Request payload:', JSON.stringify(persona));
        console.log("Persona:", persona.ToJson());
        if (response.ok) {
            const textResponse = await response.text();
            console.log('Text response:', textResponse);
            console.log(persona.id);
            BorrarDatosTabla();
            actualizarPersonaEnArray(persona);
            cargarPersonasTabla(arrayPersonas);
        } else {
            console.warn("No se pudo realizar la operación:", response.statusText);
        }
    } catch (error) {
        console.log("error");
        //console.log(data);
    }
}

let gifBack = document.getElementById('loading-contenedor');
//let formABM = document.getElementById("FormAgregar");


function obtenerDatosXML() {
    mostrarSpinner();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            personas = data;

            personas.forEach(element => {
                if (element.hasOwnProperty('ventas')) {
                    let empleado = new Empleado(element.id, element.nombre, element.apellido, element.edad, element.sueldo, element.ventas);
                    arrayPersonas.push(empleado);
                } else {
                    let cliente = new Cliente(element.id, element.nombre, element.apellido, element.edad, element.compras, element.telefono);
                    arrayPersonas.push(cliente);
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
        gifBack.style.display = "none"; // Asegurarse de ocultar el contenedor de carga en caso de error
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
        let edad = inputEdad[0].value;
        let tipoPersona = inputSelect.value;
        let id = 1;
        let persona;

        if (tipoPersona === "Cliente") {
            let telefono = inp1[0].value;
            let compras = inp2[0].value;
            persona = new Cliente(id, nombre, apellido, edad, compras, telefono);
        } else {
            let ventas = inp1[0].value;
            let sueldo = inp2[0].value;
            persona = new Empleado(id, nombre, apellido, edad, sueldo, ventas);
        }

        let body = {};
        if (tipoPersona === "Cliente") {
            body = {
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                compras: inp2[0].value,
                telefono: inp1[0].value
            };
        } else if (tipoPersona === "Empleado") {
            body = {
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                ventas: inp1[0].value,
                sueldo: inp2[0].value
            };
        }

        fetch('http://localhost:8080/PersonasEmpleadosClientes.php', {
            method: 'PUT',
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
                let id = data.id; // Suponiendo que el servidor devuelve el ID creado
                body.id = id;

                let persona;
                if (tipoPersona === "Cliente") {
                    persona = new Cliente(body.id, body.nombre, body.apellido, body.edad, body.compras, body.telefono);
                } else if (tipoPersona === "Empleado") {
                    persona = new Empleado(body.id, body.nombre, body.apellido, body.edad, body.sueldo, body.ventas);
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
// botonAceptarAbm.addEventListener("click", function () {
//     mostrarSpinner();

//     // Llamar a la función para agregar la persona
//     agregarPersona()
//         .then(() => {
//             // Ocultar el spinner si todo salió bien
//             ocultarSpinner();
//             alert("Se creó la persona con éxito");
//             ocultarFormAbm();
//         })
//         .catch(error => {
//             // Ocultar el spinner en caso de error y mostrar mensaje de error
//             ocultarSpinner();
//             console.error('Error:', error);
//             alert("No se pudo realizar la operación.");
//             ocultarFormAbm(); // Aquí decide si también quieres ocultar el formulario en caso de error
//         });
// });





// async function obtenerDatosFetch() {
//     let gifBack = document.getElementById('loading-contenedor');
//     //let gif = document.getElementById('loading');
//     try {
//         // gif.style.display = "block";
//         gifBack.style.display = "block";
//         let response = await fetch('http://localhost:8080/PersonasEmpleadosClientes.php')
//         let data = await response.json();
//         personas = data;

//         personas.forEach(element => {
//             if (element.hasOwnProperty('ventas')) {
//                 let empleado = new Empleado(element.id, element.nombre, element.apellido, element.edad, element.ventas, element.sueldo);
//                 arrayPersonas.push(empleado);
//             } else {
//                 let cliente = new Cliente(element.id, element.nombre, element.apellido, element.edad, element.compras, element.telefono);
//                 arrayPersonas.push(cliente);
//             }
//         });

//         cargarPersonasTabla(arrayPersonas);
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         gifBack.style.display = "none";
//         // gif.style.display = "none"
//     }
// }

