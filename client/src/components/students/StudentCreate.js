

import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, Table, Space, Typography, message, Modal, DatePicker } from 'antd';
import { UserOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';


const { Title } = Typography;
const { Option } = Select;

const StudentDashboard = () => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students/getallstudents');
      setStudents(response.data);
    } catch (error) {
      message.error('Error fetching students');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (selectedStudent) {
        await axios.put(`http://localhost:3000/api/students/updatestudents/${selectedStudent._id}`, values);
        message.success('Student updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/students/createstudents', values);
        message.success('Student created successfully');
      }
      fetchStudents();
      form.resetFields();
      setSelectedStudent(null);
      setModalVisible(false);
    } catch (error) {
      message.error('Error submitting student');
    }
    setLoading(false);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    form.setFieldsValue(student);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/deletestudents/${id}`);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Error deleting student');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Manage Students</Title>

      <Button type="primary" icon={<PlusOutlined />} onClick={() => { setModalVisible(true); setSelectedStudent(null); form.resetFields(); }} style={{ marginBottom: '20px' }}>
        Add Student
      </Button>

      <Table
        dataSource={students}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Phone', dataIndex: 'phone', key: 'phone' },
          { title: 'Class', dataIndex: 'class', key: 'class' },
          { title: 'Section', dataIndex: 'section', key: 'section' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>Delete</Button>
              </Space>
            ),
          },
        ]}
        rowKey="_id"
      />

      <Modal
        title={selectedStudent ? 'Edit Student' : 'Add Student'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setSelectedStudent(null); }}
        footer={null}
      >
        <Form form={form} name="student_form" onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}> 
            <Input prefix={<UserOutlined />} placeholder="Full Name" /> 
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}> 
            <Input prefix={<MailOutlined />} placeholder="Email" /> 
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone number' }]}> 
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" /> 
          </Form.Item>
          <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please enter date of birth' }]}> 
            <DatePicker style={{ width: '100%' }} prefix={<CalendarOutlined />} /> 
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender' }]}> 
            <Select placeholder="Select Gender"> 
              <Option value="Male">Male</Option> 
              <Option value="Female">Female</Option> 
              <Option value="Other">Other</Option> 
            </Select>
          </Form.Item>
          <Form.Item name="class" label="Class" rules={[{ required: true, message: 'Please enter class' }]}> 
            <Input placeholder="Class" /> 
          </Form.Item>
          <Form.Item name="section" label="Section" rules={[{ required: true, message: 'Please enter section' }]}> 
            <Input placeholder="Section" /> 
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}> 
              {selectedStudent ? 'Update Student' : 'Add Student'} 
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
