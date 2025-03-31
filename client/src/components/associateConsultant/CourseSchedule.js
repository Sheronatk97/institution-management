import React, { useState, useEffect } from 'react';
import { Table, Spin, message, Button, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import

const { Option } = Select;

const CourseSchedule = () => {
  const [users, setUsers] = useState([]);  // All users under the consultant
  const [loading, setLoading] = useState(true);
  const [consultantId, setConsultantId] = useState(null);

  // Fetch consultant ID from JWT token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setConsultantId(decodedToken.id); // Assuming the consultantId is stored as 'id' in the token
    }
  }, []);

  // Fetch users associated with the logged-in consultant
  useEffect(() => {
    if (consultantId) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/consultants/getUsersForConsultant/${consultantId}`);
          setUsers(response.data);
        } catch (err) {
          console.error('Error fetching users:', err);
          message.error('Failed to fetch users');
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [consultantId]);

  // Handle schedule update
  const handleUpdateSchedule = async (userId) => {
    const user = users.find((u) => u._id === userId);
    if (!user.slot || !user.startDate || !user.endDate) {
      message.error('Please select all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/consultants/updatescheduleforstudents', {
        userId,
        consultantId,
        slot: user.slot,
        startDate: user.startDate.format('YYYY-MM-DD'), // Format the date
        endDate: user.endDate.format('YYYY-MM-DD'),
      });

      message.success(response.data.message);
    } catch (error) {
      message.error('Failed to update schedule');
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (course) => course.name, // Display course name
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      key: 'slot',
      render: (slot, record) => (
        <Select
          value={record.slot}
          onChange={(value) => handleSlotChange(value, record._id)}
          placeholder="Select Slot"
        >
          <Option value="Slot 1">Slot 1</Option>
          <Option value="Slot 2">Slot 2</Option>
          <Option value="Slot 3">Slot 3</Option>
          <Option value="Slot 4">Slot 4</Option>
        </Select>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate, record) => (
        <DatePicker
          value={record.startDate}
          onChange={(date) => handleStartDateChange(date, record._id)}
          format="YYYY-MM-DD"
        />
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate, record) => (
        <DatePicker
          value={record.endDate}
          onChange={(date) => handleEndDateChange(date, record._id)}
          format="YYYY-MM-DD"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleUpdateSchedule(record._id)}
        >
          Update
        </Button>
      ),
    },
  ];

  // Handle changes for slot
  const handleSlotChange = (value, userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, slot: value } : user
      )
    );
  };

  // Handle changes for start date
  const handleStartDateChange = (date, userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, startDate: date } : user
      )
    );
  };

  // Handle changes for end date
  const handleEndDateChange = (date, userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, endDate: date } : user
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users under your consultant</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default CourseSchedule;
