let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let posicionModificar = -1; // Para identificar si estamos en modo de edición

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    // Verifica si estamos agregando o modificando
    if (nombreGasto == '' || valorGasto == '') {
        alert('Ingresa el nombre y el valor del gasto');
    } else {
        if (posicionModificar === -1) {
            // Si no estamos modificando, se agrega el nuevo gasto
            listaNombresGastos.push(nombreGasto);
            listaValoresGastos.push(valorGasto);
            listaDescripcionGastos.push(descripcionGasto);
        } else {
            // Si estamos en modo de edición, actualizamos los datos en la posición correspondiente
            listaNombresGastos[posicionModificar] = nombreGasto;
            listaValoresGastos[posicionModificar] = valorGasto;
            listaDescripcionGastos[posicionModificar] = descripcionGasto;
            posicionModificar = -1; // Salimos del modo de edición
        }
        
        actualizarListaGastos();
    }
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionGastos[posicion]; // Tomamos la descripción de la lista
        htmlLista += `<li> Nombre: ${elemento} - Costo: USD ${valorGasto.toFixed(2)} <br> Descripción: ${descripcionGasto}
        <button onclick="modificarGasto(${posicion})">Modificar</button>
        <button onclick="eliminarGasto(${posicion})">Eliminar</button></li>`;
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1); // Eliminar también la descripción
    actualizarListaGastos();
}

function modificarGasto(posicion) {
    // Cargamos los datos actuales en los campos de entrada
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionGastos[posicion];

    // Guardamos la posición para actualizar el gasto cuando se haga clic en el botón
    posicionModificar = posicion;
}
