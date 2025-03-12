import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Contact Title */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', padding:'30px'}}>Contact Us</Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Get in touch with us for more information or inquiries.
        </Typography>
      </Box>

      {/* Contact Form Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Send us a Message
            </Typography>
            <form>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Google Map Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', padding: 2 }}>
              Our Location
            </Typography>
            <Box sx={{ width: '100%', height: '300px' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=New+York"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
