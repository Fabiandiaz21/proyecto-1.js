import mongoose from "mongoose";
import clientes from "../models/cliente.js";


const httpcliente = {

    //añadir
    postCliente: async (req, res) => {
        try {
            const {
                
                nombre, identificacion, telefono, email, estado
            } = req.body

            const cliente = new clientes({
                nombre, identificacion, telefono, email, estado
            });

            await cliente.save();
            res.json({ cliente });
        } catch (error) {
            res.status(400).json({ error: "Falla en la operacion" });
            console.log(error)
        }
    },

    //modificar
    putCliente: async (req, res) => {
        try {
            const {id} = req.params;
            const {nombre, identificacion, telefono, email, estado} = req.body
            const cliente = await clientes.findByIdAndUpdate(id, {nombre, identificacion, telefono, email, estado}, { new: true });
            res.json({cliente});

        } catch (error) {
            res.status(400).json({ error: "Falla en la operacion" });
            console.log(error)
        }
    },

    //listor todo 
    getCliente: async (req, res) => {

        try {
            const cliente = await clientes.find();
            res.json(cliente)

        } catch (error) {
            res.status(500).json({ error: "Falla en la operacion" })
            console.log(error)
        }
    },
    //listar por ID
    gatClienteByid: async (req, res) => {
        try {
            const { id } = req.params;

            //validar que el id sea un objeto valido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no es valido" });
            }

            const cliente = await clientes.findById(id);
            if (!cliente) {
                return res.status(404).json({ error: "Terceros no encontrados" })
            }
            res.json(cliente);
        } catch (error) {
            res.status(400).json({ error: "Falla en la operación" });
            console.log(error);
        }
    },

    //Activar
    putActivarCliente: async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }
    
            const cliente = await clientes.findByIdAndUpdate(
                id,
                { estado: "activo" }, 
                { new: true }
            );
    
            if (!cliente) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }
    
            res.json({ cliente });
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },

 
    putInactivarcliente: async (req, res) => {
        try {
            const { id } = req.params;

           
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }

            const clienteActualizado = await clientes.findByIdAndUpdate(
                id,
                { estado: "anulado" },
                { new: true }
            );

            if (!clienteActualizado) {
                return res.status(404).json({ error: "Cliente no encontrado" });
            }

            res.json({ cliente: clienteActualizado });
        } catch (error) {
            res.status(400).json({ error: "La operación no se realizó correctamente" });
            console.log(error);
        }
    },

    //Lista por activos
    getActivos: async (req, res) => {
        try {
            const cliente = await clientes.find({ estado: "activo" }); 
            res.json({ cliente }); 

        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
    
    getAnulados: async (req, res) => {
        try {
            const Cliente = await clientes.find({ estado: "anulado" }); 
            res.json({ Cliente }); 
        } catch (error) {
            res.status(400).json({ error: "Operación no se realizó correctamente" });
            console.log(error);
        }
    },
}

export default httpcliente;

