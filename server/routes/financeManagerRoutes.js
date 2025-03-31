// routes/financeManagerRoutes.js
const express = require('express');
const FinanceManager = require('../models/financeManager.model');
const bcrypt = require('bcryptjs');
const finance = require('../models/finance');
const router = express.Router();
const nodemailer=require('nodemailer');
const User = require('../models/User');

// CREATE: Add a new FinanceManager
router.post('/createFinanceManager', async (req, res) => {
  try {
    const { fullName, email, phone, address, password } = req.body;

    // Save the password directly without hashing
    const newFinanceManager = new FinanceManager({
      fullName,
      email,
      phone,
      address,
      password// Save password directly
    });

    await newFinanceManager.save();
    res.status(201).json({ message: 'Finance Manager created successfully', data: newFinanceManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// READ: Get all FinanceManagers
router.get('/getFinanceManagers', async (req, res) => {
  try {
    const managers = await FinanceManager.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// READ: Get a FinanceManager by ID
router.get('/getfinancemanager/:id', async (req, res) => {
  try {
    const manager = await FinanceManager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: 'Finance Manager not found' });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// UPDATE: Update a FinanceManager by ID
router.put('/updatefinancemanager/:id', async (req, res) => {
  try {
    const { fullName, email, phone, address, password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedData = {
      fullName,
      email,
      phone,
      address,
      password: hashedPassword || undefined
    };

    const updatedManager = await FinanceManager.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedManager) {
      return res.status(404).json({ message: 'Finance Manager not found' });
    }
    res.status(200).json({ message: 'Finance Manager updated successfully', data: updatedManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE: Delete a FinanceManager by ID
router.delete('/deletefinancemanager/:id', async (req, res) => {
  try {
    const deletedManager = await FinanceManager.findByIdAndDelete(req.params.id);
    if (!deletedManager) {
      return res.status(404).json({ message: 'Finance Manager not found' });
    }
    res.status(200).json({ message: 'Finance Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// FETCH STUDENTS 
router.get('/viewStudents',async(req,res)=>{
    console.log("students")
    const students=await User.find().populate("course")
    console.log(students)
    const finances=await finance.find()
    res.json(students)
  }
)

router.get('/fetchpaymentsfinance',async(req,res)=>{
  const students = await finance
  .find()
  .populate({
    path: 'studentId',
    populate: {
      path: 'course'
    }
  });

  res.json(students)
})

router.get('/fetchpaymentstudent',async(req,res)=>{
  const id=req.headers.id
  console.log(id)
  const students=await finance.findOne({studentId:id}).populate({
    path: 'studentId',
    populate: {
      path: 'course'
    }
  })
  console.log("students",students)
  res.json(students)
})


router.post("/addFees/:id",async(req,res)=>{
  const id=req.params.id
  console.log(id)
  const {totalAmount,totalInstallment,paymentmethod}=req.body
      const finances=await finance({
          studentId:id,
          totalAmount,
          totalInstallment,
          paymentmethod:paymentmethod,
          status:"TotalAmount Added",
          paidAmount:0,
      })
      finances.save()
      res.json("Details entered successfully")
})

router.put("/updatePayment",async(req,res)=>{
  const id=req.headers.id
  console.log(id)  
  const {paymentStatus,paidAmount}=req.body
  console.log(id,paymentStatus)
  const student=await finance.findOne({studentId:id})
  console.log(student)
  student.paymentStatus=paymentStatus
  student.paidAmount+=paidAmount
  student.paymentDate=Date.now()
  student.save()
  res.json("Payment Made successfull")
})

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use Gmail as the email service (or replace with another email service)
  auth: {
    user: 'rajeshrithik49@gmail.com',  // Your email address (sender)
    pass: 'wjqo hcwa blhb dmjq',   // Your email password (use environment variables in real scenarios)
  },
});


router.post("/sendPaymentEmail",async (req, res) => {
  try {
    const {id, email, totalInstallments, nextInstallmentAmount, remainingInstallments, nextInstallmentDate } = req.body;
    console.log(req.body)
    const finances=await finance.findOne({_id:id})
    finances.nextInstallmentDate=nextInstallmentDate
    await finances.save()
    // Prepare the email content
    const mailOptions = {
      from: 'rajeshrithik49@gmail.com',  // Sender email
      to: email,                     // Recipient email (provided in the body)
      subject: 'Payment Installment Information',
      text: `
        Dear Student,
        
        This is a reminder regarding your payment plan.
        
        You have a total of ${totalInstallments} installments.
        The next installment amount is Rs.${nextInstallmentAmount}.
        Remaining installments: ${remainingInstallments}.
        
        Your next installment is due on ${nextInstallmentDate}.
        
        Thank you!
        
        Best regards,
        Camerinfolks Pvt.Ltd
      `, // Email body text
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Respond to the client
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (err) {
    console.log('Error sending email:', err);
    res.status(500).json({ error: 'Error sending email' });
  }
})

module.exports = router;
