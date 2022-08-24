
function obtenerRespuestas() {
  let e1p1 = document.getElementById('D1P1');
  let e1p2 = document.getElementById('D1P2');
  let e1p3 = document.getElementById('D1P3');
  let e1p4 = document.getElementById('D1P4');
  let e1p5 = document.getElementById('D1P5');
  let e1p6 = document.getElementById('D1P6');
  let e1p7 = document.getElementById('D1P7');
  let e1p8 = document.getElementById('D1P8');

  let e2p1 = document.getElementById('D2P1');
  let e2p2 = document.getElementById('D2P2');
  let e2p3 = document.getElementById('D2P3');
  let e2p4 = document.getElementById('D2P4');
  let e2p5 = document.getElementById('D2P5');

  let e3p1 = document.getElementById('D3P1');
  let e3p2 = document.getElementById('D3P2');
  let e3p3 = document.getElementById('D3P3');
  let e3p4 = document.getElementById('D3P4');
  let e3p5 = document.getElementById('D3P5');

  let e4p1 = document.getElementById('D4P1');
  let e4p2 = document.getElementById('D4P2');
  let e4p3 = document.getElementById('D4P3');
  let e4p4 = document.getElementById('D4P4');
  let e4p5 = document.getElementById('D4P5');

  let e5p1 = document.getElementById('D5P1');
  let e5p2 = document.getElementById('D5P2');
  let e5p3 = document.getElementById('D5P3');
  let e5p4 = document.getElementById('D5P4');
  let e5p5 = document.getElementById('D5P5');

  let todasP = [e1p1, e1p2, e1p3, e1p4, e1p5, e1p6, e1p7, e1p8, e2p1, e2p2,
    e2p3, e2p4, e2p5, e3p1, e3p2, e3p3, e3p4, e3p5, e4p1, e4p2, e4p3, e4p4,
    e4p5, e5p1, e5p2, e5p3, e5p4, e5p5]

  let todasPD1 = [e1p1, e1p2, e1p3, e1p4, e1p5, e1p6, e1p7, e1p8]
  let todasPD2 = [e2p1, e2p2, e2p3, e2p4, e2p5]
  let todasPD3 = [e3p1, e3p2, e3p3, e3p4, e3p5]
  let todasPD4 = [e4p1, e4p2, e4p3, e4p4, e4p5]
  let todasPD5 = [e5p1, e5p2, e5p3, e5p4, e5p5]

  let todasPNumeros = []

  let sumaPD1Numeros = 0
  let sumaPD2Numeros = 0
  let sumaPD3Numeros = 0
  let sumaPD4Numeros = 0
  let sumaPD5Numeros = 0

  todasP.every(lt => {
    if (lt.options[lt.selectedIndex].text == "Seleccione un valor") {
      alert("Tiene que responder todas las preguntas")
      return false
    }
    return true
  })

  todasPD1.forEach(lt => {
    sumaPD1Numeros = sumaPD1Numeros + parseInt(lt.options[lt.selectedIndex].text)
  })

  todasPD2.forEach(lt => {
    sumaPD2Numeros = sumaPD2Numeros + parseInt(lt.options[lt.selectedIndex].text)
  })

  todasPD3.forEach(lt => {
    sumaPD3Numeros = sumaPD3Numeros + parseInt(lt.options[lt.selectedIndex].text)
  })

  todasPD4.forEach(lt => {
    sumaPD4Numeros = sumaPD4Numeros + parseInt(lt.options[lt.selectedIndex].text)
  })

  todasPD5.forEach((lt, i) => {
    sumaPD5Numeros = sumaPD5Numeros + parseInt(lt.options[lt.selectedIndex].text)
  })

  todasPNumeros = [sumaPD1Numeros, sumaPD2Numeros, sumaPD3Numeros, sumaPD4Numeros, sumaPD5Numeros]
  return todasPNumeros;
}

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

