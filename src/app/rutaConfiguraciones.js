const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/PDTDxPymes?retryWrites=true&w=majority";

const express = require("express");
const router = express.Router();
const gestionarConfiguracion = require("../config/configuracion");
let gestorConfiguracion = new gestionarConfiguracion();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(async function (err, db) {

    router.get("/obtenerPorcentajesEv", async (req, res, next) => {
       
        try {
            //Busca en la BD
            let configuraciones = await gestorConfiguracion.listarConfiguraciones(db);
            if (configuraciones.length == 0) {
                mensaje = { msj: "no hay configuraciones!" }
                res.status(206).send(mensaje);
            } else {
                res.status(200).send(configuraciones);
            }

        } catch (err) {
            next(err)
        }
    });

    router.put('/modificarConfiguracion', async (req, res, next) => {
        try {
            const data = req.body;
            console.log("Porcentajes: " + JSON.stringify(data));
            //Almacena en Json
            info = await gestorConfiguracion.modificarConfiguraciones(db, data);
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

});
client.close();
module.exports = router