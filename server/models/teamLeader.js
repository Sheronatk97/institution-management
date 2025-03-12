
  const mongoose = require("mongoose");
  const bcrypt = require('bcryptjs');

const teamLeaderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    department: {type:String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "Team Leader" },
  },
  { timestamps: true }
);

// teamLeaderSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
    
//     const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next();
//   });

// teamLeaderSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);  // Compares entered password to stored hashed password
// };

// teamLeaderSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });


const TeamLeader = mongoose.model("TeamLeader", teamLeaderSchema);

module.exports = TeamLeader;
