//evaluacion.js

class gestionarEvaluacion {

    registrarEvaluacion = async (db, evaluacion) => {
        try {
            var dbo = db.db("PDTDxPymes");
            const res = await dbo.collection("evaluaciones").insertOne(evaluacion);
            console.log("Una evaluacion ha sido agregada");
            return res;

        } catch (e) {
            console.error(e);
        }
    }

    borrarEvaluacionPorId = async (db, id, email) => {
        try {
            var dbo = db.db("PDTDxPymes");
            const res = await dbo.collection("evaluaciones").deleteOne({"_id":id});

            console.log({ realizado: res });
            if (res.deletedCount == 0) {
                console.log("No se encontro la evaluacion!");
                return { msj: "No se encontro la evaluacion!" }
            } else {
                console.log("Una evaluacion ha sido eliminada");
                return { msj: "Una evaluacion ha sido eliminada" }
            }


        } catch (e) {
            console.error(e);
        }

    }

    listarEvaluacionesPorEmail = async (client, email) => {
        try {
            // specify the DB's name
            const db = client.db('PDTDxPymes');
            // execute find query
            const items = await db.collection('evaluaciones').find({ "email": email }).toArray();
            //console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }
}

module.exports = gestionarEvaluacion