import mongoose from "mongoose";
import Terceros from "../models/terceros.js"


const httpTerceros = {

    //añadir
    postTerceros:async(req,res)=>{
        try{
            const {
                nombre,identificacion,direccion,telefono,email,estado,tipo
            } = req.body

            const tercero = new Terceros({
                nombre,identificacion,direccion,telefono,email,estado,tipo
            });

            await tercero.save();
        }catch(error){
            res.status(400).json({error:"Falla en la operacion"});
            console.log (error)
        }
    },

    //modificar
    putTerceros:async(req,res)=>{
        try{
            const {id} = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({error:"ID no es valido"});
           }

            const {
                nombre,identificacion,direccion,telefono,email,estado,tipo
            } = req.body

            const tercero = await Terceros.findByIdAndUpdate(req.params, {
                nombre,identificacion,direccion,telefono,email,estado,tipo
            }, {new:true});

        }catch(error){
            res.status(400).json({error:"Falla en la operacion"});
            console.log (error)
        }
    },

    //listor todo 
    getTerceros:async(req,res)=>{
        
        try{
            const terceros = await Terceros.find();
            req.json(terceros)

        }catch(error){
            res.status(500).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },
    //listar por ID
    gatTercerosByid:async(req,res)=>{
        try{
            const {id} = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({error:"ID no es valido"});
           }

            const tercero = await Terceros.findById(id);
            if(!tercero){
                return res.status(404).json({error:"Terceros no encontrados"})
            }
            res.json(tercero);
        }catch(error){
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    //Activar
    putActivarTerceros: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const tercero = await Terceros.findByIdAndUpdate(id, { state: "aprobado" }, { new: true });
            if (!tercero) {
                return res.status(404).json({ error: "terceros no encontrados" });
            }
            res.json({ tercero });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Desactivar
    putInactivarTerceros: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const terceros = await Terceros.findByIdAndUpdate(id, { state: "anulado" }, { new: true });
            if (!terceros) {
                return res.status(404).json({ error: "terceros no encontrados" });
            }
            res.json({ terceros });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

      //Lista por activos
      getActivos: async (req, res) => {
        try {
            const terceros = await  Terceros.find({ estado: "aprobado" });
            if (!terceros.length) {
                return res.status(404).json({ error: "No se encontraron terceros aprobados" });
            }

            req.json({ terceros });

        } catch (error){
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Lista por inactivos
    getAnulados: async (req, res) => {
        try {
            const terceros = await Terceros.find({ estado: "anulado" });
            
            if (!terceros.length) {
                return res.status(404).json({ error: "No se encontraron terceros anulados" });
            }

            req.json({ terceros });

        } catch (error){
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //tipo 
    getTipoTerceros:async(req,res)=>{
        try{
            const terceros = await Terceros.find().select('tipo');
            if (!terceros.length) {
                return res.status(404).json({ error: "No se encontraron terceros" });
            }
    
            res.json({ terceros });
        }catch(error){
            res.status(400).json({error:"Falla en la operacion"});
            console.log (error)
        }
    }



}

export default httpTerceros;

