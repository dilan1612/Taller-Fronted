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
function mostrarInstrumentosEnTabla(instrumentos) {
  const tabla = document.getElementById('tabla-instrumentos');
  tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

  instrumentos.forEach(instrumento => {
    const fila = document.createElement('tr');

    const celdaId = document.createElement('td');
    celdaId.textContent = instrumento.id;
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

    tabla.appendChild(fila);
  });
}

// Llamar a la función cuando la página haya cargado completamente
document.addEventListener('DOMContentLoaded', obtenerInstrumentos);
