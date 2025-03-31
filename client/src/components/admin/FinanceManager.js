import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";
import Navbar from "./Navbar";

const FinanceManagerManagementForm = () => {
  const [managers, setManagers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/financeManager/getFinanceManagers");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching finance managers:", error);
    }
  };

  const showModal = (manager = null) => {
    setEditingManager(manager);
    setIsModalVisible(true);
    form.setFieldsValue(manager || {}); // Pre-fill the form if editing an existing manager
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingManager) {
        await axios.put(`http://localhost:3000/api/financeManager/updatefinancemanager/${editingManager._id}`, values);
        notification.success({ message: "Finance Manager updated successfully!" });
      } else {
        await axios.post("http://localhost:3000/api/financeManager/createFinanceManager", values);
        notification.success({ message: "Finance Manager created successfully!" });
      }
      fetchManagers();
      handleCancel();
    } catch (error) {
      notification.error({ message: "Error saving Finance Manager!" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/financeManager/deletefinancemanager/${id}`);
      notification.success({ message: "Finance Manager deleted successfully!" });
      fetchManagers();
    } catch (error) {
      notification.error({ message: "Error deleting Finance Manager!" });
    }
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{padding:'80px'}}>
      <Navbar/>
      <h2>Finance Manager Management</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Create New Finance Manager
      </Button>
      <Table dataSource={managers} columns={columns} rowKey="_id" />

      <Modal
        title={editingManager ? "Edit Finance Manager" : "Create Finance Manager"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: "Enter full name" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Enter phone number" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Enter address" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingManager ? "Update" : "Create"} Finance Manager
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FinanceManagerManagementForm;
