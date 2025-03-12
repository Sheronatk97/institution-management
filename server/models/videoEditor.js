
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const videoEditorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: Number, required: true },
  primarySkills: { type: [String], required: true },
  role: { type: String, required: true, default: "Video Editor" },
});

// videoEditorSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
    
//     const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next();
//   });


// videoEditorSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);  // Compares entered password to stored hashed password
// };
// Hash the password before saving it to the database
// videoEditorSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) {
//     return next(); // Skip hashing if the password has not been modified
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error); 
//   }
// });

module.exports = mongoose.model("videoEditor", videoEditorSchema);
