// Función para guardar una nueva factura en localStorage
function guardarFactura(cliente, monto, fecha) {
    const facturas = obtenerFacturas();
    const nuevaFactura = { cliente, monto, fecha: fecha.toISOString() };  // Guardamos la fecha como una cadena ISO
    facturas.push(nuevaFactura);
    
    // Guardar el objeto completo en localStorage
    localStorage.setItem('facturas', JSON.stringify(facturas));
}

// Función para obtener las facturas desde localStorage
function obtenerFacturas() {
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    // Convertir las cadenas de fecha de nuevo a objetos Date
    return facturas.map(factura => ({
        ...factura,
        fecha: new Date(factura.fecha)
    }));
}

// Función para mostrar las facturas en la tabla
function mostrarFacturas() {
    const facturas = obtenerFacturas();
    const tableBody = document.getElementById('facturasTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Limpiar la tabla antes de mostrar las nuevas facturas

    facturas.forEach(factura => {
        const row = tableBody.insertRow(-1);
        row.insertCell(0).textContent = factura.cliente;
        row.insertCell(1).textContent = `$${factura.monto.toFixed(2)}`;
        row.insertCell(2).textContent = factura.fecha.toDateString();  // Mostrar la fecha formateada
    });
}

// Event listener para el formulario
document.getElementById('facturaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cliente = this.elements['cliente'].value;
    const monto = parseFloat(this.elements['monto'].value);
    const fecha = new Date(this.elements['fecha'].value);

    if (isNaN(monto) || fecha.toString() === 'Invalid Date') {
        alert('Por favor, ingrese datos válidos.');
        return;
    }

    guardarFactura(cliente, monto, fecha);
    mostrarFacturas();
    this.reset(); // Reiniciar el formulario
});

// Mostrar facturas al cargar la página
window.onload = mostrarFacturas;
