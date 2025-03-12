// src/components/videoeditor/VideoView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Row, Col, message, Spin } from 'antd';

const VideoView = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state for videos

  // Fetch all uploaded videos
  const fetchVideos = async () => {
    setIsLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get('http://localhost:3000/api/videos/view');
      setVideos(response.data.videos); // Set the video list
    } catch (error) {
      message.error('Error fetching videos');
    } finally {
      setIsLoading(false); // Set loading to false once the data is fetched
    }
  };

  // Table columns for displaying videos
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Uploaded By', dataIndex: 'uploadedBy', key: 'uploadedBy' },
    {
      title: 'File',
      dataIndex: 'filePath',
      key: 'filePath',
      render: (filePath) => (
        <div>
          {/* Video player */}
          <video width="250" controls>
            <source src={`http://localhost:3000/${filePath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Download link */}
          <br />
          <a href={`http://localhost:3000/${filePath}`} download>
            Download
          </a>
        </div>
      ),
    },
  ];

  // UseEffect to fetch videos when the component mounts
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f7f7f7' }}>
      <Row gutter={24} justify="center">
        {/* Video List Card */}
        <Col xs={24} sm={20} md={16} lg={16} xl={18}>
          <Card
            title={
              <h2 style={{ fontSize: '28px', fontWeight: '600', padding: '80px 0', textAlign: 'center', color: '#1890ff' }}>
                Uploaded Videos
              </h2>
            }
            bordered={false}
            style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
          >
            {/* Loading spinner while fetching */}
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <Spin size="large" />
              </div>
            ) : (
              <Table
                dataSource={videos}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VideoView;
