

// export default BDMManagementForm;import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbar from "./Navbar";
const BDMManagementForm = () => {
  const [bdms, setBdms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBDM, setEditingBDM] = useState(null);
  const [form] = Form.useForm();

  // Fetch BDMs from the server
  useEffect(() => {
    fetchBDMs();
  }, []);

  const fetchBDMs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bdm/getallbdm");
      setBdms(response.data);
    } catch (error) {
      console.error("Error fetching BDMs:", error);
      notification.error({ message: "Error fetching BDMs!" });
    }
  };

  // Show modal for creating or editing a BDM
  const showModal = (bdm = null) => {
    setEditingBDM(bdm);
    setIsModalVisible(true);
    form.setFieldsValue(bdm || {}); // Pre-fill the form if editing an existing BDM
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle form submit (create or update)
  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    try {
      if (editingBDM) {
        // Update the BDM
        await axios.put(`http://localhost:3000/api/bdm/update/${editingBDM._id}`, values);
        notification.success({ message: "BDM updated successfully!" });
      } else {
        // Create new BDM
        await axios.post("http://localhost:3000/api/bdm/createbdm", values);
        notification.success({ message: "BDM created successfully!" });
      }
      fetchBDMs();
      handleCancel();
    } catch (error) {
      console.error("Error during submission:", error);
      notification.error({ message: "Error saving BDM!" });
    }
  };

  // Delete a BDM by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bdm/delete/${id}`);
      notification.success({ message: "BDM deleted successfully!" });
      fetchBDMs();
    } catch (error) {
      notification.error({ message: "Error deleting BDM!" });
    }
  };

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    // { title: "Location", dataIndex: "location", key: "location" },
    // { title: "Address", dataIndex: "address", key: "address" },
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
    <div style={{'padding':'70px'}}>
      <Navbar/>
      <h2>BDM Management</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Create New BDM
      </Button>
      <Table dataSource={bdms} columns={columns} rowKey="_id" />

      <Modal
        title={editingBDM ? "Edit BDM" : "Create BDM"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Enter name" }]}>
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
          {/* <Form.Item name="location" label="Location" rules={[{ required: true, message: "Enter location" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Enter address" }]}>
            <Input />
          </Form.Item> */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: !editingBDM, message: "Enter password" }]} // Only required when creating
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingBDM ? "Update" : "Create"} BDM
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default BDMManagementForm;
