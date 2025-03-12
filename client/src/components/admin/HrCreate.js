
import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, Table, Space, Typography, message, Modal, InputNumber } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const HRCreationForm = () => {
  const [form] = Form.useForm();
  const [hrs, setHrs] = useState([]);
  const [selectedHr, setSelectedHr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchHrs();
  }, []);

  const fetchHrs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/hr/all');
      setHrs(response.data);
    } catch (error) {
      message.error('Error fetching HRs');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (selectedHr) {
        await axios.put(`http://localhost:3000/api/hr/update/${selectedHr._id}`, values);
        message.success('HR updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/hr/create', values);
        message.success('HR created successfully');
      }
      fetchHrs();
      form.resetFields();
      setSelectedHr(null);
      setModalVisible(false);
    } catch (error) {
      message.error('Error submitting HR');
    }
    setLoading(false);
  };

  const handleEdit = (hr) => {
    setSelectedHr(hr);
    form.setFieldsValue(hr);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/hr/delete/${id}`);
      message.success('HR deleted successfully');
      fetchHrs();
    } catch (error) {
      message.error('Error deleting HR');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Manage HRs</Title>
      <Button type="primary" onClick={() => { setModalVisible(true); setSelectedHr(null); form.resetFields(); }} style={{ marginBottom: '20px' }}>
        Create New HR
      </Button>

      <Table
        dataSource={hrs}
        columns={[
          { title: 'Username', dataIndex: 'username', key: 'username' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Age', dataIndex: 'age', key: 'age' },
          { title: 'Qualification', dataIndex: 'qualification', key: 'qualification' },
          { title: 'Role', dataIndex: 'role', key: 'role' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
              </Space>
            ),
          },
        ]}
        rowKey="_id"
      />

      <Modal
        title={selectedHr ? 'Edit HR' : 'Create HR'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setSelectedHr(null); }}
        footer={null}
      >
        <Form form={form} name="hr_form" onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}> 
            <Input.Password prefix={<LockOutlined />} /> 
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}> 
            <Input prefix={<MailOutlined />} /> 
          </Form.Item>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}> 
            <Input prefix={<UserOutlined />} /> 
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}> 
            <InputNumber min={18} max={100} style={{ width: '100%' }} /> 
          </Form.Item>
          <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}> 
            <Input /> 
          </Form.Item>
          <Form.Item name="role" label="HR Role" rules={[{ required: true }]}> 
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="hr">HR</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}> 
              {selectedHr ? 'Update HR' : 'Create HR'} 
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HRCreationForm;
