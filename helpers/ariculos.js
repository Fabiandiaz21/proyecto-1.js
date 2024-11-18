import Articulo from '../models/articulos.js';

const helperArticulo = {
    
    validarId:async (id)=>{
        const existe=await Articulo.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },

}

export default helperArticulo