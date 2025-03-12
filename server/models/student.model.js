const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    course: { type: String, required: true },
    qualification: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { timestamps: true });
  
//   studentSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
    
//     const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next();
//   });
  
//   studentSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);  // Compares entered password to stored hashed password
// };

// studentSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
  const Student = mongoose.model("Student", studentSchema);
  module.exports =  Student;
  