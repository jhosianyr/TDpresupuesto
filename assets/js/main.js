let btnCalcular = document.getElementById("btnCalcular");
let presupuesto = document.getElementById("presupuesto");
let btnAnadir = document.getElementById("btnAnadir");
let listaGastos = [];

function Gasto(nombre, monto) {
    this.nombre = nombre;
    this.monto = monto;
};

function formatoNumero(texto) {
    return texto.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function actualizarSaldo() {
    let saldo = document.getElementById("saldo");
    let pptoResumen = presupuesto.innerHTML.replaceAll(".", "");
    let gastosResumen = listaGastos.reduce((acumulador, valorActual) => acumulador + valorActual.monto, 0);
    let nuevoSaldo = pptoResumen - gastosResumen;
    saldo.innerText = formatoNumero(String(nuevoSaldo));
    return nuevoSaldo;
}

function actualizarGasto() {
    let totalGastos = document.getElementById("totalGastos");
    let gastoActualizado = listaGastos.reduce((acumulador, valorActual) => acumulador + valorActual.monto, 0);
    totalGastos.innerText = formatoNumero(String(gastoActualizado));
}

function agregarGasto(nombre, monto) {
    let gasto = new Gasto(nombre, monto);;
    listaGastos.push(gasto);
    let computoSaldo = actualizarSaldo();
    if (computoSaldo < 0) {
        listaGastos.pop();
        alert("¡No tienes saldo suficiente para cubrir ese gasto!")
    } else {
        actualizarGasto();
    };
    actualizarSaldo();
}

function actualizarTabla() {
    let bodyTabla = document.getElementById("bodyTabla");
    let html = "";
    listaGastos.forEach((gasto, index) => {
        html += `
        <tr>
            <td>${gasto.nombre}</td>
            <td>${gasto.monto}</td>
            <td style="cursor: pointer;"><i class="fa-solid fa-trash" onclick="eliminar(${index})"></i></td>
        </tr>
        `
    })
    bodyTabla.innerHTML = html;
    actualizarSaldo();
}

function eliminar(index) {
    listaGastos = listaGastos.filter((gasto, indice) => indice != index);
    actualizarGasto();
    actualizarTabla();
}

btnCalcular.addEventListener('click', function () {
    let inputPresupueto = document.getElementById("inputPresupueto");
    let formAnadir = document.getElementById("formAnadir");
    let formCalcular = document.getElementById("formCalcular");
    inputPresupueto.value !== "" ? presupuesto.innerHTML = formatoNumero(inputPresupueto.value) : alert("Debes ingresar un presupuesto");
    actualizarSaldo();
    if (inputPresupueto.value >= 0) {
        formAnadir.removeAttribute("disabled");
        formCalcular.setAttribute("disabled", true);
    } else {
        formAnadir.setAttribute("disable", true);
    };
})

btnAnadir.addEventListener('click', function () {
    let inputNombreGasto = document.getElementById("inputNombreGasto");
    let inputMontoGasto = document.getElementById("inputMontoGasto");
    let nombre = inputNombreGasto.value;
    let monto = parseInt(inputMontoGasto.value);
    if (nombre !== "" && monto >= 0) {
        agregarGasto(nombre, monto);
        actualizarTabla();
    } else {
        alert("Debes completar los ambos campos para agregar un gasto")
    }
})