
const express = require('express');
// const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const router = express.Router();

const {protect} = require('../middleware/authMiddleware');
const {authMiddleware} = require('../middleware/authMiddleware');
const Designer = require("../models/Designer"); 
const User = require('../models/User');
const { findUserByEmailAndCheckPassword } = require('../utils/findUserByEmail'); // Import the function
const LoginLog = require('../models/LoginLog'); 

const Course = require('../models/course.model');
const BDM = require('../models/BDM');
const LeaveRequest = require("../models/LeaveRequest");
// const AssociateConsultant = require('../models/AssociateConsultant');

const multer = require('multer');
const path = require('path');

// Set up storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Add timestamp to filename
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Define allowed file types
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type'), false); // Reject file
  }
};

// Initialize multer middleware
const upload = multer({ storage, fileFilter });

router.post("/register", upload.single('idProof'), async (req, res) => {
  const {
    name,
    phone,
    address,
    gender,
    qualification,
    email,
    password, 
    // bdm, // Associate the student with a BDM
    course, // Associate the student with a course
    dob,  // Date of Birth
  } = req.body;

  const token = req.headers.authorization?.split(' ')[1] || req.headers.id;
  
  // Log token and request body for debugging
  // console.log("Token:", token);
  // console.log("Request Body:", req.body);
  // console.log("File:", req.file); // This will log the uploaded file (idProof)

  // Check if all required fields are provided
  if (!name || !phone || !address || !gender || !qualification || !email || !password ||  !course || !dob) {
    return res.status(400).json({ message: "Please provide all required fields: name, phone, address, gender, qualification, email, password,  course, dob, and idProof." });
  }

  try {
    // Check if the student already exists
    const studentExists = await User.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Validate BDM (Institution)
    // const bdmExists = await BDM.findById(bdm);
    // if (!bdmExists) {
    //   return res.status(404).json({ message: "BDM not found" });
    // }

    // Validate Course
    const courseExists = await Course.findOne({ _id: course, });
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found for the selected BDM" });
    }

    // If file exists, set idProof to file path
    const idProof = req.file ? req.file.path : null; // Save the file path

    // Create Student
    const student = new User({
      name,
      phone,
      address,
      gender,
      qualification,
      email,
      password,  // Store hashed password
      // bdm,
      course,
      dob, // Ensure dob is stored correctly in the DB
      idProof, // Store the path to the uploaded file
    });

    // Save the student in the database
    await student.save();
    res.status(201).json({ message: "Student registered successfully" });

  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
// Get all BDMs (Institutions)
router.get("/bdms", async (req, res) => {
    try {
        const bdms = await BDM.find();
        res.json(bdms);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch BDMs", error: err.message });
    }
});

// Get Courses by BDM ID
router.get("/courses/:bdmId", async (req, res) => {
    try {
        const courses = await Course.find({ bdm: req.params.bdmId });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch courses", error: err.message });
    }
});



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
      role: 'admin',
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

    // Log the login time to the LoginLog collection
    const loginLog = new LoginLog({
      userId: user._id,  // Store the user's ID
      loginTime: new Date(), // Store the current timestamp
    });

    await loginLog.save();  // Save the login log to the database

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



const mongoose = require('mongoose');

router.get('/login-history', async (req, res) => {
 
  try {
    const loginHistory = await LoginLog.find()
      .sort({ loginTime: -1 })
      .populate('userId'); // Populate only the 'name' field from the User model

    if (loginHistory.length === 0) {
      return res.status(404).json({ message: 'No login history found for this user' });
    }

    res.json(loginHistory);
  } catch (error) {
    console.error('Error fetching login history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to get login history for a given userId (received as URL parameter)
router.get('/login-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;  // Get the userId from URL parameters

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch login history for the specified userId
    const loginHistory = await LoginLog.find({ userId })
      .sort({ loginTime: -1 })  // Sort by most recent login
      .populate('userId', 'name');  // Populate the 'name' field from the User model

    if (loginHistory.length === 0) {
      return res.status(404).json({ message: 'No login history found for this user' });
    }

    res.json(loginHistory);  // Return the login history
  } catch (error) {
    console.error('Error fetching login history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post("/request-leave", async (req, res) => {
  const { reason, startDate, endDate } = req.body;
  const userId = req.headers.id; // Assuming the logged-in user ID is sent in the headers as 'id'

  // Validate that userId is provided
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Validate required fields: reason, startDate, endDate
  if (!reason || !startDate || !endDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new leave request with the logged-in user's ID and provided data
    const leaveRequest = new LeaveRequest({
      userId,  // Assign the userId from the headers (logged-in user)
      reason,
      startDate,
      endDate,
    });

    // Save the leave request to the database
    await leaveRequest.save();

    // Respond with a success message
    res.status(200).json({ message: "Leave request submitted successfully" });
  } catch (error) {
    console.error(error);
    // Catch any server errors and return a generic error message
    res.status(500).json({ message: "Server error" });
  }
});


// Route to get all leave requests
router.get("/leave-requests", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find()
      .populate("userId", "name course") // Ensure the user is populated with the correct fields
      .exec();
    
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Route to approve/reject a leave request
router.post("/update-leave-status", async (req, res) => {
  const { leaveRequestId, status } = req.body;
  
  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      leaveRequestId,
      { status },
      { new: true }
    );
    
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json({ message: `Leave request ${status} successfully`, leaveRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get only approved leave requests
router.get("/approved-leave-requests", async (req, res) => {
  try {
    // Get only the leave requests with "Approved" status
    const approvedLeaveRequests = await LeaveRequest.find({ status: "Approved" })
      .populate("userId", "name course")  // Ensure user details are populated
      .exec();
    
    res.status(200).json(approvedLeaveRequests);  // Send the approved leave requests
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




router.get("/my-leave-requests", async (req, res) => {
  try {
    // Extract the userId from headers
    const userId = req.headers.id;

    console.log("User ID from headers:", userId); // For debugging
    console.log("Request body:", req.body); // For debugging

    // Validate if userId is present
    if (!userId) {
      return res.status(400).json({ message: "User ID is required in headers" });
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user to ensure they exist (optional, for validation)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find leave requests for the specific userId and return full details
    const leaveRequests = await LeaveRequest.find({ userId })
      .populate("userId", "name email")  // Populate user details (example: name and email)
      .exec();

    if (!leaveRequests || leaveRequests.length === 0) {
      return res.status(404).json({ message: "No leave requests found for this user" });
    }

    // Return the leave request details including the status and other fields
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching leave requests" });
  }
});


router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid user ID");
  }
  const user = await User.findById(userId);
  res.json(user);
});

// Route to get all users
router.get('/getAllUsers', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find().populate('course', 'name').exec(); // Use populate to fetch course details

    // Check if no users are found
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Return users as JSON response
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
// //----------------needed
// router.get('/profile/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     // Fetch user from the database based on userId
//     const user = await User.findById(userId).populate('course').populate('consultant');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user); // Return user profile data
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving user profile' });
//   }
// });

router.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Fetch user from the database based on userId and populate related fields
    const user = await User.findById(userId).populate('course').populate('consultant');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construct the full path for the image and idProof if they exist
    if (user.image) {
      user.image = `http://localhost:3000/uploads/${user.image}`;
    }

    if (user.idProof) {
      user.idProof = `http://localhost:3000/uploads/${user.idProof}`;
    }

    // Return the user profile data with the full paths for image and idProof
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user profile', error: err.message });
  }
});



router.put('/profileupdate/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body; // The data to update comes from the request body

    // Find the user by userId and update the profile
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure that the update passes schema validation
    }).populate('course').populate('consultant');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return the updated user profile data
  } catch (err) {
    res.status(500).json({ message: 'Error updating user profile', error: err.message });
  }
});




router.get('/coursedetails/:userId', async (req, res) => {
  try {
    // Extract userId from the URL parameter
    const { userId } = req.params;

    // Check if the userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Attempt to find the user by ID and populate related course and consultant data
    const user = await User.findById(userId)
      .populate('course', 'name description duration fee')  // Populate the course data (name, description, etc.)
      .populate('consultant', 'name')  // Populate the consultant's name
      .select('name startDate endDate slot');  // Select specific fields from the user

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare the response data with user details and course details
    const responseData = {
      id: user._id,  // User's ID
      name: user.name,  // User's name
      description: user.course?.description || 'N/A',  // Course description, defaulting to 'N/A' if not available
      duration: user.course?.duration || 'N/A',  // Course duration, defaulting to 'N/A' if not available
      fee: user.course?.fee || 'N/A',  // Course fee, defaulting to 'N/A' if not available
      startDate: user.startDate,  // User's start date
      endDate: user.endDate,  // User's end date
      slot: user.slot,  // User's slot
      consultantName: user.consultant?.name || 'N/A',  // Consultant's name, defaulting to 'N/A' if not available
    };

    // Send the response back to the client with the user and course data
    res.json(responseData);

  } catch (error) {
    // If an error occurs, log it and return a 500 server error response
    console.error('Error fetching course details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
