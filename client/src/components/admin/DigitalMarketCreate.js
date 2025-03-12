

// export default DigitalMarketerForm;
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";

const DigitalMarketerManagementForm = () => {
  const [marketers, setMarketers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMarketer, setEditingMarketer] = useState(null);
  const [form] = Form.useForm();

  // Fetch Digital Marketers from the server
  useEffect(() => {
    fetchMarketers();
  }, []);

  const fetchMarketers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/digitalMarketer/getdigitalmarketers");
      setMarketers(response.data);
    } catch (error) {
      console.error("Error fetching digital marketers:", error);
    }
  };

  // Show modal for creating or editing a DigitalMarketer
  const showModal = (marketer = null) => {
    setEditingMarketer(marketer);
    setIsModalVisible(true);
    form.setFieldsValue(marketer || {}); // Pre-fill the form if editing an existing marketer
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle form submit (create or update)
  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values); // Check the data submitted
    try {
      if (editingMarketer) {
        // Update the marketer
        await axios.put(`http://localhost:3000/api/digitalMarketer/updatedigitalmarketer/${editingMarketer._id}`, values);
        notification.success({ message: "Digital Marketer updated successfully!" });
      } else {
        // Create new marketer
        await axios.post("http://localhost:3000/api/digitalMarketer/createdigitalmarketer", values);
        notification.success({ message: "Digital Marketer created successfully!" });
      }
      fetchMarketers();
      handleCancel();
    } catch (error) {
      console.error("Error during submission:", error);
      notification.error({ message: "Error saving Digital Marketer!" });
    }
  };

  // Delete a DigitalMarketer by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/digitalMarketer/deletedigitalmarketer/${id}`);
      notification.success({ message: "Digital Marketer deleted successfully!" });
      fetchMarketers();
    } catch (error) {
      notification.error({ message: "Error deleting Digital Marketer!" });
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
    <div>
      <h2>Digital Marketer Management</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Create New Digital Marketer
      </Button>
      <Table dataSource={marketers} columns={columns} rowKey="_id" />

      <Modal
        title={editingMarketer ? "Edit Digital Marketer" : "Create Digital Marketer"}
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
            rules={[{ required: !editingMarketer, message: "Enter password" }]} // Only required when creating, not editing
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingMarketer ? "Update" : "Create"} Digital Marketer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default DigitalMarketerManagementForm;
