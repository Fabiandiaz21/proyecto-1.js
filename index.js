import express from 'express'
import mongoose from 'mongoose';
import categorias from './routers/categorias.js'
import terceros from './routers/terceros.js'
import usuarios from './routers/usuarios.js'
import movimientos from './routers/movimiento.js'
import articulos from "./routers/articulos.js"
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/movimientos",movimientos)
app.use("/api/articulos",articulos)
app.use("/api/categorias",categorias)
app.use("/api/terceros",terceros)
app.use("/api/usuarios",usuarios)


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect(process.env.CNX_MONGO)
    .then(() => console.log('Connected!'))
    .catch((error)=> console.log(error))
})

//pruevaaaa