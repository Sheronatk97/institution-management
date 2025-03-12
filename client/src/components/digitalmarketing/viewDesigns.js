// src/components/DesignsView.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, message, Table, Button } from 'antd';
import axios from 'axios';

const DesignsView = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all designs from the server
  const fetchDesigns = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/designs/view');
      setDesigns(response.data.images);
    } catch (error) {
      message.error('Error fetching designs');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch designs on component mount
  useEffect(() => {
    fetchDesigns();
  }, []);

  // Table columns for displaying the designs
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <div>
          <img
            src={`http://localhost:3000/${image}`}
            alt="Uploaded Design"
            width="100"
            style={{ marginBottom: '10px' }}
          />
          <br />
          <a href={`http://localhost:3000/${image}`} download>
            <Button type="primary">Download</Button>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '40px' }}>
        All Uploaded Designs
      </h2>
      <Row gutter={24} justify="center">
        <Col span={16}>
          <Card title="Uploaded Designs" bordered={false}>
            <Table
              dataSource={designs}
              columns={columns}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DesignsView;
