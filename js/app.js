// Constructor para Seguro
function Seguro(marca, anio, tipo) {
     this.marca = marca;
     this.anio = anio;
     this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function() {
     /*
          1 = peugeot 1.15
          2 = renault 1.25
          3 = fiat 1.35
          4 = chevrolet 1.45
          5 = ford 1.55
          6 = vw 1.65
     */
     let cantidad;
     const base = 2000;

     switch(this.marca){
          case '1':
               cantidad = base * 1.15;
               break;
          case '2':
               cantidad = base * 1.25;
               break;
          case '3':
               cantidad = base * 1.35;
               break;
          case '4':
               cantidad = base * 1.45;
               break;
          case '5':
               cantidad = base * 1.55;
               break;
          case '6':
               cantidad = base * 1.65;
               break;
     }

     // Leer el año
     const diferencia = new Date().getFullYear() - this.anio;
     // Cada año de diferencia hay que reducir 3% el valor del seguro
     cantidad -= ((diferencia * 3) * cantidad) / 100;
     /*
          Si el seguro es básico se múltiplica por 30% mas
          Si el seguro es completo 50% mas
     */
    if(this.tipo === 'basico') {
         cantidad *= 1.30;
    } else {
         cantidad *= 1.50;
    }

     return cantidad;

}

// Todo lo que se muestra
function Interfaz() {}

// Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
     const div = document.createElement('div');

     if(tipo === 'error') {
          div.classList.add('mensaje','error');
     } else {
          div.classList.add('mensaje','correcto');
     }
     div.classList.add('mt-10');
     div.innerHTML = `${mensaje}`;
     formulario.insertBefore(div, document.querySelector('#resultado')); // Nuevo Nodo y referencia... // Si la referencia no existe se añadira al final

     setTimeout( () =>  {
          document.querySelector('.mensaje').remove();
     }, 3000);
} 

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function(seguro, total) {
     const resultado = document.querySelector('#resultado');
     let marca;
     switch(seguro.marca) {
          case '1':
               marca = 'Peugeot';
               break;
          case '2':
               marca = 'Renault';
               break;
          case '3':
               marca = 'Fiat';
               break;
          case '4':
               marca = 'Chevrolet';
               break;
          case '5':
               marca = 'Ford';
               break;
          case '6':
               marca = 'VW';
               break;
     }
     // Crear un div
     const div = document.createElement('div');
     div.classList.add('mt-10')
     // Insertar la informacion
     div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${marca} </span> </p>
          <p class="font-bold">Año del Vehiculo: <span class="font-normal"> ${seguro.anio} </span> </p>
          <p class="font-bold">Tipo de seguro: <span class="font-normal"> ${seguro.tipo} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
     `;

     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';
     setTimeout( () =>  {
          spinner.style.display = 'none';
          resultado.appendChild(div);
     }, 3000);
     
}

Interfaz.prototype.llenarOpciones = function () {
     const max = new Date().getFullYear(),
          min = max - 20;

     const selectAnios = document.querySelector('#year');
     for(let i = max; i > min; i--) {
          let option = document.createElement('option');
          option.value = i;
          option.innerHTML = i;
          selectAnios.appendChild(option);
     }   
}

// Crear instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
     interfaz.llenarOpciones()
});

// DOM Operaciones
const formulario = document.querySelector('#cotizar-seguro');

formulario.addEventListener('submit', e =>  {
     e.preventDefault();

     // leer la marca seleccionada del select
     const marca = document.querySelector('#marca').value;

     // leer el año seleccionado del <select>
     const year = document.querySelector('#year').value

     // lee el valor del radio button
     const tipo = document.querySelector('input[name="tipo"]:checked').value;

 

     // Revisamos que los campos no esten vacios
     if(marca === '' || year === '' || tipo === '') {
          // Interfaz imprimiendo un error
          interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
     } else {
          // Limpiar resultados anteriores
          const resultados = document.querySelector('#resultado div');
          if(resultados != null) {
               resultados.remove();
          }

          // Instanciar seguro y mostrar interfaz
          const seguro = new Seguro(marca, year, tipo);
          // Cotizar el seguro
          const cantidad = seguro.cotizarSeguro();
          // Mostrar el resultado
          interfaz.mostrarResultado(seguro, cantidad);
          interfaz.mostrarMensaje('Cotizando...', 'exito');
     }

});
