import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:String, required:true
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: mongoose.Schema.Types.Mixed, // Accepts object
        required: true
    },
    status: {
        type: String,
        default: "Placed"
    },
    date : {
        type: Date,
        default: Date.now
    },
    payment : {
        type: String, // Accepts payment method string
        default: "Cash on Delivery"
    }
})
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;