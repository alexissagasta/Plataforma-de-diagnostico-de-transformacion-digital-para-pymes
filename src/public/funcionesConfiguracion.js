async function obtenerPorcentajesEv() {
  const response = await fetch("/obtenerPorcentajesEv", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  const data = await response.json();
  return data
}

async function obtenerCambios() {
  let np1 = parseFloat(document.getElementById('newPorcentaje1').textContent)
  let np2 = parseFloat(document.getElementById('newPorcentaje2').textContent)
  let np3 = parseFloat(document.getElementById('newPorcentaje3').textContent)
  let np4 = parseFloat(document.getElementById('newPorcentaje4').textContent)
  let np5 = parseFloat(document.getElementById('newPorcentaje5').textContent)

  if(isNaN(np1)||isNaN(np2)||isNaN(np3)||isNaN(np4)||isNaN(np5)){
    alert("Solo se permiten numeros")
  }else{
    if(np1+np2+np3+np4+np5!=100){
      alert("El total debe ser 100%")
    }else{
      let cambios ={
      "newPD1": np1,
      "newPD2": np2,
      "newPD3": np3,
      "newPD4": np4,
      "newPD5": np5,
      }
      return cambios
    }
  }
}

async function modificarConfiguracion() {
  let cambios = await obtenerCambios()
  if(cambios==undefined){
    return
  }
  const response = await fetch("/modificarConfiguracion", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(cambios)
  })
  alert("Se guardaron los cambios")
  location.reload()
}

async function renderizarPagina() {
  let porcentajesDom = await obtenerPorcentajesEv()

  let contenedor = document.getElementById('contenido');
  
    const div = document.createElement('div');
    div.className = 'agregado rounded-3';
    div.innerHTML = `
    <div class="p-3 bg-dark text-white rounded-3">
    <h2 class="text-center">Porcentajes de los dominios</h2>
    </div>
    <table class="table table-bordered table-dark table-hover">
      <tr>
        <th scope="col" style="text-align:center ">Dominios</th>
        <th scope="col" style="text-align:center ">Actual</th>
        <th contenteditable="true" scope="col" style="text-align:center ">Nuevo</th>
      </tr>
      <tr>
        <td scope="row">Dominio 1: Estrategia y cultura digital</td>
        <td scope="row">`+ porcentajesDom[0].porcentajeD1 + `</td>
        <td id="newPorcentaje1" contenteditable="true" scope="row">0</td>
      </tr>
      <tr>
        <td scope="row">Dominio 2: Experiencia del cliente</td>
        <td scope="row">`+ porcentajesDom[0].porcentajeD2 + `</td>
        <td id="newPorcentaje2" contenteditable="true" scope="row">0</td>
      </tr>
      <tr>
        <td scope="row">Dominio 3: Habilitación de los empleados</td>
        <td scope="row">`+ porcentajesDom[0].porcentajeD3 + `</td>
        <td id="newPorcentaje3" contenteditable="true" scope="row">0</td>
      </tr>
      <tr>
        <td scope="row">Dominio 4: Productos, servicio y procesos</td>
        <td scope="row">`+ porcentajesDom[0].porcentajeD4 + `</td>
        <td id="newPorcentaje4" contenteditable="true" scope="row">0</td>
      </tr>
      <tr>
        <td scope="row">Dominio 5: Infraestructura y tecnología</td>
        <td scope="row">`+ porcentajesDom[0].porcentajeD5 + `</td>
        <td id="newPorcentaje5" contenteditable="true" scope="row">0</td>
      </tr>
    </table>
    <br>
    <div class="position-relative">
      <button id="btnEv" class="btn btn-dark btn-lg position-absolute top-50 start-50 translate-middle" onclick="modificarConfiguracion()">
        Modificar
      </button>
      </div>
      <br><br>
    </div>
    <br>
    `;
    contenedor.appendChild(div);

  
}