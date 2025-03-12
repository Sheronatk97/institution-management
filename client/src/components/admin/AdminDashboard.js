import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Card, Row, Col, Statistic, theme } from "antd";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import BDMCreateForm from "./BdmCreate";
import DigitalMarketerForm from "./DigitalMarketCreate";
import HRCreationForm from "./HrCreate";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StudentPage from "../students/StudentPage";
import FinanceManagerManagementForm from "./FinanceManager";
import DigitalMarketerManagementForm from "./DigitalMarketCreate";
import StudentManagementPage from "./StudentDetails";

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

const AdminDashboard = () => {
  const location = useLocation();
useEffect(() => {
  console.log("Current route:", location.pathname);
}, [location.pathname]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const navigate = useNavigate();

  const items = [
      { key: "1", icon: <UserOutlined />, label: "Finance Manager", onClick: () => navigate("/admin/financeManager") },
      { key: "2", icon: <VideoCameraOutlined />, label: "Digital Marketing", onClick: () => navigate("/admin/create-digital-marketing") },
      { key: "3", icon: <BarChartOutlined />, label: "BDM", onClick: () => navigate("/admin/create-bdm") },
       { key: "4", icon: <UploadOutlined />, label: "Students",onClick: () => navigate("/admin/students-details") },
    

   
    // { key: "5", icon: <CloudOutlined />, label: "Team Lead" },
    // { key: "6", icon: <AppstoreOutlined />, label: "Trainers" },
    // { key: "7", icon: <TeamOutlined />, label: "Another Section" },
    // { key: "8", icon: <ShopOutlined />, label: "Shop" },
    // { key: "9", icon: <MessageOutlined />, label: "Messages" },
  ];

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, textAlign: "center", background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {/* <Routes>
              <Route path="/" element={<DashboardStats />} />
              <Route path="/admin/create-bdm" element={<BDMCreateForm />} />
              <Route path="/admin/create-digital-marketing" element={<DigitalMarketerForm />} />
              <Route path="/admin/createHR" element={<HRCreationForm />} />
            </Routes> */}

<Routes>
  <Route path="/" element={<DashboardStats />} />
  <Route path="/admin/financeManager" element={<FinanceManagerManagementForm />} />
  <Route path="/admin/create-digital-marketing" element={<DigitalMarketerManagementForm />} />
  <Route path="/admin/createHR" element={<HRCreationForm />} />
  <Route path="/admin/students-details" element={<StudentManagementPage/>} />
  
  
</Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

// ✅ Component to show dashboard statistics when no form is selected
const DashboardStats = () => {
  return (
    <>
      <h2>Admin Dashboard</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Total Users" value={120} prefix={<UserOutlined />} valueStyle={{ color: "#3f8600" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Active Sessions" value={45} prefix={<VideoCameraOutlined />} valueStyle={{ color: "#1890ff" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Reports" value={10} prefix={<BarChartOutlined />} valueStyle={{ color: "#faad14" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Messages" value={5} prefix={<MessageOutlined />} valueStyle={{ color: "#cf1322" }} />
          </Card>
        </Col>
      </Row>
    </>
  );
};



export default AdminDashboard;
