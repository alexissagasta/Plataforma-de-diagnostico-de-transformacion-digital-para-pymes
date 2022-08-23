async function obtenerEvaluaciones() {
    var emailRaw = document.getElementById("idEmail").textContent;
    let email = emailRaw.replace(/\s+/g, '');
    const response = await fetch("/obtenerEvaluaciones/" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    const data = await response.json();
    console.log(data)
    return data
}

async function eliminarEvaluacion(id) {
    var emailRaw = document.getElementById("idEmail").textContent;
    let email = emailRaw.replace(/\s+/g, '');
    const response = await fetch("/eliminarEvaluacion/" + email, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({"id": id})
    })
    const data = await response.json();
    console.log(data)
    alert(data.msj)
    location.reload()
}

async function renderizarPagina() {
    let evaluaciones = await obtenerEvaluaciones()
    if (isNaN(evaluaciones.length)) {
        alert(evaluaciones.msj)
    } else {
        let contenedor = document.getElementById('contenido');
        evaluaciones.forEach(element => {
            const div = document.createElement('div');
            div.className = 'agregado rounded-3';
            div.innerHTML = `
            <br>
            <div class="border border-3 border-primary bg-primary rounded">
        <table id=`+ element.fecha + ` class="table table-bordered table-dark table-hover">
          <tr>
            <th scope="col" style="text-align:center">Dominios</th>
            <th scope="col" style="text-align:center;width:10%;">Suma</th>
            <th scope="col" style="text-align:center;width:10% ">Valor</th>
            <th colspan="2" scope="col" style="text-align:center;width:10%">Puntos</th>
          </tr>
          <tr>
            <td scope="row">
              Estrategia y cultura digital
            </td>
            <td id="res1">
              `+ element.sumaDominio1 + `
            </td>
            <td>
              30%
            </td>
            <td id="pd1" colspan="2">
              `+ element.puntosDominio1 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Experiencia del cliente
            </td>
            <td id="res2">
              `+ element.sumaDominio2 + `
            </td>
            <td>
              25%
            </td>
            <td id="pd2" colspan="2">
              `+ element.puntosDominio2 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Gestión del talento
            </td>
            <td id="res3">
              `+ element.sumaDominio3 + `
            </td>
            <td>
              15%
            </td>
            <td id="pd3" colspan="2">
              `+ element.puntosDominio3 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Productos, servicios y procesos
            </td>
            <td id="res4">
              `+ element.sumaDominio4 + `
            </td>
            <td>
              15%
            </td>
            <td id="pd4" colspan="2">
              `+ element.puntosDominio4 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Infraestructura y tecnología
            </td>
            <td id="res5">
              `+ element.sumaDominio5 + `
            </td>
            <td>
              15%
            </td>
            <td id="pd5" colspan="2">
              `+ element.puntosDominio5 + `
            </td>
          </tr>
          <tr>
            <td colspan="3" scope="row">
              Suma total de Índice de Madurez Digital (IMD)
            </td>
            <td id="imd">
              `+ element.imd + `
            </td>
            <td id="niv" style="text-align:center;width:20%;">
              `+ element.nivel + `
            </td>
          </tr>
          <tr>
            <td colspan="4" scope="row">
              Fecha
            </td>
            <td id="fecha" style="text-align:center;width:20%;">
              `+ element.fecha + `
            </td>
          </tr>
        </table>
        <br>
        <div class="position-relative">
        <button id="btnEv" class="btn btn-dark btn-lg position-absolute top-50 start-50 translate-middle" onclick="eliminarEvaluacion(`+ element._id + `)">
        Eliminar
        </button>
        </div>
        <br><br>
        </div>
        <br>`;
            contenedor.appendChild(div);

        });
    }

}