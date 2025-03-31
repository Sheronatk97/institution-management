

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import { Card, Grid, CircularProgress, Typography, Box, Snackbar, Alert } from '@mui/material';

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Decode the JWT token to get the userId
    const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage
    if (!token) {
      setLoading(false);
      setError('No authentication token found.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      const userId = decodedToken.id; // Assuming the token contains the userId as 'id'

      if (!userId) {
        setLoading(false);
        setError('User ID is not available.');
        return;
      }

      // Fetch course details for the logged-in user
      axios.get(`http://localhost:3000/api/auth/coursedetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in Authorization header (best practice)
        },
      })
        .then((response) => {
          setCourseDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError('Failed to fetch course details.');
          console.error(error);  // Debugging: Log any error that occurs during the fetch
        });
    } catch (error) {
      setLoading(false);
      setError('Invalid token.');
      console.error('Error decoding token:', error);
    }
  }, []);  // Empty dependency array ensures the effect runs once on mount

  // Function to format dates if they are in ISO format
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate || 'N/A';
  };

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setError(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );  // Show loading spinner while data is being fetched
  }

  if (!courseDetails) {
    return <Typography variant="h6" align="center">No course details available.</Typography>;  // Display if no course details are fetched
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Course Details
      </Typography>

      {/* Single Card for all course details */}
      <Card sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>User Info</Typography>
        <Typography><strong>Name:</strong> {courseDetails.name || 'N/A'}</Typography>
        <Typography><strong>Start Date:</strong> {formatDate(courseDetails.startDate)}</Typography>
        <Typography><strong>End Date:</strong> {formatDate(courseDetails.endDate)}</Typography>
        <Typography><strong>Slot:</strong> {courseDetails.slot || 'N/A'}</Typography>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
          Course Info
        </Typography>
        <Typography><strong>Description:</strong> {courseDetails.description || 'N/A'}</Typography>
        <Typography><strong>Duration:</strong> {courseDetails.duration || 'N/A'}</Typography>
        <Typography><strong>Fee:</strong> {courseDetails.fee || 'N/A'}</Typography>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
          Consultant Info
        </Typography>
        <Typography><strong>Consultant Name:</strong> {courseDetails.consultantName || 'N/A'}</Typography>
      </Card>

      {/* Snackbar for error */}
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseDetails;
