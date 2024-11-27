import mongoose from "mongoose";
import Movimientos from "../models/movimientos.js";



const httpmovimientos = {
    //añair
    postmovimiento: async (req,res) => {
        try{
            const {tipo,num_fact,fecha, articulos,
            valor, iva, total,estado
        } = req.body
        const movimiento = new Movimientos({
            tipo,num_fact,fecha,articulos,valor,iva,total,estado
        });
        await movimiento.save();
        res.json({ movimiento });
        }catch(error){
            res.status  (400).json({ error:"falla en la operacion"});
            console.log(error)
        }
    },

    //modificar 
    putmovimiento:async (req,res ) => {
        try{
            const {id} = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:"ID no es valido"});
            }

            const {tipo,num_fact,fecha, articulos,valor, iva, total, estado} = req.body;
            const movimiento = await Movimientos.finByAndUdate(id,{tipo,num_fact,fecha, articulos,
                valor, iva, total, estado},{new:true});  

                 

                if(!movimiento){
                    return res.status(404).json({error:"Movimiento no encontrado"})

                }
                res.json(movimiento);

        }catch(error){
            res.status(400).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },


    //devolucion de salida
    putmovimientoDevSal:async (req,res ) => {
        try{
            const {id} = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:"ID no es valido"});
            }

            const movimiento = await Movimientos.finByAndUdate(id,{tipo:4},{new:true});  

                 

                if(!movimiento){
                    return res.status(404).json({error:"Movimiento no encontrado"})

                }
                res.json(movimiento);

        }catch(error){
            res.status(400).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },

    //devolucion de entrada
    putmovimientoDevEnt:async (req,res ) => {
        try{
            const {id} = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:"ID no es valido"});
            }
            const movimiento = await Movimientos.finByAndUdate(id,{tipo:3},{new:true});  

                 

                if(!movimiento){
                    return res.status(404).json({error:"Movimiento no encontrado"})

                }
                res.json(movimiento);

        }catch(error){
            res.status(400).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },


    //listar todos
    getmovimientos: async (req,res) => {
        try{
            const movimientos = await Movimientos.find();
            res.json(movimientos);
        }catch(error){
            res.status(500).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },
   
    //listar por ID
    getmovimientoById: async (req,res) => {
        try{
            const {id} = req.params;
            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const movimiento = await Movimientos.findById(id);
            if (!movimiento) {
                return res.status(404).json({ error: "movimiento no encontrado" });
            }
            res.json({ movimiento });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
        },
    

        // activar
    putActivar: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const movimiento = await Movimientos.findByIdAndUpdate(id, { state: "aprobado" }, { new: true });
            if (!movimiento) {
                return res.status(404).json({ error: "movimiento no encontrado" });
            }
            res.json({ movimiento });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

     // inactivar
     putInactivar: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const movimiento = await Movimientos.findByIdAndUpdate(id, { state: "anulado" }, { new: true });
            if (!mo) {
                return res.status(404).json({ error: "Movimiento no encontrado" });
            }
            res.json({ movimiento });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },




    // listar aprobado
    getAprobados: async (req, res) => {
        try {
            const movimientos = await Movimientos.find({ estado: "aprobado" });
            
            if (!movimientos.length) {
                return res.status(404).json({ error: "No se encontraron movimientos aprobados" });
            }
    
            res.json({ movimientos });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    


    // listar anulado
    getAnulados: async (req, res) => {
        try {
            const movimiento = await Movimientos.find({ state: "anulado" });
            
            if (!movimiento.length) {
                return res.status(404).json({ error: "No se encontraron movimientos anulados" });
            }
    
            res.json({ movimiento });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    // listar-tipo
    getTiposMovimientos: async (req, res) => {
        try {
            const movimientos = await Movimientos.find().select('tipo');
            
            if (!movimientos.length) {
                return res.status(404).json({ error: "No se encontraron movimientos" });
            }
    
            res.json({ movimientos });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    
    // movimientos fecha
    getListarMovimientosPorFecha: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            
            const listaMovimientos = await Movimientos.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                }
            });
            
            res.json(listaMovimientos);
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener lista de movimientos por rango de fechas' });
        }
    },

      // total fecha
    getTotalvendido: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const listaMovimientos = await Movimientos.find({
                fecha: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                },
                tipo: 2
            });
            const totalVendido = listaMovimientos.reduce((acum, movimiento) => acum + movimiento.valor, 0);
            res.json(totalVendido);
        } catch (error) {
            res.status(400).json({ error: 'Error al obtener total de ventas' });
        }
    },

    
}

export default  httpmovimientos


