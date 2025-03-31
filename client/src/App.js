
import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';

import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Footer from './Footer';
import Abouts from './About';
import Contacts from './Contact';
import Login from './components/Login'
import Register from './components/Register'
import PlacementPage from './components/placement/Placement'
// import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import DigitalMarketingDashboard from './components/digitalmarketing/DigitalMarketingDashboard';
import StudentDashboard from './components/students/StudentDashboard';
import HRDashboard from './components/hr/HRDashboard';
import MarketingPage from './components/digitalmarketing/MarketingPage';
import BlogPage from './components/digitalmarketing/BlogPage';
import HRCreationForm from './components/admin/HrCreate';
import DigitalMarketer from './components/admin/DigitalMarketCreate';
import BDMCreateForm from './components/admin/BdmCreate';
import TeamLeadCreationForm from './components/hr/TeamLeadCreate';
import BDMCreationForm from './components/hr/BDMCreationForm';
import DigitalMarketingTeamForm from './components/hr/DigitalMarketingCreate';
import DesignerCreationForm from './components/digitalmarketing/DesignerCreationForm';
import SocialMediaAdForm from './components/digitalmarketing/SocialMediaAdForm.js';
import DigitalMarketerForm from './components/admin/DigitalMarketCreate';
import StudentList from './components/students/StudentCreate.js';
import AccountantManagement from './components/hr/AccountantManagement.js';
import BDMManagementForm from './components/admin/BdmCreate';
import StudentPage from './components/students/StudentPage.js';
import FinanceManagerManagementForm from './components/admin/FinanceManager.js';
import DigitalMarketerManagementForm from './components/admin/DigitalMarketCreate';
import StudentManagementPage from './components/admin/StudentDetails.js';
import SalesDashboard from './components/sales/salesDashboard.js';
import BDMManagement from './components/sales/BDMManagement.js';
import TeamLeaderPage from './components/sales/teamLeader.js';
import AssociateConsultantPage from './components/sales/associateConsultant.js';
import StudentsPage from './components/sales/Student.js';
import CoursePage from './components/sales/coursePage.js';
import ConsultantPage from './components/teamLead/ConsultantPage.js';
import TeamLeadDashboard from './components/teamLead/TeamLeadDashboard.js';
import Course from './components/students/Course.js';
import CourseEnrollmentPage from './components/teamLead/Enroll.js';
import VideoEditorForm from './components/digitalmarketing/VideoEditor.js';
import GraphicDesignerDashboard from './components/designer/designerDashboard.js';
import FinanaceDashboard from './components/finance/FinanceDashboard.js';
import AssociateConsultantDashboard from './components/associateConsultant/AssociateConsultant.js';
import VideoEditorDashboard from './components/videoeditor/videoEditorDashboard.js';
import VideoUpload from './components/videoeditor/videoUpload.js'
import VideoView from './components/digitalmarketing/ViewVideo.js';
import Designs from './components/designer/Designs.js';
import DesignsView from './components/digitalmarketing/viewDesigns.js';
import StudentsAssign from './components/teamLead/StudentsAssign.js';
import Attendance from './components/teamLead/Attendance.js';
import Profile from './components/students/Profile.js';
import WhatsAppButton from './components/associateConsultant/Chat.js';
import GetAllUsers from './components/associateConsultant/StudentsListing.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeaveRequestForm from './components/students/LeaveRequestForm.js';
import LeaveRequestPage from './components/teamLead/Leave.js';
import ApprovedLeaves from './components/associateConsultant/ApprovedLeaves.js';
import UserLeaveStatus from './components/students/LeaveStatus.js';
import CourseSchedule from './components/associateConsultant/CourseSchedule.js';
import AddPayment from './components/students/addPayment.js';
import ViewStudents from './components/finance/ViewStudents.js';
import ViewPaymentdetails from './components/finance/ViewPayment.js';
import StudentsAttendance from './components/students/StudentsAttendance.js';
import CourseDetails from './components/students/CourseDetails.js';
import Navbar from './components/navbar/Navbar.js';

