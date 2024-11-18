import Usuario from '../models/usuarios.js';

const helperUsuario = {
    
    validarId:async (id)=>{
        const existe=await Usuario.findById(id)
        if(!existe){
            throw new Error ("El id no existe")
        }
    },

}

export default helperUsuario