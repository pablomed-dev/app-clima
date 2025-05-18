const form = document.getElementById("clima-form");
const inputCiudad = document.getElementById("ciudad");
const resultado = document.getElementById("resultado");
const ciudadNombre = document.getElementById("ciudad-nombre");
const temp = document.getElementById("temp");
const tempMax = document.getElementById("t-maxima");
const tempMin = document.getElementById("t-minima");
const desc = document.getElementById("desc");
const humedad = document.getElementById("humedad");
const icono = document.getElementById("icono-clima");

const API_KEY = '73a727e64a3466748d333a8b2c0998c9';
//const API_KEY = '1cf9938a9e6ec934716cb787a9f68cb2';

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const ciudad = inputCiudad.value.trim();

    if (ciudad === '') return;

    try {
        document.getElementById("loading").classList.remove("oculto");
        resultado.classList.add("oculto");

        const respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${API_KEY}&lang=es`
        );

        if (!respuesta.ok) throw new Error('Ciuddad no encontrada');

        const datos = await respuesta.json();
        const iconoCodigo = datos.weather[0].icon;
        //console.log(respuesta);
        //console.log(datos)

        ciudadNombre.textContent = datos.name + ' - ' + datos.sys.country;
        temp.textContent = Math.round(datos.main.temp);
        tempMax.textContent = Math.round(datos.main.temp_max);
        tempMin.textContent = Math.round(datos.main.temp_min);
        desc.textContent = datos.weather[0].description;
        humedad.textContent = datos.main.humidity;
        icono.src = `https://openweathermap.org/img/wn/${iconoCodigo}@2x.png`;
        icono.alt = datos.weather[0].description;
        
        
        resultado.classList.remove('oculto');
        document.getElementById("loading").classList.add("oculto");

        localStorage.setItem('ultimaCiudad', ciudad)

    } catch (error) {
        alert("Error: " + error.message)
        resultado.classList.add('oculto');
    }

    form.reset();
    
});

window.addEventListener('DOMContentLoaded', () => {
    const ultimaCiudad = localStorage.getItem('ultimaCiudad');

    if (ultimaCiudad) {
        inputCiudad.value = ultimaCiudad;
        //disparar búsqueda automáticamente-------
        //form.dispatchEvent( new Event('submit'));
    }
});