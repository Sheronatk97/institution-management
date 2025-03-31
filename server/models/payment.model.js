const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    FM_id: { type: mongoose.Schema.Types.ObjectId, ref: "FinanceManager", required: true },
    stu_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  }, { timestamps: true });
  
  const Payment = mongoose.model("Payment", paymentSchema);
  module.exports =  Payment;
  