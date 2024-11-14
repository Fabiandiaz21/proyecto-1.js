const Categoria = require('../models/categorias');


const helpercategoria = {
    
    validarId:async (id)=>{
        const existe=await Categoria.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },

}

module.exports={helpercategoria}