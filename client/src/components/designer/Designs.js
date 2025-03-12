// // src/components/videoeditor/VideoUpload.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Form, Input, Upload, message, Table, Spin, Card, Row, Col } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const Designs = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null); // Store the selected file in state

//   // Handle video upload
//   const handleUpload = async (values) => {
//     if (!file) {
//       message.error('Please upload a video!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', file.originFileObj); // Get the file's actual object
//     formData.append('title', values.title);
//     formData.append('description', values.description);

//     setLoading(true);

//     try {
//       await axios.post('http://localhost:3000/api/videos/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       message.success('Video uploaded successfully!');
//       fetchVideos(); // Re-fetch videos after uploading
//     } catch (error) {
//       message.error('Error uploading video');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all uploaded videos
//   const fetchVideos = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/videos/view');
//       setVideos(response.data.videos); // Set the video list
//     } catch (error) {
//       message.error('Error fetching videos');
//     }
//   };

//   // Table columns for displaying videos
//   const columns = [
//     { title: 'Title', dataIndex: 'title', key: 'title' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     { title: 'Uploaded By', dataIndex: 'uploadedBy', key: 'uploadedBy' },
//     {
//       title: 'File',
//       dataIndex: 'image',
//       key: 'image',
//       render: (image) => (
//         <div>
//           {/* Video player */}
//           <video width="250" controls>
//             <source src={`http://localhost:3000/${image}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* Download link */}
//           <br />
//           <a href={`http://localhost:3000/${image}`} download>
//             Download
//           </a>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   return (
//     <div style={{ padding: '40px', backgroundColor: '#f7f7f7' }}>
//       <Row gutter={24} justify="center">
//         {/* Video Upload Form */}
//         <Col xs={24} sm={20} md={16} lg={16} xl={18}>
//           <Card
//             title={<h2 style={{ fontSize: '28px', fontWeight: '600', color: '#1890ff' }}>Upload New Video</h2>}
//             bordered={false}
//             style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
//           >
//             <Form onFinish={handleUpload} layout="vertical" style={{ maxWidth: '600px', marginBottom: '30px' }}>
//               <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
//                 <Input />
//               </Form.Item>

//               <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
//                 <Input />
//               </Form.Item>

//               <Form.Item label="Video File" name="video" rules={[{ required: true, message: 'Please upload a video!' }]}>
//                 <Upload
//                   name="video"
//                   listType="picture"
//                   beforeUpload={() => false}
//                   onChange={({ fileList }) => setFile(fileList[0])}
//                 >
//                   <Button icon={<UploadOutlined />}>Click to upload</Button>
//                 </Upload>
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" loading={loading}>
//                   Upload Video
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Card>

//           {/* Video List */}
//           <Card
//             title={<h2 style={{ fontSize: '28px', fontWeight: '600', color: '#1890ff' }}>Uploaded Videos</h2>}
//             bordered={false}
//             style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
//           >
//             {loading ? (
//               <Spin size="large" />
//             ) : (
//               <Table dataSource={videos} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} scroll={{ x: true }} />
//             )}
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Designs;

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
