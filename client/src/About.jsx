import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar, CardHeader } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from './Footer';

// Sample team members data (you can modify this data based on your team)
const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'John is the founder of the academy and has over 15 years of experience in education and leadership.',
  },
  {
    name: 'Jane Smith',
    role: 'Principal',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Jane leads the academic team and is passionate about developing student-centric educational programs.',
  },
  {
    name: 'Alex Brown',
    role: 'Head of Operations',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Alex manages the day-to-day operations of the academy and ensures smooth functioning.',
  },
  {
    name: 'Emily White',
    role: 'Marketing Manager',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    bio: 'Emily leads marketing and communications strategies to increase academy visibility and engagement.',
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Title Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', padding:'40px' }}>About Us</Typography>
        <Typography variant="h6" sx={{ marginTop: 2, fontStyle: 'italic' }}>
          Our academy is dedicated to providing quality education and empowering students to achieve their goals.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Our Mission</Typography>
        <Typography variant="body1">
          Our mission is to provide high-quality education that inspires and empowers students to pursue excellence
          in their careers and personal development. We aim to create an environment that fosters creativity, critical
          thinking, and holistic growth.
        </Typography>
      </Box>

      {/* Vision Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Our Vision</Typography>
        <Typography variant="body1">
          To be a globally recognized institution that nurtures future leaders and changemakers by offering innovative
          and impactful educational experiences. We aspire to create an inclusive learning community that promotes
          intellectual curiosity and lifelong learning.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Meet Our Team</Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardHeader
                  avatar={<Avatar src={member.image} alt={member.name} />}
                  title={member.name}
                  subheader={member.role}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Section */}
      
      <Footer/>
    </Container>
  
  );
};

export default About;
