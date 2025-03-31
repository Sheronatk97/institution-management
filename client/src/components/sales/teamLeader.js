

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, notification, Popconfirm, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { jwtDecode } from 'jwt-decode';

const TeamLeaderPage = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [courses, setCourses] = useState([]);  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTeamLeader, setEditTeamLeader] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchTeamLeaders();
    fetchCourses();  
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    setToken(decodedToken.id); 
  }, []);

  const fetchTeamLeaders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/teamLeaders/getteamleaders");
      if (Array.isArray(response.data)) {
        setTeamLeaders(response.data);
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch team leaders" });
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/courses/get");  // Endpoint to get courses
      console.log("Courses fetched:", response.data);  // Log to see the response data
      if (Array.isArray(response.data)) {
        setCourses(response.data);  // Set the courses to state
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      notification.error({ message: "Failed to fetch courses" });
    }
  };
  

  const showModal = (teamLeader = null) => {
    setEditTeamLeader(teamLeader);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTeamLeader(null);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editTeamLeader) {
        
        await axios.put(`http://localhost:3000/api/teamLeaders/updateteamleaders/${editTeamLeader._id}`, values);
        notification.success({ message: "Team Leader updated successfully" });
      } else {
   
        await axios.post("http://localhost:3000/api/teamLeaders/createteamleaders", values, { headers: { id: token } });
        notification.success({ message: "Team Leader created successfully" });
      }
      fetchTeamLeaders();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/teamLeaders/deleteteamleaders/${id}`);
      notification.success({ message: "Team Leader deleted successfully" });
      fetchTeamLeaders();
    } catch (error) {
      notification.error({ message: "Failed to delete team leader" });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course) => course ? course.name : "No Course",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "70px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Team Leader
      </Button>
      <Table
        dataSource={teamLeaders}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title={editTeamLeader ? "Edit Team Leader" : "Add Team Leader"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editTeamLeader || {}}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input the phone number!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="courseId"
            label="Course"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select placeholder="Select a Course">
              {courses.map((course) => (
                <Select.Option key={course._id} value={course._id}>
                  {course.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {editTeamLeader ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamLeaderPage;
