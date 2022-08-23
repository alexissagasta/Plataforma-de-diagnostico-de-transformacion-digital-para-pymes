const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/PDTDxPymes?retryWrites=true&w=majority";

const express = require("express");
const router = express.Router();
const gestionarEvaluacion = require("../config/evaluacion");
let gestorEvaluacion = new gestionarEvaluacion();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(async function (err, db) {

    router.get("/obtenerEvaluaciones/:email", async (req, res, next) => {
        var email = req.params.email;
        console.log(email)
        try {
            //Busca en la BD
            let evaluaciones = await gestorEvaluacion.listarEvaluacionesPorEmail(db, email);
            if (evaluaciones.length == 0) {
                mensaje = { msj: "no hay evaluaciones!" }
                res.status(206).send(mensaje);
            } else {
                res.status(200).send(evaluaciones);
            }

        } catch (err) {
            next(err)
        }
    });

    router.post('/guardarEvaluacion', async (req, res, next) => {
        try {
            const data = req.body;
            console.log("Evaluacion: " + JSON.stringify(data));
            //Almacena en Json
            info = await gestorEvaluacion.registrarEvaluacion(db, data);
            //Se verifica si se agrego el área
            if (info === "Una evaluacion ya tiene esa id!") {
                res.status(200).send({ alerta: info });
            } else {

                res.status(201).send({ mensaje: "evaluacion agregada!" });
            }
        } catch (err) {
            next(err)
        }

    });

    router.delete("/eliminarEvaluacion/:email", async (req, res, next) => {
        var id = req.body.id;
        var email = req.params.email;
        console.log("id: " + id)
        try {
            //Busca en la BD
            evaluacionEliminar = await gestorEvaluacion.borrarEvaluacionPorId(db, id, email);
            if (evaluacionEliminar.length == 0) {
                mensaje = { msj: "no hay evaluaciones!" }
                res.status(206).send(mensaje);
            } else {
                res.status(200).send(evaluacionEliminar);
            }
        } catch (err) {
            next(err)
        }
    });
});
client.close();
module.exports = router