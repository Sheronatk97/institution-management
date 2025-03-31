import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';  // Import Ant Design Table component
import {jwtDecode} from 'jwt-decode'

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
 const [token,setToken]=useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/getAllUsers');
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
     const token=jwtDecode(localStorage.getItem("token"))
        setToken(token.id)
        console.log("token",token)
  }, []);

  // Define the columns for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || 'N/A', // Default value if name is missing
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (course) => course ? course.name : 'No Course', // Check if course exists
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      render: (text) => text || 'N/A',
    },
    // {
    //   title: 'Role',
    //   dataIndex: 'role',
    //   key: 'role',
    //   render: (text) => text || 'N/A',
    // },
    {
      title: 'Proof',
      dataIndex: 'idProof',
      key: 'idProof',
      render: (idProof) => (
        <div>
          {idProof ? (
            <img
              src={`http://localhost:3000/${idProof}`}  // Serve the image from the backend using the static route
              alt="Proof"
              style={{ width: 100, height: 100, objectFit: 'cover' }} // Set the image size
            />
          ) : (
            'No Proof'
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>All Users</h1>
      <Table
        columns={columns}
        dataSource={users} // Users data for the table
        rowKey="_id" // Use _id as the unique key for each row
        pagination={false} // Disable pagination
      />
    </div>
  );
};

export default GetAllUsers;
