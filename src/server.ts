import express from 'express'// para importar express de la forma del ESM (Ecmascript module)
import 'dotenv/config'
import cors from 'cors'
import router from './router'
import { conectDB } from './config/db';


// const express = require('express'); para importar express de la forma del  Common Js (CJS)

const app = express()//significa que aremos una app de express , es la estancia del servidor 
conectDB()
//leer datos
app.use(cors({
  origin: 'http://localhost:4000', // Permite solo solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permite enviar cookies o headers de autenticación
}));

app.use(express.json())

app.use('/', router)// use es para mapear las rutas de manera correcta 
// puedes tener varias dependiendo de lo que necesites 

app.listen(4100, () => {
    console.log('Servidor corriendo en http://localhost:4000');
  });
export default app
