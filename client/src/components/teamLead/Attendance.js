
import React, { useEffect, useState } from 'react';
import { Input, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { message } from 'antd';

const Attendance = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [loginHistory, setLoginHistory] = useState([]); // All login history fetched initially
  const [filteredHistory, setFilteredHistory] = useState([]); // Filtered history based on user input
  const [loading, setLoading] = useState(false);

  // Fetch all login history on component load
  useEffect(() => {
    const fetchLoginHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/auth/login-history/');
        const data = response.data;

        if (data && data.length > 0) {
          setLoginHistory(data); // Set all data initially
        } else {
          message.info('No login history found.');
          setLoginHistory([]);
        }
      } catch (error) {
        console.error('Error fetching login history:', error);
        message.error('Failed to fetch login history.');
      }
      setLoading(false);
    };

    fetchLoginHistory();
  }, []);

  // Handle the click to filter login history based on userId or name
  const handleShowHistory = () => {
    setLoading(true);
    let filteredData = loginHistory; // Start with the full data

    if (userId.trim()) {
      // Filter by userId
      filteredData = filteredData.filter((history) => history.userId && history.userId._id === userId);
    }

    if (name.trim()) {
      // Filter by name in the userId object
      filteredData = filteredData.filter(
        (history) =>
          history.userId &&
          history.userId.name &&
          history.userId.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (filteredData.length > 0) {
      setFilteredHistory(filteredData);
    } else {
      setFilteredHistory([]); // If no matches are found
      message.info('No login history found for the given user ID or name.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '80px', maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Student Attendance</Typography>

      {/* Input and Button for fetching login history */}
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleShowHistory} disabled={loading}>
          Show Login History
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px">
          <CircularProgress />
        </Box>
      )}

      {/* Table displaying filtered login history */}
      {filteredHistory.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Login Time</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHistory.map((history) => (
                <TableRow key={history._id}>
                  <TableCell>{new Date(history.loginTime).toLocaleString()}</TableCell>
                  <TableCell>{history.userId ? history.userId.name : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* If no history exists, show a message */}
      {filteredHistory.length === 0 && !loading && (userId || name) && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6">
            {/* No login history found for {userId ? `User ID: ${userId}` : `Name: ${name}`} */}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Attendance;



// import React, { useState } from 'react';
// import { Button, Input, Table, Spin, message } from 'antd';
// import axios from 'axios';

// const Attendance = () => {
//   const [userId, setUserId] = useState(''); // Store the userId
//   const [loginHistory, setLoginHistory] = useState([]); // Store the login history
//   const [loading, setLoading] = useState(false); // For loading spinner

//   const handleShowHistory = async () => {
//     if (!userId.trim()) {
//       message.error('Please enter a user ID');
//       return;
//     }

//     // Trim the userId before sending
//     const trimmedUserId = userId.trim();
//     console.log('Sending userId:', trimmedUserId);

//     setLoading(true);

//     try {
//       // Make the request to the backend API
//       const response = await axios.get(`http://localhost:3000/login-history/${trimmedUserId}`);
      
//       // Set the login history state if response is successful
//       setLoginHistory(response.data);
//     } catch (error) {
//       // Error handling: show error message if API fails
//       console.error('Error fetching login history:', error);
//       message.error('Failed to fetch login history: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false); // Stop the loading spinner
//     }
//   };

//   // Table columns for login history
//   const columns = [
//     {
//       title: 'Login Time',
//       dataIndex: 'loginTime',
//       render: (text) => new Date(text).toLocaleString(), // Format the date
//     },
//     {
//       title: 'User ID',
//       dataIndex: 'userId',
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Input
//         style={{ width: '300px', marginBottom: '20px' }}
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         placeholder="Enter user ID"
//       />
//       <Button type="primary" onClick={handleShowHistory} loading={loading}>
//         Show Login History
//       </Button>

//       <Spin spinning={loading} style={{ marginTop: '20px' }}>
//         <Table
//           style={{ marginTop: '20px' }}
//           columns={columns}
//           dataSource={loginHistory}
//           rowKey="_id"
//           pagination={false}
//         />
//       </Spin>
//     </div>
//   );
// };

// export default Attendance;
