import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, notification, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AssociateConsultantPage = () => {
  const [consultants, setConsultants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editConsultant, setEditConsultant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConsultants();
  }, []);

  // Fetch all consultants
  const fetchConsultants = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/associateconsultants/getconsultants");
      setConsultants(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch consultants" });
    }
  };

  // Show the modal for adding or editing a consultant
  const showModal = (consultant = null) => {
    setEditConsultant(consultant);
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditConsultant(null);
  };

  // Submit the form for creating or updating a consultant
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editConsultant) {
        await axios.put(`http://localhost:3000/api/associateconsultants/updateconsultants/${editConsultant._id}`, values);
        notification.success({ message: "Consultant updated successfully" });
      } else {
        await axios.post("http://localhost:3000/api/associateconsultants/createconsultants", values);
        notification.success({ message: "Consultant created successfully" });
      }
      fetchConsultants();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({ message: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a consultant
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/associateconsultants/deleteconsultants/${id}`);
      notification.success({ message: "Consultant deleted successfully" });
      fetchConsultants();
    } catch (error) {
      notification.error({ message: "Failed to delete consultant" });
    }
  };

  // Columns for the Ant Design table
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
    <div style={{padding:'70px'}}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Consultant
      </Button>
      <Table
        dataSource={consultants}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title={editConsultant ? "Edit Consultant" : "Add Consultant"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editConsultant}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {editConsultant ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssociateConsultantPage;
