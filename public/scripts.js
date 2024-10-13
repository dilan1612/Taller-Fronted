(()=>{
  fetch('https://backend-trp2.onrender.com//instruments')
    .then( data => data.json())
    .then( data => console.log(data))   
    .catch(err=>console.log(err))
})();

document.querySelector("#btnSend").addEventListener('click',()=>{
  const id = document.querySelector('#id').value 

  const type = document.querySelector('#type').value 

  const marca = document.querySelector('#marca').value

  const peso = document.querySelector('#peso').value

  const value = document.querySelector('#value').value

  const data = {id:id,type:type,marca:marca, peso:peso, value: value}

  const URL = "https://backend-trp2.onrender.com//670b2b28860a3c720bff103f"

  fetch(URL,{
    'method' : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify(data)
  }).then( resp => resp.json())
  .then( data => console.log(data))
  .catch( err => console.log(err))
})





// URL de tu API (reemplaza con la URL real)
const API_URL = 'https://backend-trp2.onrender.com'; // Asegúrate de que esta URL sea correcta

// Si tu API requiere autenticación con JWT, obtén el token almacenado
const token = localStorage.getItem('auth-token'); // Asegúrate de haber iniciado sesión y almacenado el token

// Función para obtener los instrumentos desde la API
async function obtenerInstrumentos() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Incluir el token en los headers si es necesario
        
      }
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }

    const instrumentos = await response.json();
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

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = instrumento.nombre;
    fila.appendChild(celdaNombre);

    const celdaMarca = document.createElement('td');
    celdaMarca.textContent = instrumento.marca;
    fila.appendChild(celdaMarca);

    const celdaTipo = document.createElement('td');
    celdaTipo.textContent = instrumento.tipo;
    fila.appendChild(celdaTipo);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = `$${instrumento.precio}`;
    fila.appendChild(celdaPrecio);

    const celdaStock = document.createElement('td');
    celdaStock.textContent = instrumento.stock;
    fila.appendChild(celdaStock);

    tabla.appendChild(fila);
  });
}

// Llamar a la función cuando la página haya cargado completamente
document.addEventListener('DOMContentLoaded', obtenerInstrumentos);