// import DesignsView from './components/designer/ViewDesign.js';
// Dummy Content for Sections (You can replace these with your own content later)
const About = () => <Container><Typography variant="h4">About Us</Typography></Container>;
const Contact = () => <Container><Typography variant="h4">Contact Us</Typography></Container>;
const Placements = () => <Container><Typography variant="h4">Placements</Typography></Container>;
const Achievements = () => <Container><Typography variant="h4">Achievements</Typography></Container>;

// Navbar with Dropdown (for HR and Admin options)

// Carousel Component
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ position: 'relative',paddingTop:'100px' }}>
      <Slider {...settings}>
        <div>
          <img
            src={img1}
            alt="Slide 1"
            style={{ width: '100%', height: '90%' }}
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Slide 2"
            style={{ width: '100%', height: '90%' }}
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Slide 3"
            style={{ width: '100%', height: '90%' }}
          />
        </div>
      </Slider>

      {/* Overlay Text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          Welcome to Our Academy
        </Typography>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          Explore Opportunities, Achievements & More
        </Typography>
      </Box>
    </Box>
  );
};

// Home Page Layout
const HomePage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar/>
      <Carousel />
      <Container sx={{ marginTop: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Our Vision</Typography>
                <Typography>Our mission is to offer an educational experience that balances theoretical understanding and practical knowledge...</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Achievements</Typography>
                <Typography>Our academy has earned numerous prestigious awards and recognitions over the years...</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Placements</Typography>
                <Typography>Our placement cell has established strong relationships with global corporations...</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Contact</Typography>
                <Typography>Whether you’re interested in learning more about our programs...</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

// Main App
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Abouts />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/placements" element={<PlacementPage />} />
         <Route path="/achievements" element={<StudentPage/>} />
        <Route path="/login" element={<Login />} /> {/* Added login route */}
        <Route path="/register" element={<Register />} />

        {/* <Route path="/dashboard" ele;lment={<Dashboard />} /> */}
        <Route path="/admin/*" element={<AdminDashboard/>}/>
        <Route path="/hr/*" element={<HRDashboard/>} />
        <Route path="/student/*" element={<StudentDashboard/>} />
        <Route path="/digital_marketing/*" element={<DigitalMarketingDashboard />} />
        <Route path="/sales/*" element={<SalesDashboard />} />
        <Route path="/team_lead/*" element={<TeamLeadDashboard />} />
        <Route path="/finance/*" element={<FinanaceDashboard />} />
        <Route path="/video_Editor/*" element={<VideoEditorDashboard/>} />
        <Route path="/graphic_designer/*" element={<GraphicDesignerDashboard />} /> 
        <Route path="/associate_consultant/*" element={< AssociateConsultantDashboard/>} /> 
        


        {/* <Route path="/digital_marketing" component={<DigitalMarketingDashboard/>} /> */}
        <Route path="/digital_marketing/marketing" element={<MarketingPage/>} />
        <Route path="/digital_marketing/blog-posts" element={<BlogPage/>} />
        <Route path="/digital_marketing/designer" element={<DesignerCreationForm/>} />
        <Route path="/digital_marketing/video_editor" element={<VideoEditorForm/>} />
        <Route path="/digital_marketing/socialmedia" element={<SocialMediaAdForm/>} />
        <Route path="/digital_marketing/view_videos" element={<VideoView/>} />
        <Route path="/digital_marketing/view_designs" element={<DesignsView/>} />


        <Route path="/admin/financeManager" element={<FinanceManagerManagementForm/>} />
        <Route path="/admin/create-digital-marketing" element={<DigitalMarketerManagementForm/>} />
        <Route path="/admin/create-bdm" element={<BDMCreateForm/>} />
        <Route path="/admin/students-details" element={<GetAllUsers/>} />


        <Route path="/hr/team-lead" element={<TeamLeadCreationForm/>} />
        <Route path="/hr/bdm" element={<BDMManagementForm/>} />
        <Route path="/hr/digital-marketing" element={<DigitalMarketerForm/>} />
        <Route path="/hr/accountant" element={<AccountantManagement/>} />


        
        <Route path="/bdm/team_leader" element={<TeamLeaderPage/>} />
        <Route path="/bdm/course" element={<CoursePage/>} />
        
        <Route path="/team_lead/consultant" element={<ConsultantPage/>} />
        <Route path="/team_lead/courseenrolments" element={<CourseEnrollmentPage/>} />
        <Route path="/team_lead/studentsassign" element={<StudentsAssign/>} />
        <Route path="/team_lead/attendance" element={<Attendance/>} />
        <Route path="/team_lead/leave" element={<LeaveRequestPage/>} />

        <Route path="/sales/bdm" element={<BDMManagement/>} />
        <Route path="/sales/associate_consultant" element={<AssociateConsultantPage/>} />
        <Route path="/sales/students" element={<StudentsPage/>} />

        
        <Route path="/student/students-details" element={<StudentPage/>} />   
        <Route path="/student/profile" element={<Profile />} /> 
        <Route path="/student/payment" element={<AddPayment/>} />                                                                                              
        {/* <Route path="/student/profile" element={<StudentList/>} /> */}
        <Route path="/student/course" element={<Course/>} />
        <Route path="/student/leaveform" element={<LeaveRequestForm/>}/>
         <Route path="/student/chat" element={<WhatsAppButton/>}/>
        <Route path="/student/leavestatus" element={<UserLeaveStatus/>}/>
         <Route path="/student/studentsattendance" element={<StudentsAttendance/>}/>
         <Route path="/student/coursedetails" element={<CourseDetails/>}/>
        


        
        <Route path="/video_Editor/videoUpload" element={<VideoUpload/>} />


        <Route path="/graphic_designer/designs" element={<Designs/>} />


        <Route path="/associate_consultant/view_students" element={<GetAllUsers />} />
         <Route path="/associate_consultant/approvedleaves" element={<ApprovedLeaves />} />
        <Route path="/associate_consultant/chat" element={<WhatsAppButton/>} />
        <Route path="/associate_consultant/courseschedule" element={<CourseSchedule />} />

          <Route path="/finance/payment_details" element={<ViewPaymentdetails/>} />
          <Route path="/finance/viewstudents" element={< ViewStudents/>} />
        
        
        

      </Routes>
    </Router>
  );
};

