import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, message, Spin } from 'antd';

// Create the StudentList component
const StudentList = () => {
  const [students, setStudents] = useState([]);  // Store fetched student data
  const [loading, setLoading] = useState(true);   // Manage loading state

  // Fetch students from the API when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/students/getstudent');
        setStudents(response.data);  // Store the response data in students state
      } catch (error) {
        message.error('Error fetching students data');
      } finally {
        setLoading(false);  // Set loading to false after the request is completed
      }
    };

    fetchStudents();  // Fetch students data from API
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Table columns configuration
  const columns = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Course', dataIndex: 'course', key: 'course' },
    { title: 'Qualification', dataIndex: 'qualification', key: 'qualification' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Student List" bordered={false}>
        {loading ? (
          <Spin size="large" tip="Loading students..." />  // Show loading spinner while fetching
        ) : (
          <Table
            dataSource={students}
            columns={columns}
            rowKey="_id"  // Unique key for each row
            pagination={{ pageSize: 10 }}  // Pagination with 10 students per page
          />
        )}
      </Card>
    </div>
  );
};

export default StudentList;
