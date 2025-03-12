


import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import for routing
import {
  MailOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Designs from "./Designs";

// import MarketingPage from "./MarketingPage";
// import BlogPage from "./BlogPage";
// import SocialMediaAdForm from "./SocialMediaAdForm.js";
// import DesignerCreationForm from "./DesignerCreationForm";
// import VideoEditorForm from "./VideoEditor.js";


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

const GraphicDesignerDashboard = () => {
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
          <Menu.Item key="/graphic_designer/designs" icon={<FileTextOutlined />}>
           Designs
          </Menu.Item>
          {/* <Menu.Item key="/digital_marketing/video_editor" icon={<FileTextOutlined />}>
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
          </Menu.Item> */}
          
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
            <Route path="/graphic_designer/designs" element={<Designs />} />
            {/* 
            <Route path="/digital_marketing/video_editor" element={<VideoEditorForm/>} />
            <Route path="/digital_marketing/socialmedia" element={<SocialMediaAdForm />} />
              <Route path="/digital_marketing/marketing" element={<MarketingPage />} />
              <Route path="/digital_marketing/blog-posts" element={<BlogPage />} /> */}
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

export default GraphicDesignerDashboard;