export default App;


// import React, { useState, Suspense } from 'react';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import img1 from './images/img1.jpg';
// import img2 from './images/img2.jpg';
// import img3 from './images/img3.jpg';

// import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Container, Box, Grid, Card, CardContent } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Slider from 'react-slick';
// import Footer from './Footer';

// // Lazy-loaded components
// const Abouts = React.lazy(() => import('./About'));
// const Contacts = React.lazy(() => import('./Contact'));
// const PlacementPage = React.lazy(() => import('./components/placement/Placement'));
// const Login = React.lazy(() => import('./components/Login'));
// const Register = React.lazy(() => import('./components/Register'));
// const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));
// const HRDashboard = React.lazy(() => import('./components/hr/HRDashboard'));
// const StudentDashboard = React.lazy(() => import('./components/students/StudentDashboard'));
// const DigitalMarketingDashboard = React.lazy(() => import('./components/digitalmarketing/DigitalMarketingDashboard'));
// const SalesDashboard = React.lazy(() => import('./components/sales/salesDashboard'));
// const TeamLeadDashboard = React.lazy(() => import('./components/teamLead/TeamLeadDashboard'));
// const FinanaceDashboard = React.lazy(() => import('./components/finance/FinanceDashboard'));
// const VideoEditorDashboard = React.lazy(() => import('./components/videoeditor/videoEditorDashboard'));
// const GraphicDesignerDashboard = React.lazy(() => import('./components/designer/designerDashboard'));
// const AssociateConsultantDashboard = React.lazy(() => import('./components/associateConsultant/AssociateConsultant'));
// const MarketingPage = React.lazy(() => import('./components/digitalmarketing/MarketingPage'));
// const BlogPage = React.lazy(() => import('./components/digitalmarketing/BlogPage'));
// const DesignerCreationForm = React.lazy(() => import('./components/digitalmarketing/DesignerCreationForm'));
// const VideoEditorForm = React.lazy(() => import('./components/digitalmarketing/VideoEditor'));
// const SocialMediaAdForm = React.lazy(() => import('./components/digitalmarketing/SocialMediaAdForm'));
// const VideoView = React.lazy(() => import('./components/digitalmarketing/ViewVideo'));
// const DesignsView = React.lazy(() => import('./components/digitalmarketing/viewDesigns'));

