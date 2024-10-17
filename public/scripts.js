// Función para obtener y mostrar los instrumentos
(() => {
  fetch('https://backend-trp2.onrender.com/instruments')
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})();

// Escuchar el evento de clic para enviar datos a la API
document.querySelector("#btnSend").addEventListener('click', () => {
  const id = document.querySelector('#id').value;
  const type = document.querySelector('#type').value;
  const marca = document.querySelector('#marca').value;
  const peso = document.querySelector('#peso').value;
  const value = document.querySelector('#value').value;

  const data = { id: id, type: type, marca: marca, peso: peso, value: value };

  const URL = "https://backend-trp2.onrender.com/instruments/670b2b28860a3c720bff103f";

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
});

// URL de tu API
const API_URL = 'https://backend-trp2.onrender.com/instruments';

// Función para obtener los instrumentos desde la API
async function obtenerInstrumentos() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }

    const resultado = await response.json();

    // Asegúrate de acceder a la propiedad 'data'
    const instrumentos = resultado.data; 

    mostrarInstrumentosEnTabla(instrumentos);
  } catch (error) {
    console.error('Error al obtener los instrumentos:', error);
  }
}

// Función para mostrar los instrumentos en la tabla HTML
// Función para mostrar los instrumentos en la tabla HTML
function mostrarInstrumentosEnTabla(instrumentos) {
  const tabla = document.getElementById('tabla-instrumentos');
  tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

  instrumentos.forEach(instrumento => {
    const fila = document.createElement('tr');

    const celdaId = document.createElement('td');
    celdaId.textContent = instrumento.id; // Asumimos que 'id' es un campo personalizado
    fila.appendChild(celdaId);

    const celdaTipo = document.createElement('td');
    celdaTipo.textContent = instrumento.type;
    fila.appendChild(celdaTipo);

    const celdaMarca = document.createElement('td');
    celdaMarca.textContent = instrumento.marca;
    fila.appendChild(celdaMarca);

    const celdaPeso = document.createElement('td');
    celdaPeso.textContent = instrumento.peso;
    fila.appendChild(celdaPeso);

    const celdaValor = document.createElement('td');
    celdaValor.textContent = `$${instrumento.value}`;
    fila.appendChild(celdaValor);

    // Celda para el botón de eliminar
    const celdaEliminar = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('btn-delete');
    botonEliminar.addEventListener('click', () => eliminarInstrumento(instrumento._id)); // Aquí usamos _id
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    // Celda para el botón de actualizar
    const celdaActualizar = document.createElement('td');
    const botonActualizar = document.createElement('button');
    botonActualizar.textContent = 'Actualizar';
    botonActualizar.classList.add('btn-update');
    botonActualizar.addEventListener('click', () => {
      // Redirigir a la vista de edición con el _id en la URL
      window.location.href = `edit.html/?objectId=${instrumento._id}`;
    });
    celdaActualizar.appendChild(botonActualizar);
    fila.appendChild(celdaActualizar);

    tabla.appendChild(fila);
  });
}


// Función para eliminar un instrumento usando el _id
function eliminarInstrumento(objectId) {
  const url = `${API_URL}/${objectId}`; // Usamos el _id del instrumento
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Instrumento eliminado:', data);
    obtenerInstrumentos(); // Actualizar la tabla después de eliminar
  })
  .catch(error => console.error('Error al eliminar el instrumento:', error));
}


// Llamar a la función cuando la página haya cargado completamente
document.addEventListener('DOMContentLoaded', obtenerInstrumentos);