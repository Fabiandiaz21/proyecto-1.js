import proveedores from "../models/proveedores.js";

const helperProveedor= {
    validarId: async (id) => {
        const existe = await proveedores.findById(id)
        if (!existe) {
            throw new Error("Id no existe")
        }
    }
}

export default helperProveedor
