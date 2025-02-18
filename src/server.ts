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
  origin: 'http://localhost:8081', // Permite solo este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permite enviar cookies o headers de autenticación
})
);

// app.use(cors({
//   origin: 'http://localhost:4000', // Permite solo este origen
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
//   credentials: true, // Permite enviar cookies o headers de autenticación
// })
// );

app.use(express.json())

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Datos recibidos:', { email, password });
  res.json({ message: 'Login exitoso', user: { email } });
});

// Ruta de login
app.post('/auth/register', (req, res) => {
  const { handle, name, email, password } = req.body;
  console.log('Datos recibidos:', { handle, name, email, password });
  res.json({ message: 'Registro exitoso', user: { email } });
});

app.options('/auth/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});


app.use('/', router)// use es para mapear las rutas de manera correcta 
// puedes tener varias dependiendo de lo que necesites 

app.listen(4100, () => {
    console.log('Servidor corriendo en http://localhost:4000');
  });
export default app