function calcularNivel(IMD) {
  if (IMD < 30) {
    return {
      nivel: "Nivel 1",
      descripcion: "Empresas que tienen ciertas iniciativas digitales diferentes, independientes y dispersas en la empresa. Se hace necesario diseñar una estrategia digital",
      rango: "Nivel Básico entre 0 y 30 puntos"
    }
  }
  if (IMD > 30 && IMD <= 60) {
    return {
      nivel: "Nivel 2",
      descripcion: "Empresas que empiezan a formalizar algún plan digital en área concreta de la compañía. Aceptan el valor que aportan las tecnologías a los procesos de negocio. Es necesario un plan de crecimiento digital",
      rango: "Nivel Inicial entre 31 y 60 puntos"
    }
  }
  if (IMD > 60 && IMD <= 80) {
    return {
      nivel: "Nivel 3",
      descripcion: "Empresas que están implementando el plan de transformación digital de forma holística e integrada siguiendo una hoja de ruta (framework). Es necesario asegurar el avance de la Transformación digital",
      rango: "Nivel Innovador entre 61 y 80 puntos"
    }
  }
  if (IMD > 80 && IMD <= 100) {
    return {
      nivel: "Nivel 4",
      descripcion: "Empresas que han desarrollado su negocio digital. Organizaciones ágiles innovadoras, flexibles, conectadas, colaborativas, abiertas y data driven que se adaptan de forma continua a los cambios. Es necesario mantener y fortalecer la estrategia digital",
      rango: "Nivel transformador entre 81 y 100 puntos"
    }
  }
}

async function guardarEvaluacion(evaluacion) {
  //
  const response = await fetch("/guardarEvaluacion", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(evaluacion)
  })
  console.log(JSON.stringify(evaluacion));
}

