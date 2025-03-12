// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Input, Upload, Avatar, Popconfirm } from "antd";
// import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import axios from "axios";

// const StudentPage = () => {
//   const [students, setStudents] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [form] = Form.useForm();
//   const [file, setFile] = useState(null);

//   // Fetch students
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     const { data } = await axios.get("/api/students");
//     setStudents(data);
//   };

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     const formData = new FormData();
//     for (let key in values) {
//       formData.append(key, values[key]);
//     }
//     if (file) formData.append("profilePhoto", file);

//     if (editingStudent) {
//       await axios.put(`/api/students/${editingStudent._id}`, formData);
//     } else {
//       await axios.post("/api/students", formData);
//     }

//     setModalVisible(false);
//     setEditingStudent(null);
//     setFile(null);
//     form.resetFields();
//     fetchStudents();
//   };

//   // Handle delete
//   const deleteStudent = async (id) => {
//     await axios.delete(`/api/students/${id}`);
//     fetchStudents();
//   };

//   const columns = [
//     {
//       title: "Profile",
//       dataIndex: "profilePhoto",
//       render: (text) => <Avatar src={text} />,
//     },
//     { title: "Name", dataIndex: "name" },
//     { title: "Email", dataIndex: "email" },
//     { title: "Age", dataIndex: "age" },
//     { title: "Course", dataIndex: "course" },
//     {
//       title: "Actions",
//       render: (_, record) => (
//         <>
//           <Button icon={<EditOutlined />} onClick={() => {
//             setEditingStudent(record);
//             setModalVisible(true);
//             form.setFieldsValue(record);
//           }} />
//           <Popconfirm title="Delete?" onConfirm={() => deleteStudent(record._id)}>
//             <Button danger icon={<DeleteOutlined />} style={{ marginLeft: 8 }} />
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <Button type="primary" icon={<PlusOutlined />} onClick={() => {
//         setEditingStudent(null);
//         setModalVisible(true);
//         form.resetFields();
//       }} style={{ marginBottom: 16 }}>
//         Add Student
//       </Button>

//       <Table columns={columns} dataSource={students} rowKey="_id" />

//       <Modal
//         title={editingStudent ? "Edit Student" : "Add Student"}
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         onOk={() => form.submit()}
//       >
//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//           <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="age" label="Age" rules={[{ required: true }]}>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item name="course" label="Course" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Profile Photo">
//             <Upload beforeUpload={(file) => (setFile(file), false)} showUploadList={false}>
//               <Button icon={<UploadOutlined />}>Upload Image</Button>
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default StudentPage;



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
