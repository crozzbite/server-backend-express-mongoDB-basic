import express from "express"; // para importar express de la forma del ESM (Ecmascript module)
import "dotenv/config";
import cors from "cors";
import authrouter from "./router";
import { conectDB } from "./config/db";

// const express = require('express'); para importar express de la forma del  Common Js (CJS)

const app = express(); //significa que aremos una app de express , es la estancia del servidor
conectDB();
//leer datos
app.use(
  cors({
    origin: "http://localhost:8081", // Permite solo este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true, // Permite enviar cookies o headers de autenticación
  })
);

// Middleware para parsear JSON
app.use(express.json());
app.use('/auth',authrouter)
// Ruta del Login
// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Datos recibidos:", { email, password });
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(404).json({ message: "Usuario no encontrado" });
//       return;
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       // error en el login,

//       res.status(401).json({ message: "Contraseña incorrecta" });

//       console.log("pw: ", isMatch, " entrado: ", password);
//       return;
//     }
//     res.json({ message: "Login exitoso", user });
//   } catch (error) {
//     res.status(500).json({ message: "Error en el servidor", error });
//   }
// });

// Ruta del Registro
// app.post("/auth/register", async (req, res) => {
//   const { handle, name, email, password } = req.body;
//   console.log("Datos recibidos:", { handle, name, email, password });

//   try {
//     const salt = await bcrypt.genSalt(10); // Genera un "salt"
//     const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña
//     //Crear nuevo user en la db
//     const newUser = new User({ handle, name, email, password: hashedPassword });

//     await newUser.save();
//     res.json({
//       message: "Registro exitoso",
//       user: { email },
//       pw: { hashedPassword },
//     });
//   } catch (error) {
//     console.error("Error en el registro:", error);
//     res.status(500).json({ message: "Error en el servidor" });
//   }
// });

app.options("/auth/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.send();
});

app.listen(4100, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
export default app;
