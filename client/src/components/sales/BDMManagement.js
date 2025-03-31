

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";

const BDMManagement = () => {
  const [bdms, setBdms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBDM, setEditingBDM] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBDMs();
  }, []);
  const fetchBDMs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/bdm/get");
      console.log("API Response:", response.data); // Debugging log
      setBdms(response.data);
    } catch (error) {
      console.error("API Fetch Error:", error.response?.data || error);
      message.error("Failed to fetch BDMs");
    }
    setLoading(false);
  };
  

  const handleAddOrUpdate = async (values) => {
    try {
      if (editingBDM) {
        await axios.put(`http://localhost:3000/api/bdm/update/${editingBDM._id}`, values);
        message.success("BDM updated successfully");
      } else {
        await axios.post("http://localhost:3000/api/bdm/create", values);
        message.success("BDM added successfully");
      }
      fetchBDMs();
      setIsModalOpen(false);
      form.resetFields();
      setEditingBDM(null);
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bdm/delete/${id}`);
      message.success("BDM deleted successfully");
      fetchBDMs();
    } catch (error) {
      message.error("Failed to delete BDM");
    }
  };

  const openModal = (bdm = null) => {
    setEditingBDM(bdm);
    setIsModalOpen(true);
    if (bdm) {
      form.setFieldsValue(bdm);
    } else {
      form.resetFields();
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '80px' }}>
      <Button type="primary" onClick={() => openModal()}>Add BDM</Button>
      <Table columns={columns} dataSource={bdms} rowKey="_id" loading={loading} style={{ marginTop: 20 }} />
      <Modal
        title={editingBDM ? "Edit BDM" : "Add BDM"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Phone is required" }]}> 
            <Input type="number" /> 
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Address is required" }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Enter a valid email" }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }, { type: "password", message: "Enter a valid password" }]}> 
            <Input /> 
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BDMManagement;