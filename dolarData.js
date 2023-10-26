// Define un elemento para mostrar los datos
const content = document.createElement("div");
document.body.appendChild(content);

// Función para mostrar datos
const mostrarData = (data) => {
    console.log(data);

    // Comprueba si los datos tienen una propiedad "fechaActualizacion"
    if (data.hasOwnProperty("fechaActualizacion")) {
        content.innerHTML = `
      <div>
        <h1>Fecha de Actualización: ${data.fechaActualizacion}</h1>
        <h2>Valor de compra: $ ${data.compra}</h2>
        <h3>Valor de venta: $ ${data.venta}</h3>
      </div>
    `;
    }
};

// Realiza la solicitud inicial
fetch("https://dolarapi.com/v1/dolares/blue")
    .then((response) => response.json())
    .then((data) => {
        mostrarData(data);
    })
    .catch((error) => {
        console.log("Hubo un error al obtener los datos", error);
    });

// Establece un intervalo para actualizar los datos
const interval = 1 * 60 * 1000; // 5 minutos en milisegundos
setInterval(() => {


    fetch("https://dolarapi.com/v1/dolares/blue")
        .then((response) => response.json())
        .then((data) => {
            mostrarData(data);

        })
        .catch((error) => {
            console.log("Hubo un error al obtener los datos", error);
        });
}, interval);


