import cliente from "../models/cliente.js";

const helperCliente = {
    validarEmail: async (email) => {
        const existe = await cliente.findOne({ email })
        if (existe) {
            throw new Error("El email ya existe")
        }
    },
    validarId: async (id) => {
        const existe = await cliente.findById(id)
        if (!existe) {
            throw new Error("Id no existe")
        }
    }
}

export default helperCliente

