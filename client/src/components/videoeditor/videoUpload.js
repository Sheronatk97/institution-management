
// // src/components/videoeditor/VideoUpload.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Form, Input, Upload, message, Table } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const VideoUpload = () => {
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
//     formData.append('uploadedBy', values.uploadedBy);

//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/videos/add', formData, {
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
//       setVideos(response.data.videos);
//     } catch (error) {
//       message.error('Error fetching videos');
//     }
//   };

//   // Table columns for viewing videos
//   const columns = [
//     { title: 'Title', dataIndex: 'title', key: 'title' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     { title: 'Uploaded By', dataIndex: 'uploadedBy', key: 'uploadedBy' },
//     {
//       title: 'File',
//       dataIndex: 'filePath',
//       key: 'filePath',
//       render: (filePath) => (
//         <div>
//           {/* Display the video */}
//           <video width="200" controls>
//             <source src={`http://localhost:3000/${filePath}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* Download Link */}
//           <br />
//           <a href={`http://localhost:3000/${filePath}`} download>
//             Download
//           </a>
//         </div>
//       ),
//     },
//   ];

//   // UseEffect to fetch videos on page load
//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   return (
//     <div style={{ padding: '80px' }}>
//       <h2>Upload New Video</h2>
//       <Form onFinish={handleUpload} layout="vertical" style={{ maxWidth: '600px', marginBottom: '30px' }}>
//         <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="Uploaded By" name="uploadedBy" rules={[{ required: true, message: 'Please input who uploaded the video!' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="Video File" name="video" rules={[{ required: true, message: 'Please upload a video!' }]}>
//           <Upload
//             name="video"
//             listType="picture"
//             beforeUpload={() => false} // Prevent auto-upload to server
//             onChange={({ fileList }) => setFile(fileList[0])} // Update file state on file change
//           >
//             <Button icon={<UploadOutlined />}>Click to upload</Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Upload Video
//           </Button>
//         </Form.Item>
//       </Form>

//       <h2>Uploaded Videos</h2>
//       <Table dataSource={videos} columns={columns} rowKey="_id" />
//     </div>
//   );
// };

// export default VideoUpload;



// // src/components/videoeditor/VideoUpload.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Form, Input, Upload, message, Table, Card, Row, Col, Spin } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const VideoUpload = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null); // Store the selected file in state
//   const [isTableLoading, setIsTableLoading] = useState(false); // State to track table loading

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
//     formData.append('uploadedBy', values.uploadedBy);

//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:3000/api/videos/add', formData, {
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
//     setIsTableLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3000/api/videos/view');
//       setVideos(response.data.videos);
//     } catch (error) {
//       message.error('Error fetching videos');
//     } finally {
//       setIsTableLoading(false);
//     }
//   };

//   // Table columns for viewing videos
//   const columns = [
//     { title: 'Title', dataIndex: 'title', key: 'title' },
//     { title: 'Description', dataIndex: 'description', key: 'description' },
//     { title: 'Uploaded By', dataIndex: 'uploadedBy', key: 'uploadedBy' },
//     {
//       title: 'File',
//       dataIndex: 'filePath',
//       key: 'filePath',
//       render: (filePath) => (
//         <div>
//           {/* Display the video */}
//           <video width="250" controls>
//             <source src={`http://localhost:3000/${filePath}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* Download Link */}
//           <br />
//           <a href={`http://localhost:3000/${filePath}`} download>
//             Download
//           </a>
//         </div>
//       ),
//     },
//   ];

//   // UseEffect to fetch videos on page load
//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   return (
//     <div style={{ padding: '40px', backgroundColor: '#f7f7f7' }}>
//       <Row gutter={24} justify="center">
//         {/* Video Upload Form Card */}
//         <Col xs={24} sm={20} md={16} lg={12} xl={10}>
//           <Card
//             title="Upload New Video"
//             bordered={false}
//             style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
//           >
//             <Form onFinish={handleUpload} layout="vertical" style={{ marginBottom: '30px' }}>
//               <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
//                 <Input placeholder="Enter the video title" />
//               </Form.Item>

