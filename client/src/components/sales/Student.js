import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, notification, Popconfirm, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Loading state for fetching students

  // Fetch all students
  const fetchStudents = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("http://localhost:3000/api/students/getstudent");
      setStudents(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch students" });
    } finally {
      setIsFetching(false);
    }
  };

  // Run fetchStudents when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Show modal for adding or editing a student
  const showModal = (student = null) => {
    setEditStudent(student);
    setIsModalVisible(true);
  };

  // Handle canceling the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditStudent(null);
  };

  // Submit the form for creating or updating a student
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editStudent) {
        await axios.put(`http://localhost:3000/api/students/updatestudent/${editStudent._id}`, values);
        notification.success({ message: "Student updated successfully" });
      } else {
        await axios.post("http://localhost:3000/api/students/createstudent", values);
        notification.success({ message: "Student created successfully" });
      }
      fetchStudents();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: "Operation failed", description: error.response?.data?.error || error.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/deletestudent/${id}`);
      notification.success({ message: "Student deleted successfully" });
      fetchStudents();
    } catch (error) {
      notification.error({ message: "Failed to delete student" });
    }
  };

  // Table columns
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
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
        Add Student
      </Button>

      {/* Spinner while fetching data */}
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={students}
          columns={columns}
          rowKey="_id"
          loading={loading}
        />
      )}

      <Modal
        title={editStudent ? "Edit Student" : "Add Student"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editStudent}
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
            name="course"
            label="Course"
            rules={[{ required: true, message: "Please input the course!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="qualification"
            label="Qualification"
            rules={[{ required: true, message: "Please input the qualification!" }]}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {editStudent ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentsPage;
