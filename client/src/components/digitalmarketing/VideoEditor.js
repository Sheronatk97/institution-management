
import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, Table, Space, Typography, message, Modal } from 'antd';
import { UserOutlined, CalendarOutlined, TagOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const VideoEditorForm = () => {
  const [form] = Form.useForm();
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/videoEditors/all');
      setDesigners(response.data);
    } catch (error) {
      message.error('Error fetching designers');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (selectedDesigner) {
        await axios.put(`http://localhost:3000/api/videoEditors/update/${selectedDesigner._id}`, values);
        message.success('Designer updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/videoEditors/create', values);
        message.success('Designer created successfully');
      }
      fetchDesigners();
      form.resetFields();
      setSelectedDesigner(null);
      setModalVisible(false);
    } catch (error) {
      message.error('Error submitting designer');
    }
    setLoading(false);
  };

  const handleEdit = (designer) => {
    setSelectedDesigner(designer);
    form.setFieldsValue(designer);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/videoEditors/delete/${id}`);
      message.success('Designer deleted successfully');
      fetchDesigners();
    } catch (error) {
      message.error('Error deleting designer');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Manage Designers</Title>

      <Button type="primary" icon={<PlusOutlined />} onClick={() => { setModalVisible(true); setSelectedDesigner(null); form.resetFields(); }} style={{ marginBottom: '20px' }}>
        Create New Video Editor
      </Button>

      <Table
        dataSource={designers}
        columns={[
          { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Department', dataIndex: 'department', key: 'department' },
          { title: 'Experience', dataIndex: 'experience', key: 'experience' },
          { title: 'Primary Skills', dataIndex: 'primarySkills', key: 'primarySkills' },
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
        title={selectedDesigner ? 'Edit Designer' : 'Create Designer'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setSelectedDesigner(null); }}
        footer={null}
      >
        <Form form={form} name="designer_form" onFinish={onFinish} layout="vertical">
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}>
            <Input placeholder="Email" />
          </Form.Item>

          {/* Password field */}
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="department" label="Department" rules={[{ required: true, message: 'Please select a department' }]}>
            <Select placeholder="Select department">
              <Option value="graphic-design">Graphic Design</Option>
              <Option value="ui-ux">UI/UX Design</Option>
              <Option value="video-editing">Video Editing</Option>
              <Option value="content-creation">Content Creation</Option>
            </Select>
          </Form.Item>

          <Form.Item name="experience" label="Experience (Years)" rules={[{ required: true, message: 'Please enter years of experience' }]}>
            <Input type="number" prefix={<CalendarOutlined />} placeholder="Years of Experience" />
          </Form.Item>

          <Form.Item name="primarySkills" label="Primary Skills" rules={[{ required: true, message: 'Please enter skills' }]}>
            <TextArea placeholder="Key Skills (e.g., Photoshop, Figma)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {selectedDesigner ? 'Update Designer' : 'Create Designer'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VideoEditorForm;
