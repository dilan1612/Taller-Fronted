// URL de tu API desplegada (puede ser en Heroku, Render, etc.)
const API_URL = 'https://backend-trp2.onrender.com//instruments' 

// Función para obtener los instrumentos
async function obtenerInstrumentos() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'tu_jwt_token'  // Si tu API usa autenticación JWT
      }
    });
    const instrumentos = await response.json();
    mostrarInstrumentos(instrumentos);
  } catch (error) {
    console.error('Error al obtener los instrumentos:', error);
  }
}

// Función para mostrar los instrumentos en el HTML
function mostrarInstrumentos(instrumentos) {
  const contenedor = document.getElementById('lista-instrumentos');
  contenedor.innerHTML = '';  // Limpiar el contenedor
  instrumentos.forEach(instrumento => {
    const instrumentoElement = document.createElement('div');
    instrumentoElement.classList.add('instrumento');

    instrumentoElement.innerHTML = `
      <h3>${instrumento.nombre}</h3>
      <p>Marca: ${instrumento.marca}</p>
      <p>Tipo: ${instrumento.tipo}</p>
      <p>Precio: $${instrumento.precio}</p>
      <p>Stock: ${instrumento.stock}</p>
    `;
    contenedor.appendChild(instrumentoElement);
  });
}

// Llamar a la función cuando la página cargue
document.addEventListener('DOMContentLoaded', obtenerInstrumentos);
