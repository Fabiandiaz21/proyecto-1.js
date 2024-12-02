import express from 'express'
import mongoose from 'mongoose';
import categorias from './routers/categorias.js'
import clientes from './routers/cliente.js'
import usuarios from './routers/usuarios.js'
import movimientos from './routers/movimiento.js'
import articulos from "./routers/articulos.js"
import proveedores from './routers/proveedores.js';
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use("/api/movimientos",movimientos)
app.use("/api/articulos",articulos)
app.use("/api/categorias",categorias)
app.use("/api/clientes",clientes)
app.use("/api/usuarios",usuarios)
app.use("/api/proveedores",proveedores)


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect(process.env.CNX_MONGO)
    .then(() => console.log('Connected!'))
    .catch((error)=> console.log(error))
})



// prueva de coneccion llllll