import movimiento from "../models/movimientos.js";

const helperMovimiento = {
    validarId:async (id)=>{
        const existe=await movimiento.findById(id)
        if(!existe){
            throw new Error ("el id no existe")
        }
    },
}

export default helperMovimiento