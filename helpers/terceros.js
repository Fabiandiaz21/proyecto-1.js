import Tercero from "../models/terceros.js";

const helperTerceros = {
    validarEmail: async (email) => {
        const existe = await Tercero.findOne({ email })
        if (existe) {
            throw new Error("El email ya existe")
        }
    },
    validarId: async (id) => {
        const existe = await Tercero.findById(id)
        if (!existe) {
            throw new Error("Id no existe")
        }
    }
}

export default helperTerceros

