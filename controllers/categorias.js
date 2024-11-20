import mongoose from "mongoose";
import categorias from "../models/categorias.js";

const httpcategorias = {

    //Crear
    postcategorias:async(req,res)=>{
        try{
            const {
                descripcion,estado
            } = req.body
            const categoria = new categorias({
                descripcion,estado
            });
            await categoria.save();
            res.json({ categoria});
        }catch(error){
            res.status(404).json({error:"Falla en la operacion"})
            console.log(error);
        }
    },

    // Función para modificar una categoría
putcategorias: async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de la categoría desde la URL
        const { descripcion, estado } = req.body; // Obtener descripcion y estado del cuerpo de la solicitud

        // Actualizar la categoría en la base de datos
        const categoria = await categorias.findByIdAndUpdate(id, { descripcion, estado }, { new: true });

        // Si la categoría no se encuentra
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        // Devolver la categoría actualizada
        res.json({ message: 'Categoría actualizada con éxito', categoria });
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: 'Falla en la operación', details: error.message });
    }
},


     //Listar todos
     getcategorias: async (req,res) => {
        try{
            const categoria = await categorias.find();
            res.json({categoria});
        }catch(error){
            res.status(500).json({error:"Falla en la operacion"})
            console.log(error)
        }
    },

     //Listar por ID
     getcategoriasById: async (req,res) => {
        try{
            const {id} = req.params;

            //Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const categoria = await categorias.findById(id);

            if (!categoria) {
                return res.status(404).json({ error: "Categoria no encontrada" });
            }
            res.json({ categoria });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
        },

    //Activar
    putActivarCategorias: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const categoria = await categorias.findByIdAndUpdate(id, { estado: "aprobado" }, { new: true });
            if (!categoria) {
                return res.status(404).json({ error: "categoria no encontrada" });
            }
            res.json({ categoria });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Desactivar
    putInactivarCategorias: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const categoria = await categorias.findByIdAndUpdate(id, { estado: "anulado" }, { new: true });
            if (!categorias) {
                return res.status(404).json({ error: "categoria no encontrada" });
            }
            res.json({ categoria });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Lista por activos
    getActivos: async (req, res) => {
        try {
            const categoria = await categorias.find({ estado: "activo" });
            res.json({ categoria });
        } catch (error){
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

     //Lista por inactivos
     getAnulados: async (req, res) => {
        try {
            const categoria = await categorias.find({ estado: "anulado" });
            res.json({ categoria });

        } catch (error){
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

}

export default  httpcategorias
