const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const financeSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,ref:"User",
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    totalInstallment: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        default: '0'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    status:{
        type:String
    },
    paymentmethod:{
        type:String
    },
    nextInstallmentDate:{
        type:String
    },
});

module.exports = mongoose.model('Finance', financeSchema);