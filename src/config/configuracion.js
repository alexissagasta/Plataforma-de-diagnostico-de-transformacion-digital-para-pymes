//evaluacion.js

class gestionarConfiguracion {

    listarConfiguraciones = async (client) => {
        try {
            // specify the DB's name
            const db = client.db('PDTDxPymes');
            // execute find query
            const items = await db.collection('configuraciones').find({ "nombre": "global" }).toArray();
            //console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }
    }

    modificarConfiguraciones = async (client, valores) => {
        try {
            // specify the DB's name
            const db = client.db('PDTDxPymes');
            // execute find query
            const items = await db.collection('configuraciones').updateOne( { "nombre": "global" },
            {
              $set: {
                porcentajeD1: valores.newPD1,
                porcentajeD2: valores.newPD2,
                porcentajeD3: valores.newPD3,
                porcentajeD4: valores.newPD4,
                porcentajeD5: valores.newPD5
              }
            })
            console.log(items);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = gestionarConfiguracion