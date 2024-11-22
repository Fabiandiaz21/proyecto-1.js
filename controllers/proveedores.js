import mongoose from "mongoose";
import proveedores from "../models/proveedores.js";


const httpProveedores = {

    //añadir
    postProveedores: async (req, res) => {
        try {
            const {
                
                nombre, identificacion, direccion, telefono, email, estado
            } = req.body

            const proveedor = new proveedores({
                nombre, identificacion, direccion, telefono, email, estado
            });

            await proveedor.save();
            res.json({ proveedor });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operacion" });
            console.log(error)
        }
    },

    //modificar
    putProveedores: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no es válido" });
            }
    
            const { nombre, identificacion, direccion, telefono, email, estado } = req.body;
    
            // Actualizar el documento
            const proveedor = await proveedores.findByIdAndUpdate(id, 
                { nombre, identificacion, direccion, telefono, email, estado }, 
                { new: true }
            );
    
            if (!proveedor) {
                return res.status(404).json({ error: "Proveedor no encontrado" });
            }
    
            res.json({ proveedor });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.error(error);
        }
    },
    

    //listor todo 
    getProveedores: async (req, res) => {

        try {
            const proveedor = await proveedores.find();
            res.json(proveedor)

        } catch (error) {
            res.status(500).json({ error: "Falla en la operacion" })
            console.log(error)
        }
    },
    //listar por ID
    gatProveedorByid: async (req, res) => {
        try {
            const { id } = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no es valido" });
            }

            const proveedor = await proveedores.findById(id);
            if (!proveedor) {
                return res.status(404).json({ error: "Terceros no encontrados" })
            }
            res.json(proveedor);
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    //Activar
    putActivarProveedor: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const proveedor = await proveedores.findByIdAndUpdate(id, { estado: "aprobado" }, { new: true });
            if (!proveedor) {
                return res.status(404).json({ error: "terceros no encontrados" });
            }
            res.json({ proveedor });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    putInactivarProveedor: async (req, res) => {
        try {
            const { id } = req.params;

            // Validar que el ID sea un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const proveedor = await proveedores.findByIdAndUpdate(id, { estado: "anulado" }, { new: true });
            if (!proveedor) {
                return res.status(404).json({ error: "terceros no encontrados" });
            }
            res.json({ proveedor });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Lista por activos
    getActivos: async (req, res) => {
        try {
            const proveedor = await proveedores.find({ estado: "activo" });
            if (!proveedor.length) {
                return res.status(404).json({ error: "No se encontraron terceros aprobados" });
            }

            res.json({ proveedor });

        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Lista por inactivos
    getAnulados: async (req, res) => {
        try {
            const proveedor = await proveedores.find({ estado: "anulado" });

            if (!proveedor.length) {
                return res.status(404).json({ error: "No se encontraron terceros anulados" });
            }

            res.json({ proveedor });

        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
}

export default httpProveedores;

