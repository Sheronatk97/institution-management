

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/students/getAllStudents");
      setStudents(res.data);
    } catch (error) {
      message.error("Failed to fetch students");
    }
  };

  const handleAddOrUpdate = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "profilePhoto" && values[key]) {
        formData.append(key, values[key].file);
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      if (editingStudent) {
        await axios.put(`http://localhost:3000/api/students/studentUpdate/${editingStudent._id}`, formData);
        message.success("Student updated successfully");
      } else {
        await axios.post("http://localhost:3000/api/students/createStudents", formData);
        message.success("Student added successfully");
      }
      fetchStudents();
      handleCloseModal();
    } catch (error) {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/studentDelete/${id}`);
      message.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      message.error("Failed to delete student");
    }
  };

  const handleOpenModal = (student = null) => {
    setEditingStudent(student);
    setIsModalOpen(true);
    if (student) {
      form.setFieldsValue(student);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Course", dataIndex: "course", key: "course" },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleOpenModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{'padding':'60px'}}>
      <Button type="primary" onClick={() => handleOpenModal()}>Add Student</Button>
      <Table dataSource={students} columns={columns} rowKey="_id" />
      <Modal title={editingStudent ? "Edit Student" : "Add Student"} open={isModalOpen} onCancel={handleCloseModal} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> <Input /> </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="course" label="Course" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="profilePhoto" label="Profile Photo"> <Upload beforeUpload={() => false} maxCount={1}><Button icon={<UploadOutlined />}>Upload</Button></Upload> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentPage;
