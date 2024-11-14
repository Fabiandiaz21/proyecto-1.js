const Articulo = require('../models/articulos');


const helperArticulo = {
    
    validarId:async (id)=>{
        const existe=await Articulo.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },

}

module.exports={helperArticulo}