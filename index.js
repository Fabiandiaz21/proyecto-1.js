import express from 'express'
import mongoose from 'mongoose';
import categorias from './routers/categorias.js'
import terceros from './routers/terceros.js'
import movimientos from './routers/movimiento.js'
import articulos from "./routers/articulos.js"
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(express.json())
app.use("/api/movimientos",movimientos)
app.use("/api/articulos",articulos)
app.use("/api/categorias",categorias)
app.use("/api/terceros",terceros)


app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect(process.env.CNX_MONGO)
    .then(() => console.log('Connected!'))
    .catch((error)=> console.log(error))
})



// prueva de coneccion llllll