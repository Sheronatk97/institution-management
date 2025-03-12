// const mongoose = require("mongoose");

// const BDMschema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   location: { type: String, required: true,},
//   address: { type: Number, required: true },

// }, { timestamps: true });



// const BDM = mongoose.model("BDM", BDMschema);
// module.exports = BDM;
// models/BDM.js
const mongoose = require("mongoose");

const BDMschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, default: "BDM" },
  },
  { timestamps: true }
);

const BDM = mongoose.model("BDM", BDMschema);
module.exports = BDM;