//               <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
//                 <Input.TextArea placeholder="Enter video description" />
//               </Form.Item>

//               <Form.Item label="Uploaded By" name="uploadedBy" rules={[{ required: true, message: 'Please input who uploaded the video!' }]}>
//                 <Input placeholder="Enter uploader name" />
//               </Form.Item>

//               <Form.Item label="Video File" name="video" rules={[{ required: true, message: 'Please upload a video!' }]}>
//                 <Upload
//                   name="video"
//                   listType="picture"
//                   beforeUpload={() => false} // Prevent auto-upload to server
//                   onChange={({ fileList }) => setFile(fileList[0])} // Update file state on file change
//                 >
//                   <Button icon={<UploadOutlined />}>Click to upload</Button>
//                 </Upload>
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" loading={loading} block>
//                   {loading ? <Spin /> : 'Upload Video'}
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={24} style={{ marginTop: '40px' }} justify="center">
//         {/* Uploaded Videos Table Card */}
//         <Col xs={24} sm={20} md={16} lg={16} xl={18}>
//           <Card
//             title="Uploaded Videos"
//             bordered={false}
//             style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
//           >
//             <Table
//               dataSource={videos}
//               columns={columns}
//               rowKey="_id"
//               loading={isTableLoading}
//               pagination={{ pageSize: 5 }}
//               scroll={{ x: true }}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default VideoUpload;



// src/components/videoeditor/VideoUpload.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Upload, message, Table, Card, Row, Col, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const VideoUpload = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // Store the selected file in state
  const [isTableLoading, setIsTableLoading] = useState(false); // State to track table loading

  // Handle video upload
  const handleUpload = async (values) => {
    if (!file) {
      message.error('Please upload a video!');
      return;
    }

    const formData = new FormData();
    formData.append('video', file.originFileObj); // Get the file's actual object
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('uploadedBy', values.uploadedBy);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/videos/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Video uploaded successfully!');
      fetchVideos(); // Re-fetch videos after uploading
    } catch (error) {
      message.error('Error uploading video');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all uploaded videos
  const fetchVideos = async () => {
    setIsTableLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/videos/view');
      setVideos(response.data.videos);
    } catch (error) {
      message.error('Error fetching videos');
    } finally {
      setIsTableLoading(false);
    }
  };

  // Table columns for viewing videos
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
          {/* Display the video */}
          <video width="250" controls>
            <source src={`http://localhost:3000/${filePath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Download Link */}
          <br />
          <a href={`http://localhost:3000/${filePath}`} download>
            Download
          </a>
        </div>
      ),
    },
  ];

  // UseEffect to fetch videos on page load
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: '0px', backgroundColor: '#f7f7f7' }}>
      <Row gutter={24} justify="center">
        {/* Video Upload Form Card */}
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            title={
              <h2 style={{ fontSize: '28px', fontWeight: '600', padding: '80px 0', textAlign: 'center', color: '#1890ff' }}>
                Upload New Video
              </h2>
            }
            bordered={false}
            style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
          >
            <Form onFinish={handleUpload} layout="vertical" style={{ marginBottom: '30px' }}>
              <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input placeholder="Enter the video title" />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input.TextArea placeholder="Enter video description" />
              </Form.Item>

              <Form.Item label="Uploaded By" name="uploadedBy" rules={[{ required: true, message: 'Please input who uploaded the video!' }]}>
                <Input placeholder="Enter uploader name" />
              </Form.Item>

              <Form.Item label="Video File" name="video" rules={[{ required: true, message: 'Please upload a video!' }]}>
                <Upload
                  name="video"
                  listType="picture"
                  beforeUpload={() => false} // Prevent auto-upload to server
                  onChange={({ fileList }) => setFile(fileList[0])} // Update file state on file change
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  {loading ? <Spin /> : 'Upload Video'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: '40px' }} justify="center">
        {/* Uploaded Videos Table Card */}
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
            <Table
              dataSource={videos}
              columns={columns}
              rowKey="_id"
              loading={isTableLoading}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VideoUpload;