// // Your other components can be similarly lazy-loaded

// // Navbar with Dropdown (for HR and Admin options)
// const Navbar = () => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openMenu = (event) => setAnchorEl(event.currentTarget);
//   const closeMenu = () => setAnchorEl(null);

//   const handleSignInClick = () => {
//     // Programmatically navigate to the /login page
//     navigate('/login');
//   };

//   return (
//     <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }} />
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/about">About</Button>
//         <Button color="inherit" component={Link} to="/contact">Contact</Button>
//         <Button color="inherit" component={Link} to="/placements">Placements</Button>
//         <Button color="inherit" onClick={handleSignInClick}>Sign In</Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// // Carousel Component
// const Carousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <Box sx={{ position: 'relative', paddingTop: '100px' }}>
//       <Slider {...settings}>
//         <div>
//           <img
//             src={img1}
//             alt="Slide 1"
//             style={{ width: '100%', height: '90%' }}
//           />
//         </div>
//         <div>
//           <img
//             src={img2}
//             alt="Slide 2"
//             style={{ width: '100%', height: '90%' }}
//           />
//         </div>
//         <div>
//           <img
//             src={img3}
//             alt="Slide 3"
//             style={{ width: '100%', height: '90%' }}
//           />
//         </div>
//       </Slider>

//       {/* Overlay Text */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           textAlign: 'center',
//           color: 'white',
//         }}
//       >
//         <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
//           Welcome to Our Academy
//         </Typography>
//         <Typography variant="h5" sx={{ marginTop: '10px' }}>
//           Explore Opportunities, Achievements & More
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// // Home Page Layout
// const HomePage = () => {
//   return (
//     <div style={{ position: 'relative' }}>
//       <Carousel />

//       <Container sx={{ marginTop: 10 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>Our Vision</Typography>
//                 <Typography>Our mission is to offer an educational experience that balances theoretical understanding and practical knowledge...</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>Achievements</Typography>
//                 <Typography>Our academy has earned numerous prestigious awards and recognitions over the years...</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>Placements</Typography>
//                 <Typography>Our placement cell has established strong relationships with global corporations...</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>Contact</Typography>
//                 <Typography>Whether you’re interested in learning more about our programs...</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// // Main App
// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/about" element={<Abouts />} />
//           <Route path="/contact" element={<Contacts />} />
//           <Route path="/placements" element={<PlacementPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/admin/*" element={<AdminDashboard />} />
//           <Route path="/hr/*" element={<HRDashboard />} />
//           <Route path="/student/*" element={<StudentDashboard />} />
//           <Route path="/digital_marketing/*" element={<DigitalMarketingDashboard />} />
//           <Route path="/sales/*" element={<SalesDashboard />} />
//           <Route path="/team_lead/*" element={<TeamLeadDashboard />} />
//           <Route path="/finance/*" element={<FinanaceDashboard />} />
//           <Route path="/video_Editor/*" element={<VideoEditorDashboard />} />
//           <Route path="/graphic_designer/*" element={<GraphicDesignerDashboard />} />
//           <Route path="/associate_consultant/*" element={<AssociateConsultantDashboard />} />
//           <Route path="/digital_marketing/marketing" element={<MarketingPage />} />
//           <Route path="/digital_marketing/blog-posts" element={<BlogPage />} />
//           <Route path="/digital_marketing/designer" element={<DesignerCreationForm />} />
//           <Route path="/digital_marketing/video_editor" element={<VideoEditorForm />} />
//           <Route path="/digital_marketing/socialmedia" element={<SocialMediaAdForm />} />
//           <Route path="/digital_marketing/view_videos" element={<VideoView />} />
//           <Route path="/digital_marketing/view_designs" element={<DesignsView />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;