async function evaluar() {

  let respuestas = obtenerRespuestas()
  const evaluacion = document.getElementById('ev');

  let puntosD1 = (respuestas[0] * 30) / 40
  let puntosD2 = (respuestas[1] * 25) / 25
  let puntosD3 = (respuestas[2] * 15) / 25
  let puntosD4 = (respuestas[3] * 15) / 25
  let puntosD5 = (respuestas[4] * 15) / 25
  let IMD = puntosD1 + puntosD2 + puntosD3 + puntosD4 + puntosD5
  let nivel = calcularNivel(IMD)
  let emailRaw = document.getElementById('idEmail').textContent;
  let empresaRaw = document.getElementById('idEmpresa').textContent;
  let email = emailRaw.replace(/\s+/g, '');
  let empresa = empresaRaw.replace(/\s+/g, '');
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  let fecha = hoy.toLocaleString();
  let idRandom = generateRandomInteger(100000000000);

  if (evaluacion == null && !isNaN(IMD)) {
    const div = document.createElement('div');
    div.className = 'agregado rounded-3';
    div.id = "ev";
    div.innerHTML = `
        <table class="table table-bordered table-dark table-hover">
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
              `+ respuestas[0] + `
            </td>
            <td>
              30%
            </td>
            <td id="pd1" colspan="2">
              `+ puntosD1 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Experiencia del cliente
            </td>
            <td id="res2">
              `+ respuestas[1] + `
            </td>
            <td>
              25%
            </td>
            <td id="pd2" colspan="2">
              `+ puntosD2 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Gestión del talento
            </td>
            <td id="res3">
              `+ respuestas[2] + `
            </td>
            <td>
              15%
            </td>
            <td id="pd3" colspan="2">
              `+ puntosD3 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Productos, servicios y procesos
            </td>
            <td id="res4">
              `+ respuestas[3] + `
            </td>
            <td>
              15%
            </td>
            <td id="pd4" colspan="2">
              `+ puntosD4 + `
            </td>
          </tr>
          <tr>
            <td scope="row">
              Infraestructura y tecnología
            </td>
            <td id="res5">
              `+ respuestas[4] + `
            </td>
            <td>
              15%
            </td>
            <td id="pd5" colspan="2">
              `+ puntosD5 + `
            </td>
          </tr>
          <tr>
            <td colspan="3" scope="row">
              Suma total de Índice de Madurez Digital (IMD)
            </td>
            <td id="imd">
              `+ IMD + `
            </td>
            <td id="niv" style="text-align:center;width:20%;">
              `+ nivel.nivel + `
            </td>
          </tr>
          <tr>
            <td colspan="4" scope="row">
              Fecha
            </td>
            <td id="fecha" style="text-align:center;width:20%;">
              `+ fecha + `
            </td>
          </tr>
        </table>
        <br>`;
    document.getElementById('evaluacion').appendChild(div);

    const div2 = document.createElement('div');
    div2.className = 'agregado rounded-3';
    div2.id = "desc";
    div2.innerHTML = `
            <table class="table table-bordered table-dark table-hover">
              <tr>
                <th scope="col" style="text-align:center ">Interpretación de Resultados</th>
              </tr>
              <tr>
                <td id="rango" scope="row" style="text-align:center">`+ (nivel.nivel + ": " + nivel.rango) + `</td>
              </tr>
              <tr>
                <td id="descripcion" scope="row" style="text-align:center ">`+ nivel.descripcion + `</td>
              </tr>
            </table>
            <br>
    `;

    document.getElementById('evaluacion').appendChild(div2);

    let evaluacion = {
      "_id": idRandom,
      "email": email,
      "nombreEmpresa": empresa,
      "fecha": fecha,
      "sumaDominio1": respuestas[0],
      "sumaDominio2": respuestas[1],
      "sumaDominio3": respuestas[2],
      "sumaDominio4": respuestas[3],
      "sumaDominio5": respuestas[4],
      "puntosDominio1": puntosD1,
      "puntosDominio2": puntosD2,
      "puntosDominio3": puntosD3,
      "puntosDominio4": puntosD4,
      "puntosDominio5": puntosD5,
      "imd": IMD,
      "nivel": nivel.nivel,
      "descripcion": nivel.descripcion,
      "rango": (nivel.nivel + ": " + nivel.rango)
    }
    document.getElementById('divPDF').style.display  = 'block';
    console.log(evaluacion)
    await guardarEvaluacion(evaluacion);
  } else {
    if (!isNaN(IMD)) {
      let res1 = document.getElementById('res1');
      let res2 = document.getElementById('res2');
      let res3 = document.getElementById('res3');
      let res4 = document.getElementById('res4');
      let res5 = document.getElementById('res5');

      let pd1 = document.getElementById('pd1');
      let pd2 = document.getElementById('pd2');
      let pd3 = document.getElementById('pd3');
      let pd4 = document.getElementById('pd4');
      let pd5 = document.getElementById('pd5');

      res1.textContent = respuestas[0]
      res2.textContent = respuestas[1]
      res3.textContent = respuestas[2]
      res4.textContent = respuestas[3]
      res5.textContent = respuestas[4]

      pd1.textContent = puntosD1
      pd2.textContent = puntosD2
      pd3.textContent = puntosD3
      pd4.textContent = puntosD4
      pd5.textContent = puntosD5

      let newImd = document.getElementById('imd');
      newImd.textContent = IMD

      let niv = document.getElementById('niv');
      niv.textContent = nivel.nivel

      let descripcion = document.getElementById('descripcion');
      descripcion.textContent = nivel.descripcion

      let rango = document.getElementById('rango');
      rango.textContent = (nivel.nivel + ": " + nivel.rango)

      let fechaElemento = document.getElementById('fecha');
      fechaElemento.textContent = fecha

      let evaluacion = {
        "_id": idRandom,
        "email": email,
        "nombreEmpresa": empresa,
        "fecha": fecha,
        "sumaDominio1": respuestas[0],
        "sumaDominio2": respuestas[1],
        "sumaDominio3": respuestas[2],
        "sumaDominio4": respuestas[3],
        "sumaDominio5": respuestas[4],
        "puntosDominio1": puntosD1,
        "puntosDominio2": puntosD2,
        "puntosDominio3": puntosD3,
        "puntosDominio4": puntosD4,
        "puntosDominio5": puntosD5,
        "imd": IMD,
        "nivel": nivel.nivel,
        "descripcion": nivel.descripcion,
        "rango": (nivel.nivel + ": " + nivel.rango)
      }
      await guardarEvaluacion(evaluacion); 
    }
  }
}
async function createPDF() {
  let empresaRaw = document.getElementById('idEmpresa').textContent;
  let empresa = empresaRaw.replace(/\s+/g, '');
  var sTable = document.getElementById('ev').innerHTML;
  var sDesc = document.getElementById('desc').innerHTML;
  
  var style = "<style>";
  style = style + "table {width: 100%;font: 17px Calibri;}";
  style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
  style = style + "padding: 2px 3px;text-align: center;}";
  style = style + "</style>";

  // CREATE A WINDOW OBJECT.
  var win = window.open('', '', 'height=700,width=700');

  win.document.write('<html><head>');
  win.document.write('<h1 style="text-align: center;">'+empresa+'</h1>');
  win.document.write('<title>Calculo</title>');   // <title> FOR PDF HEADER.
  win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write(sDesc);
  win.document.write('</body></html>');

  win.document.close(); 	// CLOSE THE CURRENT WINDOW.

  win.print();    // PRINT THE CONTENTS.
}

