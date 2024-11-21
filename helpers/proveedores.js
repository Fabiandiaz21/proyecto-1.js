import proveedores from "../models/proveedores.js";

const helperProveedor= {
    validarEmail: async (email) => {
        const existe = await proveedores.findOne({ email })
        if (existe) {
            throw new Error("El email ya existe")
        }
    },
    validarId: async (id) => {
        const existe = await proveedores.findById(id)
        if (!existe) {
            throw new Error("Id no existe")
        }
    }
}

export default helperProveedor
