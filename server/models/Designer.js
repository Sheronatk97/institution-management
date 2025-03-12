// const mongoose = require("mongoose");

// const DesignerSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true } ,
//   department: { type: String, required: true },
//   experience: { type: Number, required: true },
//   primarySkills: { type: [String], required: true },
//   role: { type: String, required: true, default: "Designer" },
// });

// module.exports = mongoose.model("Designer", DesignerSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DesignerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: Number, required: true },
  primarySkills: { type: [String], required: true },
  role: { type: String, required: true, default: "Designer" },
});

// DesignerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);  // Salt rounds, can adjust
//   this.password = await bcrypt.hash(this.password, salt);  // Hash the password
//   next();
// });


// const enteredPassword = "12345";  // The plaintext password you want to check
// const storedHash = "$2a$10$XDqvaIFQzbymqrFqSiV5LuX2sKpwxLQrbtogesJu1zw9gQWHzp9A2";  // The hashed password from the DB

// bcrypt.compare(enteredPassword, storedHash).then((isMatch) => {
//   console.log("Password match:", isMatch);  // Should print: Password match: true
// }).catch(err => console.log(err));




// Method to compare entered password with hashed password
// DesignerSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


// DesignerSchema.methods.matchPassword = async function (enteredPassword) {
//   const isMatch = await bcrypt.compare(enteredPassword, this.password);  // Compare entered password with stored hash
//   console.log('Password comparison result:', isMatch);
//   return isMatch;
// };

// Hash the password before saving it to the database
// DesignerSchema.pre("save", async function(next) {
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

module.exports = mongoose.model("Designer", DesignerSchema);
