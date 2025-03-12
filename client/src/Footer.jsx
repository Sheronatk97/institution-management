import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',  // Footer background color
        color: 'white',
        padding: '20px',
        marginTop: 'auto',
        position: 'relative',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
        © 2025 Academy Management. All Rights Reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="/about" sx={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
          About Us
        </Link>
        <Link href="/contact" sx={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
          Contact Us
        </Link>
        <Link href="/placements" sx={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
          Placements
        </Link>
        <Link href="/achievements" sx={{ color: 'white', textDecoration: 'none' }}>
          Achievements
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
