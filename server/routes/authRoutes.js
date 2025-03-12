// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// const router = express.Router();

// const protect = require('../middleware/authMiddleware');

// router.get('/admin-dashboard', protect(['admin']), (req, res) => {
//     res.json({ message: 'Welcome to Admin Dashboard' });
// });








// // Register route
// router.post('/register', async (req, res) => {
//     const { username, email, password, role } = req.body;

//     // Check if the user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     try {
//         const user = new User({
//             username,
//             email,
//             password,
//             role
//         });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//         message: 'Login successful',
//         token
//     });
// });

// module.exports = router;


                         


const express = require('express');
// const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const protect = require('../middleware/authMiddleware');

const Designer = require("../models/Designer"); 
const User = require('../models/User');
const { findUserByEmailAndCheckPassword } = require('../utils/findUserByEmail'); // Import the function





// Register route
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Please provide all required fields: username, email, password, and role' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const user = new User({
            username,
            email,
            password,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Check if the email and password are provided
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide both email and password' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//         message: 'Login successful',
//         token
//     });
// });

// // Admin Dashboard route (protected for admin role)
// router.get('/admin-dashboard', protect(['admin']), (req, res) => {
//     res.json({ message: 'Welcome to Admin Dashboard' });
// // });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       return res.status(400).json({ message: 'Please provide both email and password' });
//   }

//   // Check if the credentials match the default admin credentials
//   if (email === 'admin@gmail.com' && password === 'password123') {
//       const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

//       return res.json({
//           message: 'Admin login successful',
//           token,
//           role: 'admin'
//       });
//   }

//   // Normal user authentication
//   const user = await User.findOne({ email });
//   if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const isMatch = await user.matchPassword(password);
//   if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   res.json({
//       message: 'Login successful',
//       token,
//       role: user.role
//   });
// });


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide both email and password' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//         message: 'Login successful',
//         token,
//         role: user.role
//     });
// });


router.post('/add-hr',  async (req, res) => {
    const { username, password, name, age, qualification, email } = req.body;
  
    if (!username || !password || !name || !age || !qualification || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'hr',
      name,
      age,
      qualification,
      email
    });
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'HR added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding HR', error });
    }
  });
  

  
  // router.post('/loginall', async (req, res) => {
  //   const { email, password } = req.body;
  
  //   if (!email || !password) {
  //     return res.status(400).json({ message: 'Please provide both email and password' });
  //   }
  
  //   // Array of models to check the credentials
  //   const models = [
  //     User, TeamLeader, VideoEditor, Student, FinanceManager, DigitalMarketer, Designer, BDM, AssociateConsultant
  //   ];
  
  //   try {
  //     // Iterate through each model and check if the email exists
  //     for (const model of models) {
  //       const user = await model.findOne({ email });
  
  //       if (user) {
  //         // If user is found, check if the password matches
  //         const isMatch = await user.matchPassword(password); // Assuming matchPassword method exists in all models
  
  //         if (isMatch) {
  //           // Generate a JWT token
  //           const token = jwt.sign({ id: user._id, role: model.modelName.toLowerCase() }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  //           return res.json({
  //             message: 'Login successful',
  //             token,
  //             role: model.modelName.toLowerCase(), // Use model name as role
  //           });
  //         } else {
  //           return res.status(400).json({ message: 'Invalid credentials' });
  //         }
  //       }
  //     }
  
  //     // If no user is found in any model
  //     return res.status(400).json({ message: 'Invalid credentials' });
  
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // });

  // Utility function to find the user by email
// Utility function to find a user by email across multiple models













// router.post('/loginall', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password' });
//   }

//   // Find the user across all models and check the password
//   const user = await findUserByEmailAndCheckPassword(email, password);

//   // Debugging: Log the user to check what you get
//   console.log('User:', user);

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   // Debugging: Check if the matchPassword method exists
//   if (typeof user.matchPassword !== 'function') {
//     return res.status(400).json({ message: 'User does not have matchPassword method' });
//   }

//   // Debugging: Log if password matches
//   const isMatch = await user.matchPassword(password);
//   console.log('Password match:', isMatch);

//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   // Create JWT token with only the user ID
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   // Respond with success and token
//   res.json({
//     message: 'Login successful',
//     token,
//   });
// });




// // Function to find the user by email across all models
// const findUserByEmailAndCheckPassword = async (email, password) => {
//   // Search in all models for the email
//   const user =
//     (await User.findOne({ email })) ||
//     (await TeamLeader.findOne({ email })) ||
//     (await VideoEditor.findOne({ email })) ||
//     (await Student.findOne({ email })) ||
//     (await FinanceManager.findOne({ email })) ||
//     (await DigitalMarketer.findOne({ email })) ||
//     (await Designer.findOne({ email })) ||
//     (await BDM.findOne({ email })) ||
//     (await AssociateConsultant.findOne({ email }));

//   if (user) {
//     // If user is found, check if passwords match
//     const isMatch = await user.matchPassword(password);
//     if (isMatch) {
//       return user;  // Return the user if passwords match
//     }
//   }
//   return null;  // Return null if no match is found
// };

// // Login Route
// router.post('/loginall', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password' });
//   }

//   console.log('Searching for email:', email); // Debugging: log the email

//   // Check if the email exists in any model and the password is correct
//   const user = await findUserByEmailAndCheckPassword(email, password);

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   console.log('Found user:', user);

//   // Create a JWT token (no need to send role if it's not stored)
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   res.json({
//     message: 'Login successful',
//     token,
//   });
// });


// Import necessary packages role: 'admin'


 // Adjust this import based on your project structure
// Login route
router.post('/loginall', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  // Check if the credentials match the default admin credentials
  if (email === 'admin@gmail.com' && password === 'password123') {
    const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: 'Admin login successful',
      token,
      role: 'admin'
    });
  }

  // For normal user authentication (loginall equivalent)
  try {
    // Assuming you have a helper function that checks email and password
    const user = await findUserByEmailAndCheckPassword(email, password);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Directly compare the entered password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, generate a JWT token for the user
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      role: user.role
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// // Login route
// router.post('/loginall', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide both email and password' });
//   }

//   console.log('Searching for email:', email);

//   // Find the user by email (direct search for plain-text password)
//   const user = await findUserByEmailAndCheckPassword(email, password);

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   console.log('Found user:', user);

//   // Directly compare the entered password with the stored password
//   if (user.password !== password) {
//     console.log('Password comparison failed');
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   console.log('Password match successful');

//   // Create JWT token if the password is correct
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   // Respond with the token and role on successful login
//   res.json({
//     message: 'Login successful',
//     token,
//     role: user.role  // Include the role in the response
//   });
// });


module.exports = router;
