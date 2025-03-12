// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// dotenv.config();
// const app = express();

// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);



// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log(err));

 

// // Basic route
// app.get("/", (req, res) => res.send("API is running"));

// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));




// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();
// const app = express();

// // Routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log(err));

// // Basic route
// app.get("/", (req, res) => res.send("API is running"));




// const User = require('./models/User');

// // Create default admin if it doesn't exist
// const createAdmin = async () => {
//     const adminExists = await User.findOne({ role: 'admin' });
//     if (!adminExists) {
//         const adminUser = new User({
//             username: 'admin',
//             email: 'admin@example.com',
//             password: 'adminpassword', // you can use a strong password here
//             role: 'admin',
//         });
//         await adminUser.save();
//         console.log('Default admin user created');
//     }
// };

// createAdmin();


// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");

dotenv.config();
const app = express();

app.use(express.json());  
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const designerRoutes = require("./routes/designerRoutes");
const blogRoutes = require("./routes/blogRoutes"); 
const hrRoutes = require('./routes/hrRoutes');
const digitalMarketerRoutes = require('./routes/digitalMarketerRoutes');
const bdmRoutes = require("./routes/bdmRoutes");
 const studentRoutes = require("./routes/student.routes");
const accountantRoutes = require("./routes/accountantRoutes");
// const studentRoutes = require("./routes/student.routes");
const financeManagerRoutes = require('./routes/financeManagerRoutes');
// const BDMRouter = require("./routes/BDM.routes");
const courseRoutes = require("./routes/course.routes");
const teamLeaderRoutes = require("./routes/teamLeaderRoutes");
const courseScheduleRoutes = require("./routes/courseScheduleRoutes");
const associateConsultantRoutes = require("./routes/associateConsultantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRequestRoutes = require("./routes/leaveRequestRoutes");
const enrollRoutes = require("./routes/enrollRoutes")
const videoEditorRoutes =require("./routes/videoEditorRoutes")
const videoRoutes = require('./routes/videoRoutes');

const designsRoutes = require('./routes/designs');




// Serve uploaded images statically
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes
// app.use("/api/students", studentRoutes);


app.use('/api/auth', authRoutes);
app.use("/api/designers", designerRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/digitalMarketer', digitalMarketerRoutes);
app.use("/api/bdm", bdmRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/accountants", accountantRoutes);
app.use("/api/students", studentRoutes);
app.use('/api/financeManager', financeManagerRoutes);
// app.use("/api/BDM", BDMRouter);
app.use("/api/courses", courseRoutes);
app.use("/api/teamLeaders", teamLeaderRoutes);
app.use("/api/courseSchedules", courseScheduleRoutes);
app.use("/api/consultants", associateConsultantRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);
app.use("/api/enrollment", enrollRoutes);
app.use("/api/videoEditors", videoEditorRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/designs', designsRoutes);





// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log(err));       


mongoose.connect('mongodb://localhost:27017/camerindb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // mongoose.connect('mongodb://localhost:27017/camerindb', { useNewUrlParser: true, useUnifiedTopology: true });

  

app.get("/", (req, res) => res.send("API is running"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
