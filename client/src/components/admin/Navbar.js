import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';

// const Navbar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate(); // Use the hook to navigate programmatically

//   const openMenu = (event) => setAnchorEl(event.currentTarget);
//   const closeMenu = () => setAnchorEl(null);

//   // Function to handle navigation to Login with role
//   const handleMenuItemClick = (role) => {
//     navigate(`/login/${role}`); // Navigate to login page with the role as a parameter
//     closeMenu(); // Close the dropdown menu after selection
//   };

//   return (
//     <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Camerin EduTech
//         </Typography>
//         <Button color="inherit" href="/">Home</Button>
//         <Button color="inherit" href="/about">About</Button>
//         <Button color="inherit" href="/contact">Contact</Button>
//         <Button color="inherit" href="/placements">Placements</Button>
//         <Button color="inherit" href="/achievements">Achievements</Button>

//         <Button color="inherit" onClick={openMenu}>Sign In/Sign Up</Button>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
//           <MenuItem onClick={() => handleMenuItemClick('admin')}>Admin</MenuItem>
//           <MenuItem onClick={() => handleMenuItemClick('hr')}>HR</MenuItem>
//           <MenuItem onClick={() => handleMenuItemClick('digital-marketing')}>Digital Marketing</MenuItem>
//           <MenuItem onClick={() => handleMenuItemClick('students')}>Students</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleSignInClick = () => {
    // Programmatically navigate to the /login page
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/placements">Placements</Button>
        {/* <Button color="inherit" component={Link} to="/achievements">Achievements</Button> */}

        {/* <Button color="inherit" onClick={openMenu}>Sign In/Sign Up</Button> */}
        <Button color="inherit" onClick={handleSignInClick}>Logout</Button>
        {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}> */}
          {/* All options in the dropdown link to the Login component */}
           {/* <MenuItem component={Link} to="/login">Admin</MenuItem> */}
          {/* <MenuItem component={Link} to="/login">HR</MenuItem> */}
          {/* <MenuItem component={Link} to="/login">Digital Marketing</MenuItem>  */}
          {/* <MenuItem component={Link} to="/login">Students</MenuItem> */}
        {/* </Menu> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;