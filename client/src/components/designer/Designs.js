// src/components/videoeditor/Designs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Upload, message, Table, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Designs = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Handle image upload
  const handleUpload = async (values) => {
    if (!file) {
      message.error('Please upload an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', file.originFileObj);
    formData.append('title', values.title);
    formData.append('description', values.description);

    setLoading(true);

    try {
      await axios.post('http://localhost:3000/api/designs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Image uploaded successfully!');
      fetchImages();
    } catch (error) {
      message.error('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all uploaded images
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/designs/view');
      setImages(response.data.images);
    } catch (error) {
      message.error('Error fetching images');
    }
  };

  // Table columns for displaying images
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <div>
          <img src={`http://localhost:3000/${image}`} alt="Uploaded" width="100" />
          <br />
          <a href={`http://localhost:3000/${image}`} download>
            Download
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <Row gutter={24} justify="center">
        <Col span={16}>
          <Card title="Upload New Image" bordered={false}>
            <Form onFinish={handleUpload} layout="vertical">
              <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Image File" name="image" rules={[{ required: true, message: 'Please upload an image!' }]}>
                <Upload
                  name="image"
                  listType="picture"
                  beforeUpload={() => false} // Prevent auto-upload
                  onChange={({ fileList }) => setFile(fileList[0])} // Update file state on change
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Upload Image
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="Uploaded Images" bordered={false}>
            <Table dataSource={images} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Designs;
