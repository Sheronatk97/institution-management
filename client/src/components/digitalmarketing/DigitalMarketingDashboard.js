// import React from 'react';
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   MessageOutlined,
//   MailOutlined, // For Marketing
//   FileTextOutlined, // For Blog Posts
// } from '@ant-design/icons';
// import { Layout, Menu, Card, Row, Col, Statistic, theme } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// const siderStyle = {
//   overflow: 'auto',
//   height: '100vh',
//   position: 'sticky',
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: 'thin',
//   scrollbarGutter: 'stable',
// };

// // Update the items array to include Marketing and Blog Posts categories
// const items = [
//   { key: '1', icon: <UserOutlined />, label: 'HR' },
//   { key: '2', icon: <VideoCameraOutlined />, label: 'Digital Marketing' },
//   { key: '3', icon: <UploadOutlined />, label: 'Students' },
//   { key: '4', icon: <BarChartOutlined />, label: 'BDM' },
//   { key: '5', icon: <CloudOutlined />, label: 'Team Lead' },
//   { key: '6', icon: <AppstoreOutlined />, label: 'Other' },
//   { key: '7', icon: <TeamOutlined />, label: 'Another Section' },
//   { key: '8', icon: <ShopOutlined />, label: 'Shop' },
//   { key: '9', icon: <MessageOutlined />, label: 'Messages' },
//   { key: '10', icon: <MailOutlined />, label: 'Marketing' },  // Added Marketing
//   { key: '11', icon: <FileTextOutlined />, label: 'Blog Posts' }, // Added Blog Posts
// ].map(({ icon, label, key }) => ({
//   key,
//   icon,
//   label,
// }));

// const AdminDashboard = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout hasSider>
//       <Sider style={siderStyle}>
//         <div className="demo-logo-vertical" />
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: '24px 16px 0',
//             overflow: 'initial',
//           }}
//         >
//           <div
//             style={{
//               padding: 24,
//               textAlign: 'center',
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <h2>Admin Dashboard</h2>
//             <Row gutter={16}>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Total Users"
//                     value={120}
//                     prefix={<UserOutlined />}
//                     valueStyle={{ color: '#3f8600' }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Active Sessions"
//                     value={45}
//                     prefix={<VideoCameraOutlined />}
//                     valueStyle={{ color: '#1890ff' }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Reports"
//                     value={10}
//                     prefix={<BarChartOutlined />}
//                     valueStyle={{ color: '#faad14' }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Messages"
//                     value={5}
//                     prefix={<MessageOutlined />}
//                     valueStyle={{ color: '#cf1322' }}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: 'center',
//           }}
//         >
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboard;





// import React, { useState } from 'react';
// import { Layout, Menu, Card, Row, Col, Statistic, theme, Tabs } from 'antd';
// import { Link } from 'react-router-dom'; // Using Link for routing without page reload
// import {
//   MailOutlined, // For Marketing
//   FileTextOutlined, // For Blog Posts
// } from '@ant-design/icons';

// const { Header, Content, Footer, Sider } = Layout;
// const { TabPane } = Tabs;

// const siderStyle = {
//   overflow: 'auto',
//   height: '100vh',
//   position: 'sticky',
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: 'thin',
//   scrollbarGutter: 'stable',
//   paddingTop:'60px'
// };

// const DigitalMarketingDashboard = () => {
//   const [selectedTab, setSelectedTab] = useState("1");

//   const handleTabChange = (key) => {
//     setSelectedTab(key);
//   };

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout hasSider>
//       <Sider style={siderStyle}>
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           onSelect={({ key }) => handleTabChange(key)}
//         >
//           <Menu.Item key="1" icon={<MailOutlined />}>
//             <Link to="/marketing">Marketing</Link>
//           </Menu.Item>
//           <Menu.Item key="2" icon={<FileTextOutlined />}>
//             <Link to="/blog-posts">Blog Posts</Link>
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />
//         <Content
//           style={{
//             margin: '24px 16px 0',
//             overflow: 'initial',
//           }}
//         >
//           <div
//             style={{
//               padding: 24,
//               textAlign: 'center',
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <h2>Digital Marketing Dashboard</h2>
//             <Row gutter={16}>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Total Users"
//                     value={120}
//                     prefix={<MailOutlined />}
//                     valueStyle={{ color: '#3f8600' }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Active Sessions"
//                     value={45}
//                     prefix={<MailOutlined />}
//                     valueStyle={{ color: '#1890ff' }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Reports"
//                     value={10}
//                     prefix={<MailOutlined />}
//                     valueStyle={{ color: '#faad14' }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={6}>
//                 <Card bordered={false}>
//                   <Statistic
//                     title="Messages"
//                     value={5}
//                     prefix={<MailOutlined />}
//                     valueStyle={{ color: '#cf1322' }}
//                   />
//                 </Card>
//               </Col>
//             </Row>

