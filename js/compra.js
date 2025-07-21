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
    eventoSelect.addEventListener('change',calcularPrecio);
    cantidadInput.addEventListener('input',calcularPrecio);
    formulario.addEventListener('submit',envioFormulario);
}

function calcularPrecio(){
    const eventoSeleccionar = eventoSelect.value;
    const cantidad = parseInt(cantidadInput.value) || 0;

    if(eventoSeleccionar && cantidad > 0){
        const precioUnit = precio[eventoSeleccionar];
        const total = precioUnit * cantidad;
        precioTotal.value = `Precio total: $${total.toFixed(2)}`;;
    }else{
        precioTotal.value = 'Precio total: $0.00';
    }
}

async function enviarCompra(datoCompra) {
    try {
        const response = await fetch(`${API_URL}/boletos`,{
            method:'POST',
            headers:{
                'Content-Type':'applicaction/json'
            },
            body:JSON.stringify(datoCompra)
        });
        const result = await response.json();
        if(response.ok && result.success){
            mostrarMensaje('Compra registrada! Tu ID de compra es:'+result.id,'success');
            formulario.reset();
            precioTotal.value = 'Precio total: $0.00';
        }else{
            mostrarMensaje('Error al procesar la comprar:'+(result.message || 'Error desconocido'),'error');
        }
    }catch(error){
        console.error('Error:',error);
        mostrarMensaje('Error de conexion con el servidor. Verifica que la APIeste funcinoando','Error');
    }
}

async function envioFormulario(e) {
    e.preventDefault();
    btnComprar.disabled=true;
    btnComprar.value='PROCESANDO...';
    mostrarMensaje('Procesando comprar...');

    try{
        const formDato = new FormData(formulario);
        const eventoSeleccionar = formDato.get('evento');
        const cantidad = parseInt(formDato.get('cantidad'));
        const precioUnit = precio[eventoSeleccionar];
        const precioTota = precioUnit * cantidad;

        const datoCompra = {
            cedula: formData.get('cedula'),
            nombreCliente: `${formData.get('nombre')} ${formData.get('apellido')}`,
            email: formData.get('correo'),
            telefono: formData.get('telefono'),
            numeroTarjeta: formData.get('tarjeta').slice(-4), 
            concierto: eventoSeleccionado,
            cantidadBoletos: cantidad,
            precio: precioTota,
            fechaCompra: new Date().toISOString()
        };
        await enviarCompra(datoCompra)
    }catch(error){
        console.error('Error al procesar el formulario:',error);
    }
    btnComprar.disabled=false;
    btnComprar.value='Comprar';
}

async function probarAPI() {
    try {
        const response = await fetch(`${API_URL}/test`);
        const resultado = await response.json();
        console.log('Conexión con API establecida:', resultado);
    } catch (error) {
        console.error('Error conectando con la API:', error);
        mostrarMensaje('No se pudo conectar con el servidor. Asegúrate de que la API esté funcionando.', 'error');
    }
}