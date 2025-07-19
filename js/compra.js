const API_URL='http://localhost:3000/api';

const precio ={ 
    "Rock en Rio 2025":75.00,
    "Pop Festival":50.00,
    "Jass Night":40.00,
    "Electronic Music Fest":60.00
};

let formulario, eventoSelect, cantidadInput, precioTotal, mensajeDiv, btnComprar;

document.addEventListener('DOMContentLoaded',function(){
    formulario = document.getElementById('formularioComprar');
    eventoSelect = document.getElementById('evento');
    cantidadInput = document.getElementById('cantidad');
    precioTotal = document.getElementById('precioTotal');
    mensajeDiv = document.getElementById('mensaje');
    btnComprar = document.getElementById('btnComprar');

    configuraEventListeners();

    probarApi();
});

function configuraEventListeners(){
    eventoSelect.addEventListener('change');
    cantidadInput.addEventListener('input');
    formulario.addEventListener('submit');
}

function calcularPrecio(){
    const eventoSeleccionar = eventoSelect.value;
    const cantidad = parseInt(cantidadInput.value) || 0;

    if(eventoSeleccionar && cantidad > 0){
        const precioUnit = precio[eventoSeleccionar];
        const total = precioUnit * cantidad;
        precioTotal.value = 'Precio total: $${total.toFixed(2)}';
    }else{
        precioTotal.value = 'Precio total: $0.00';
    }
}

async function enviarCompra(datoCompra) {
    try {
        const response = await fetch('${API_URL}/boletos',{
            method:'POST'
        
        });
    }
}