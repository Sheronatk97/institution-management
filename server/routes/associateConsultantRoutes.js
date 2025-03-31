const express = require("express");
const AssociateConsultant = require("../models/associateConsultantModel");
const User = require('../models/User'); // Adjust path as needed
const Student = require('../models/Student')

const router = express.Router();

// ➤ Create an Associate Consultant
router.post("/createconsultants", async (req, res) => {
  const { name, phone, address, email,password,bdm} = req.body;
  const token=req.headers.id
  console.log("token",token)
  try {
    const newCourse = new AssociateConsultant({
      name, phone, address, email,password,teamlead_id:token,role: "Associate Consultant"
    });
    console.log(newCourse)
    await newCourse.save();
    res.status(201).json({ message: "Consultant created successfully", consultant: newConsultant });
  } catch (error) {
    res.status(500).json({ message: "Failed to create consultant", error: error.message });
  }
});

  // console.log(req.body)
  // try {
  //   const consultant = new AssociateConsultant(req.body);
  //   await consultant.save();
  //   res.status(201).json({ message: "Associate Consultant created successfully", consultant });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
// 2. Get all courses with BDM details

router.get("/getconsultants_test", async (req, res) => {
  try {
    const consultants = await AssociateConsultant.find()
      .populate("teamlead_id", "name email phone location") // Populate the BDM details
      .exec();

    res.status(200).json(consultants); // Return the courses along with populated BDM info
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch consultants", error: error.message });
  }
});

// // ➤ Get All Associate Consultants
router.get("/getconsultants", async (req, res) => {
  try {
    const id=req.headers.id
    console.log(id)
    const consultants = await AssociateConsultant.find({teamlead_id:id});
    res.status(200).json(consultants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get a Single Associate Consultant by ID


// ➤ Update an Associate Consultant
router.put("/updateconsultants/:id", async (req, res) => {
  try {
    const consultant = await AssociateConsultant.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.status(200).json({ message: "Consultant updated successfully", consultant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete an Associate Consultant
router.delete("/deleteconsultants/:id", async (req, res) => {
  try {
    const consultant = await AssociateConsultant.findByIdAndDelete(req.params.id);

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.status(200).json({ message: "Consultant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






router.get('/consultants/:id', async (req, res) => {
  const { id } = req.params;

  // Ensure the ID is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ message: 'Invalid ObjectId format' });
  // }

  try {
    const consultant = await AssociateConsultant.findById(id).populate('teamlead_id');
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    res.status(200).json(consultant);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching consultant', error: err.message });
  }
});




// Route for fetching all consultants and their details
router.get('/consultantsforstudents', async (req, res) => {
  console.log("hi1 _consultant");
  try {
    let id = req.headers.id ? req.headers.id.trim() : '';

    // Validate if id is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid team lead ID" });
    // }

    const consultants = await AssociateConsultant.find({ teamlead_id: id })
      .populate({
        path: 'teamlead_id',
      
      });
       
      const student = await User.find()
      .populate({
        path:'course',
        
        
      })

    // Populate students based on teamlead_id
    // for (let consultant of consultants) {
    //   const students = await User.find({ teamlead_id: consultant.teamlead_id._id });
    //   consultant.students = students._id;
    // }
    const newconsultants=await AssociateConsultant.find()
    console.log(consultants)
    console.log("students")
    console.log(student)
    res.status(200).json({
      message: 'Associate consultants and their students retrieved successfully.',
      result:consultants,
      students:student
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({
      message: 'An error occurred while fetching data.',
      error: err.message,
    });
  }
});


router.get("/getid/:id", async (req, res) => {
  try {
    const consultant = await AssociateConsultant.findById(req.params.id);
    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.status(200).json(consultant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get('/getAllUsersCourse',  async (req, res) => {
//   try {
//     const users = await User.find().populate('course');
//     res.status(200).json({ users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching users", error: err });
//   }

// });
// router.get("/getconsultants", async (req, res) => {
//   try {
//     const consultants = await AssociateConsultant.find()
//       .populate("teamlead_id", "name email phone location") 
//       .exec();

//     res.status(200).json(consultants);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch consultants", error: error.message });
//   }
// });




router.get('/getAllUsersAndConsultants', async (req, res) => {
  try {
   
    const usersPromise = User.find().populate('course').populate("consultant");

    const consultantsPromise = AssociateConsultant.find()
      .populate("teamlead_id", "name email phone location")
      .exec();


    const [users, consultants] = await Promise.all([usersPromise, consultantsPromise]);

    for (const consultant of consultants) {
     
      await User.updateMany(
        { course: consultant.course }, 
        { $set: { "consultantInfo": { name: consultant.name, phone: consultant.phone, location: consultant.location } } } // Update users based on consultants' data
      );
    }

   
    res.status(200).json({ users, consultants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users and consultants", error: err.message });
  }
});



router.post("/updateconsultantsforstudents",async(req,res)=>{
  try{
    const{userId,consultantId}=req.body
    const user=await User.findById({_id:userId})
    user.consultant=consultantId
    await user.save()
    res.json("Consultent Added Successfully")
  }catch(err){
    console.log(err)
  }
})


// Route to assign a course schedule with a consultant passed in params
router.post('/assign-schedule/:consultantId', async (req, res) => {
  try {
    const { consultantId } = req.params;  // Get consultantId from params
    const { userId, startDate, endDate, slot } = req.body;

    // Validate inputs
    if (!userId ||  !startDate || !endDate || !slot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the consultant exists using consultantId from params
    const consultant = await Consultant.findById(consultantId);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newSchedule = new CourseSchedule({
      user: userId,  
      consultant: consultantId,  
      startDate,
      endDate,
      slot, 
    });

 
    await newSchedule.save();

    res.status(201).json({ message: 'Course schedule assigned successfully', schedule: newSchedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/updatescheduleforstudents', async (req, res) => {
  try {
    const { userId, consultantId, slot, startDate, endDate } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's schedule with slot, startDate, endDate, and consultantId
    user.slot = slot;
    user.startDate = startDate;
    user.endDate = endDate;
    user.consultant = consultantId;  // Assuming consultantId is passed in the request

    // Save the user with updated data
    await user.save();

    res.json({ message: 'Schedule updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to get users for a specific consultant based on consultantId in URL params
router.get('/getUsersForConsultant/:consultantId', async (req, res) => {
  try {
    // Get the consultantId from URL params
    const { consultantId } = req.params;

    if (!consultantId) {
      return res.status(400).json({ message: 'Consultant ID is required' });
    }

    // Fetch users for the consultant
    const users = await User.find({ consultant: consultantId })
      .select('name phone course')  // Fetch name, phone, and course only
      .populate('course', 'name'); // Populate course with name

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for this consultant' });
    }

    // Return the list of users
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;


