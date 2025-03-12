// import React, { useState, useEffect } from "react";
// import { Button, Modal, Input, Table } from "antd";
// import axios from "axios";

// const AccountantManagement = () => {
//   const [accountants, setAccountants] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", phone: "", department: "" });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchAccountants();
//   }, []);

//   const fetchAccountants = async () => {
//     const res = await axios.get("http://localhost:3000/api/accountants");
//     setAccountants(res.data);
//   };

//   const handleOpenModal = (accountant = null) => {
//     setIsModalOpen(true);
//     if (accountant) {
//       setForm(accountant);
//       setEditingId(accountant._id);
//     } else {
//       setForm({ name: "", email: "", phone: "", department: "" });
//       setEditingId(null);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (editingId) {
//       await axios.put(`http://localhost:3000/api/accountants/${editingId}`, form);
//     } else {
//       await axios.post("http://localhost:3000/api/accountants", form);
//     }
//     fetchAccountants();
//     handleCloseModal();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:3000/api/accountants/${id}`);
//     fetchAccountants();
//   };

//   const columns = [
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Department", dataIndex: "department", key: "department" },
//     {
//       title: "Actions",
//       render: (text, record) => (
//         <>
//           <Button onClick={() => handleOpenModal(record)}>Edit</Button>
//           <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Button type="primary" onClick={() => handleOpenModal()}>Create Accountant</Button>
//       <Table dataSource={accountants} columns={columns} rowKey="_id" />
//       <Modal title={editingId ? "Edit Accountant" : "Create Accountant"} visible={isModalOpen} onOk={handleSubmit} onCancel={handleCloseModal}>
//         <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
//         <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
//         <Input placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
//         <Input placeholder="Department" name="department" value={form.department} onChange={handleChange} />
//       </Modal>
//     </div>
//   );
// };

// export default AccountantManagement;
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Card, message, Modal } from "antd";
import axios from "axios";

const AccountantManagement = () => {
  const [accountants, setAccountants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAccountants();
  }, []);

  const fetchAccountants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/accountants");
      setAccountants(res.data);
    } catch (error) {
      console.error("Error fetching accountants:", error);
    }
  };

  const handleOpenModal = (accountant = null) => {
    setIsModalOpen(true);
    if (accountant) {
      form.setFieldsValue(accountant);
      setEditingId(accountant._id);
    } else {
      form.resetFields();
      setEditingId(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await axios.put(`http://localhost:3000/api/accountants/${editingId}`, values);
      } else {
        await axios.post("http://localhost:3000/api/accountants", values);
      }
      fetchAccountants();
      handleCloseModal();
      message.success("Accountant saved successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to save accountant");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/accountants/${id}`);
      fetchAccountants();
      message.success("Accountant deleted successfully!");
    } catch (error) {
      console.error("Error deleting accountant:", error);
      message.error("Failed to delete accountant");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleOpenModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", paddingTop: "50px" }}>
      <Card title="Accountant Management" style={{ width: 600 }}>
        <Button type="primary" onClick={() => handleOpenModal()} style={{ marginBottom: "15px", width: "100%" }}>
          Create Accountant
        </Button>
        <Table dataSource={accountants} columns={columns} rowKey="_id" />
        <Modal title={editingId ? "Edit Accountant" : "Create Accountant"} open={isModalOpen} onOk={handleSubmit} onCancel={handleCloseModal}>
          <Form form={form} layout="vertical">
            <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter the email" }, { type: "email", message: "Please enter a valid email" }]}>
              <Input placeholder="Enter email address" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone number" }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item label="Department" name="department" rules={[{ required: true, message: "Please enter department" }]}>
              <Input placeholder="Enter department" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default AccountantManagement;
