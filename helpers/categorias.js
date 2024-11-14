import Categoria from '../models/categorias.js';

const helpercategoria = {

    validarId:async (id)=>{
        const existe=await Categoria.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },

}

export default helpercategoria