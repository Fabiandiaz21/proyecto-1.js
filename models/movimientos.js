import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema({
    tipo: { type:String, required: true }, // 1: compra, 2: venta, 3:devolucion_compra, 4:devolucion_venta
    num_fact: { type:String },
    fecha: { type: Date, default: Date.now },
    articulos: [
        {
            articulo:{type:mongoose.Schema.Types.ObjectId,ref:'articulo',required:true, },
            cantidad: { type:Number, required: true },
            precio: { type:Number, required: true }
        }
    ],
    valor: { type: Number, required: true },  
    iva: { type: Number, required: true },
    total: { type: Number, required: true },
    estado: { type: String, required: true, enum: [ 'aprobado', 'anulado'], default: 'aprobado' }
});



export default mongoose.model ("Movimiento",movimientoSchema)
