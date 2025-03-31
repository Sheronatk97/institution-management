// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, notification, Spin } from 'antd';
// import { jwtDecode } from 'jwt-decode'; // If you need to decode JWT to extract user ID

// const UserLeaveStatus = () => {
//   const [leaveStatuses, setLeaveStatuses] = useState([]); // Store leave request statuses
//   const [loading, setLoading] = useState(true); // To show loading spinner
//   const [error, setError] = useState(null); // To handle errors

//   useEffect(() => {
//     // Fetch user ID from the JWT token (stored in localStorage)
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken.id; // Assuming the token contains the user ID

//     // Fetch the leave request statuses for this user
//     fetchLeaveStatuses(userId);
//   }, []);

//   // Function to fetch leave request statuses
//   const fetchLeaveStatuses = async (userId) => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/auth/my-leave-requests', {
//         headers: { id: userId }, // Pass the user ID in the header
//       });

//       setLeaveStatuses(response.data); // Set the statuses to state
//       setLoading(false); // Stop loading
//     } catch (error) {
//       setLoading(false); // Stop loading
//       setError('Failed to fetch leave requests'); // Set error state
//       notification.error({
//         message: 'Error',
//         description: 'Failed to fetch leave requests',
//       });
//     }
//   };

//   // Table columns definition for displaying statuses
//   const columns = [
//     {
//       title: 'Leave Status',
//       dataIndex: 'status',
//       key: 'status',
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Your Leave Statuses</h2>
      
//       {loading ? (
//         <Spin size="large" />
//       ) : error ? (
//         <div>{error}</div>
//       ) : (
//         <Table
//           dataSource={leaveStatuses}
//           columns={columns}
//           rowKey={(record, index) => index}
//           pagination={false}
//         />
//       )}
//     </div>
//   );
// };

// export default UserLeaveStatus;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, notification, Spin } from 'antd';
import { jwtDecode } from 'jwt-decode'; // If you need to decode JWT to extract user ID

const UserLeaveStatus = () => {
  const [leaveRequests, setLeaveRequests] = useState([]); // Store leave requests with full details
  const [loading, setLoading] = useState(true); // To show loading spinner
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch user ID from the JWT token (stored in localStorage)
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Assuming the token contains the user ID

    // Fetch the leave requests for this user
    fetchLeaveRequests(userId);
  }, []);

  // Function to fetch leave requests
  const fetchLeaveRequests = async (userId) => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/my-leave-requests', {
        headers: { id: userId }, // Pass the user ID in the header
      });

      setLeaveRequests(response.data); // Set the leave requests with full details
      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading
      setError('Failed to fetch leave requests'); // Set error state
      notification.error({
        message: 'Error',
        description: 'Failed to fetch leave requests',
      });
    }
  };

  // Table columns definition for displaying leave request details
  const columns = [
    {
      title: 'Leave Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(), // Format date
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => new Date(date).toLocaleDateString(), // Format date
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Leave Requests</h2>
      
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table
          dataSource={leaveRequests}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={false}
        />
      )}
    </div>
  );
};

export default UserLeaveStatus;
