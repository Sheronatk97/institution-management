
import React, { useState, useEffect } from 'react';
import { Table, Spin, message } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importing jwtDecode function

const StudentsAttendance = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch login history using the decoded userId
  const fetchLoginHistory = async () => {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage

    if (!token) {
      message.error('User is not logged in');
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode the token
      const userId = decodedToken.id; // Assuming 'id' is the field in the JWT token

      if (!userId) {
        message.error('User ID not found in token');
        return;
      }

      setLoading(true);
      setError('');

      // Make an API call to fetch login history for the logged-in user
      const response = await axios.get(`http://localhost:3000/api/auth/login-history/${userId}`);
      
      if (response.data) {
        setLoginHistory(response.data);  // Set the login history data in the state
      }
    } catch (err) {
      console.error('Error fetching login history:', err);
      setError('Failed to fetch login history');
    } finally {
      setLoading(false);
    }
  };

  // Columns for the table
  const columns = [
    {
      title: 'Login Time',
      dataIndex: 'loginTime',
      key: 'loginTime',
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    // {
    //   title: 'User Name',
    //   dataIndex: 'userId',
    //   key: 'userId',
    //   render: (userId) => userId ? userId.name : 'Unknown', // Show user name
    // },
  ];

  // Fetch login history when the component mounts
  useEffect(() => {
    fetchLoginHistory();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Login History</h2>

      {/* Show loading spinner or error message */}
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table
          columns={columns}
          dataSource={loginHistory}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default StudentsAttendance;
