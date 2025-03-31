
import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, DatePicker, Table, Space, Typography, message, Modal } from 'antd';
import { FileTextOutlined, UserOutlined, CalendarOutlined, TagOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title } = Typography;

const App = () => {
  const [form] = Form.useForm();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/blogs/all');
      setBlogs(response.data);
    } catch (error) {
      message.error('Error fetching blogs');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = { ...values, publishDate: values.publishDate.format('YYYY-MM-DD') };

      if (selectedBlog) {
        await axios.put(`http://localhost:3000/api/blogs/update/${selectedBlog._id}`, formattedValues);
        message.success('Blog updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/blogs/create', formattedValues);
        message.success('Blog created successfully');
      }

      fetchBlogs();
      form.resetFields();
      setSelectedBlog(null);
      setModalVisible(false);
    } catch (error) {
      message.error('Error submitting blog');
    }
    setLoading(false);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    form.setFieldsValue({ ...blog, publishDate: dayjs(blog.publishDate) });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/delete/${id}`);
      message.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Error deleting blog');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Manage Blogs</Title>

      <Button type="primary" icon={<PlusOutlined />} onClick={() => { setModalVisible(true); setSelectedBlog(null); form.resetFields(); }} style={{ marginBottom: '20px' }}>
        Create New Blog
      </Button>

      <Table
        dataSource={blogs}
        columns={[
          { title: 'Title', dataIndex: 'blogName', key: 'blogName' },
          { title: 'Author', dataIndex: 'authorName', key: 'authorName' },
          { title: 'Category', dataIndex: 'blogCategory', key: 'blogCategory' },
          { title: 'Publish Date', dataIndex: 'publishDate', key: 'publishDate' },
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
        title={selectedBlog ? 'Edit Blog' : 'Create Blog'}
        open={modalVisible}
        onCancel={() => { setModalVisible(false); form.resetFields(); setSelectedBlog(null); }}
        footer={null}
      >
        <Form form={form} name="blog_form" onFinish={onFinish} layout="vertical">
          <Form.Item name="blogName" label="Blog Name" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input prefix={<FileTextOutlined />} placeholder="Blog Title" />
          </Form.Item>

          <Form.Item name="blogContent" label="Content" rules={[{ required: true, message: 'Please enter content' }]}>
            <TextArea rows={4} placeholder="Blog Content" />
          </Form.Item>

          <Form.Item name="blogCategory" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
            <Select placeholder="Select Category">
              <Select.Option value="technology">Technology</Select.Option>
              <Select.Option value="business">Business</Select.Option>
              <Select.Option value="lifestyle">Lifestyle</Select.Option>
              <Select.Option value="health">Health</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="authorName" label="Author" rules={[{ required: true, message: 'Please enter author name' }]}>
            <Input prefix={<UserOutlined />} placeholder="Author Name" />
          </Form.Item>

          <Form.Item name="publishDate" label="Publish Date" rules={[{ required: true, message: 'Please select a date' }]}>
            <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {selectedBlog ? 'Update Blog' : 'Create Blog'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