//             {/* Tabs to show content dynamically */}
//             <Tabs activeKey={selectedTab} onChange={handleTabChange} centered>
//               <TabPane tab="Marketing" key="1">
//                 <div style={{ marginTop: 20 }}>
//                   <h3>Marketing Content</h3>
//                   <p>This is the content for the Marketing tab.</p>
//                   {/* You can add more dynamic content for Marketing here */}
//                 </div>
//               </TabPane>
//               <TabPane tab="Blog Posts" key="2">
//                 <div style={{ marginTop: 20 }}>
//                   <h3>Blog Posts Content</h3>
//                   <p>This is the content for the Blog Posts tab.</p>
//                   {/* You can add more dynamic content for Blog Posts here */}
//                 </div>
//               </TabPane>
//             </Tabs>
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: 'center',
//           }}
//         >
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default DigitalMarketingDashboard;









import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import for routing
import {
  MailOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import MarketingPage from "./MarketingPage";
import BlogPage from "./BlogPage";
import SocialMediaAdForm from "./SocialMediaAdForm.js";
import DesignerCreationForm from "./DesignerCreationForm";
import VideoEditorForm from "./VideoEditor.js";
import VideoView from "./ViewVideo.js";
import DesignsView from "./viewDesigns.js";
// import DesignsView from './designer/ViewDesigns.js';
;


const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  paddingTop: "60px",
};

const DigitalMarketingDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      {/* Sidebar Navigation */}
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/digital_marketing/marketing"]}
          onClick={({ key }) => navigate(key)} // Handle navigation
        >
          <Menu.Item key="/digital_marketing/designer" icon={<FileTextOutlined />}>
           Graphic Designer
          </Menu.Item>
          <Menu.Item key="/digital_marketing/video_editor" icon={<FileTextOutlined />}>
           Video Editor
          </Menu.Item>
          <Menu.Item key="/digital_marketing/socialmedia" icon={<FileTextOutlined />}>
          Social Media Poster
          </Menu.Item>
          <Menu.Item key="/digital_marketing/marketing" icon={<MailOutlined />}>
            Marketing
          </Menu.Item>
          <Menu.Item key="/digital_marketing/blog-posts" icon={<FileTextOutlined />}>
            Blog Posts
          </Menu.Item>
          <Menu.Item key="/digital_marketing/view_videos" icon={<FileTextOutlined />}>
            View Video
          </Menu.Item>
          <Menu.Item key="/digital_marketing/view_designs" icon={<FileTextOutlined />}>
            View Designs
          </Menu.Item>
          
        </Menu>
      </Sider>

      <Layout>
        {/* Header */}
        <Header style={{ padding: 0, background: colorBgContainer }} />

        {/* Content */}
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h2>Digital Marketing Dashboard</h2>

            {/* Statistic Cards */}
            <Row gutter={16}>
              <Col span={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Users"
                    value={120}
                    prefix={<MailOutlined />}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Active Sessions"
                    value={45}
                    prefix={<MailOutlined />}
                    valueStyle={{ color: "#1890ff" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Reports"
                    value={10}
                    prefix={<MailOutlined />}
                    valueStyle={{ color: "#faad14" }}
                  />
                </Card>
              </Col> 
              <Col span={6}>
                <Card bordered={false}>
                  <Statistic
                    title="Messages"
                    value={5}
                    prefix={<MailOutlined />}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Routes for Different Pages (Marketing & Blog) */}
            <Routes>
            <Route path="/digital_marketing/designer" element={<DesignerCreationForm />} />
            <Route path="/digital_marketing/video_editor" element={<VideoEditorForm/>} />
            <Route path="/digital_marketing/socialmedia" element={<SocialMediaAdForm />} />
              <Route path="/digital_marketing/marketing" element={<MarketingPage />} />
              <Route path="/digital_marketing/blog-posts" element={<BlogPage />} />
              <Route path="/digital_marketing/view_videos" element={<VideoView />} />
              <Route path="/digital_marketing/view_designs" element={<DesignsView />} />
              {/* <Route path="/" element={<h3>Welcome to the Dashboard!</h3>} /> */}
            </Routes>
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DigitalMarketingDashboard;
