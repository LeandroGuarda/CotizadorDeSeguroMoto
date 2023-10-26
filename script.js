function Seguro(marca, year, cilindrada, color, tipo) {
    this.marca = marca;
    this.year = year;
    this.cilindrada = cilindrada;
    this.color = color;
    this.tipo = tipo;
}

// Realizar cotizacion.

Seguro.prototype.cotizarSeguro = function () {
    /*Honda: 1.50
    Yamaha: 1.35
    Benelli:1
    Zanella: 0.8
    BMW= 2
    */

    let cantidad = 0;

    const base = 2000;

    const calculo = {
        honda: base * 1.50,
        yamaha: base * 1.35,
        benelli: base * 1,
        zanella: base * 0.8,
        bmw: base * 2
    }

    cantidad = calculo[this.marca];

    // Leer Año

    const diferencia = new Date().getFullYear() - this.year;
    // cada año que la diferencia es mayor se reduce el costo
    cantidad -= (diferencia * 3 * cantidad) / 100;



    // Si el seguro es COMPLETO se multiplica por un 30% mas
    // Si el seguro es     BASICO se multiplica por un 50% mas

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}

function UI() { }

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
    }

}


// Mostrar alertas

UI.prototype.mostrarMensaje = (mensaje) => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="border-l-4 border-red-500 p-4 rounded bg-red-200 text-red-500 mt-10">*${mensaje}</div>`;

    // insertar en el html
    const formulario = document.getElementById('cotizar-seguro');
    formulario.insertBefore(div, document.getElementById('resultado'));
    const resultadoDiv = document.querySelector('#errorMessage');
    resultadoDiv.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = function (total, seguro) {

    




    const { marca, year, tipo } = seguro;
    let txtMarca = '';

    const marcas = {
        honda: 'Honda',
        yamaha: 'Yamaha',
        benelli: 'Benelli',
        zanella: 'Zanella',
        bmw: 'BMW'
    }

    txtMarca = marcas[marca];

    // crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `<div class="p-2 md:p-4 bg-blue-100 rounded w-full">
    <p class='header text-center font-semibold mb-2 uppercase'> Tu Resumen </p>
    <p class='font-bold'> Marca: <span class='font-normal'>${txtMarca}</span> </p>
    <p class='font-bold'> Año: <span class='font-normal'> ${year}</span> </p>
    <p class='font-bold'> Tipo: <span class='font-normal capitalize'> ${tipo}</span> </p>
    <p class='font-bold'> Total: <span class='font-normal'> $${total}</span> </p>
    </div>`;

    const resultadoDiv = document.querySelector('#resultado',);
    resultadoDiv.appendChild(div);
}



// Instancia UI

const ui = new UI();

document.addEventListener('DOMContentLoaded', function () {
    ui.llenarOpciones();
});



function EventListeners() {
    const formulario = document.getElementById('cotizar-seguro');

    formulario.addEventListener('submit', cotizarSeguro);
}
EventListeners();


function cotizarSeguro(e) {
    e.preventDefault();

    // Leer marca seleccionada

    const marca = document.getElementById('marca').value;

    // leer año seleccionado

    const year = document.getElementById('year').value;

    // leer cilindrada

    const cilindrada = document.getElementById('cilindrada').value;

    // leer color

    const color = document.getElementById('color').value;

    // leer tipo de cobertura

    const tipo = document.querySelector('input[name=tipo]:checked').value;

    if ((marca === "") || (year === "") || (cilindrada === "") || (color === "") || (tipo === "")) {
        
        ui.mostrarMensaje('Todos los campos son obligatorios');
        return;

    }
    // ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    // instanciar seguro

    const seguro = new Seguro(marca, year, cilindrada, color, tipo);
    const total = seguro.cotizarSeguro();

    // use prototype que va a cotizar

    ui.mostrarResultado(total, seguro);


}


// const cardsContainer = document.querySelector("#div")

// fetch("https://dolarapi.com/v1/dolares/blue")
//     .then(resp => resp.json())
//     .then(data => {
//         const card = document.createElement("div");
//         card.classList.add('card', 'm-2', 'shadow');

//         const cardBody = document.createElement("div")
//         cardBody.classList.add('card-body')


//         cardBody.innerHTML = `
//         <h5 class = "card-title" >${data.moneda}</h5>
//         <h5 class = "card-title" >${data.casa}</h5>
//         <h5 class = "card-title" >${data.compra}</h5>
//         <h5 class = "card-title" >${data.venta}</h5>
    
//         `
//         card.appendChild(cardBody)
//         cardsContainer.appendChild(card)

//     })

//     .catch(err = {
//         const err = document.createElement("div")
//     })
//  const dolarInfo = () => {
//      return fetch("https://dolarapi.com/v1/dolares/blue")
//          .then(response => response.json())
//          .then(data => {
//              const card = document.createElement("div");
//              card.classList('card', 'm-2', 'shadow');
//          });

//  }
