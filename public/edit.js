// URL base de la API
const API_URL = 'https://backend-trp2.onrender.com/instruments';

// Función para obtener el parámetro 'objectId' de la URL
function getObjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('objectId');
}

// Obtener el 'objectId' de la URL
const objectId = getObjectId();

// Función para cargar los datos del instrumento en el formulario
async function cargarInstrumento(objectId) {
  try {
    const response = await fetch(`${API_URL}/${objectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }

    const instrumento = await response.json();

    // Llenar los campos del formulario con los datos del instrumento
    document.querySelector('#type').value = instrumento.type;
    document.querySelector('#marca').value = instrumento.marca;
    document.querySelector('#peso').value = instrumento.peso;
    document.querySelector('#value').value = instrumento.value;

  } catch (error) {
    console.error('Error al cargar el instrumento:', error);
  }
}

// Función para actualizar el instrumento
async function actualizarInstrumento(objectId) {
  // Obtener los valores del formulario
  const type = document.querySelector('#type').value;
  const marca = document.querySelector('#marca').value;
  const peso = document.querySelector('#peso').value;
  const value = document.querySelector('#value').value;

  const data = {
    type: type,
    marca: marca,
    peso: peso,
    value: value,
  };

  try {
    const response = await fetch(`${API_URL}/${objectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }

    const result = await response.json();
    console.log('Instrumento actualizado:', result);

    // Redirigir a la página principal después de actualizar
    window.location.href = '/';
  } catch (error) {
    console.error('Error al actualizar el instrumento:', error);
  }
}

// Llamar a la función para cargar los datos del instrumento cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
  if (objectId) {
    cargarInstrumento(objectId);
  }
});

// Escuchar el evento de clic en el botón de actualizar
document.querySelector('#btnActualizar').addEventListener('click', (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del botón
  actualizarInstrumento(objectId);
});
