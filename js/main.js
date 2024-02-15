// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");


let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);


//limpiar la lista de compras incluyendo los campos 
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let totalPrecio = document.getElementById("totalPrecio");

let precio = 0;
let isvalid = true;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array();

btnClear.addEventListener("click", function(event) {
    event.preventDefault(); //evita la funcionalidad predeterminada del boton
    txtNombre.value = "";
    txtNumber.value = "";
    txtNombre.focus(); //regresa el curso al inicio
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    localStorage.removeItem("datos");
    datos = new Array();

    cuerpoTabla.innerHTML = "";
    txtNombre.focus();


}); //btn clear

function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    } //if length

    if (isNaN(txtNumber.value)) {
        return false;
    } //is NaN

    if (Number(txtNumber.value) <= 0) {
        return false;
    } //if

    return true;
} //validar cantidad 

function getPrecio() {
    return parseInt((Math.random() * 90) * 100) / 100;
} //get precio


btnAgregar - addEventListener("click", function(event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = ""; //limpian despues de hacer click
    isvalid = true;
    txtNombre.value = txtNombre.value.trim(); //quita los espacios del campo 
    txtNumber.value = txtNumber.value.trim();

    if (txtNombre.value.length < 3) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `
        El <strong>Nombre </strong>no es correcto.<br/>`);
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red thin";
        isvalid = false;
    } //if length

    if (!validarCantidad()) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `
        La <strong>Cantidad </strong>no es correcta.<br/>`);
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red thin";
        isvalid = false
    } //id validar cantidad

    if (isvalid) {
        contador++;
        precio = getPrecio();
        row = `<tr>
        <td>${contador}</td>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        </tr>
        `;

        let elemento = `{"id" : ${contador},
                     "nombre" : "${txtNombre.value}",
                     "cantidad" : ${txtNumber.value},
                    "precio" : ${precio}
    }`;

        datos.push(JSON.parse(elemento));
        console.log(datos);
        this.localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * (txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);


        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();

    } //if isvalid
}); //btn AGREGAR

window.addEventListener("load", function(event) {
    event.preventDefault();
    if (this.localStorage.getItem("contadorProductos") != null) {
        contador = Number(this.localStorage.getItem("contadorProductos"));
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
        costoTotal = Number(this.localStorage.getItem("costoTotal"));

        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    } //id !=null

    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td> ${r.cantidad}</td>
            <td> ${r.precio}</td>
            </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        }); //foreach
    } //datos null
}); //window load