import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic, theme } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import BDMManagement from "./BDMManagement";
import TeamLeaderPage from "./teamLeader";
import AssociateConsultantPage from "./associateConsultant";
import StudentsPage from "./Student";
import CoursePage from "./coursePage";
import CourseEnrollmentPage from "../teamLead/Enroll";

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

const SalesDashboard = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const menuItems = [
    // { key: "1", icon: <UserOutlined />, label: "BDM", onClick: () => navigate("/sales/bdm") },
    { key: "2", icon: <BarChartOutlined />, label: "Team Leader", onClick: () => navigate("/bdm/team_leader") },
    { key: "3", icon: <DollarOutlined />, label: "Course", onClick: () => navigate("/bdm/course") },
    { key: "4", icon: <DollarOutlined />, label: "Course", onClick: () => navigate("/bdm/courseenrollment") },
    // { key: "3", icon: <DollarOutlined />, label: "Associate Consultant", onClick: () => navigate("/sales/associate_consultant") },
    // { key: "4", icon: <FileTextOutlined />, label: "Students", onClick: () => navigate("/sales/students") },
    { key: "5", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
  ].map(({ icon, label, key, onClick }) => ({
    key,
    icon,
    label,
    onClick,
  }));

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, textAlign: "center", background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h2>BDM Dashboard</h2>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Card bordered={false}>
                          <Statistic title="Total Leads" value={320} prefix={<UserOutlined />} valueStyle={{ color: "#3f8600" }} />
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card bordered={false}>
                          <Statistic title="Active Sales" value={85} prefix={<BarChartOutlined />} valueStyle={{ color: "#1890ff" }} />
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card bordered={false}>
                          <Statistic title="Revenue" value={`$120K`} prefix={<DollarOutlined />} valueStyle={{ color: "#faad14" }} />
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card bordered={false}>
                          <Statistic title="Clients" value={50} prefix={<FileTextOutlined />} valueStyle={{ color: "#cf1322" }} />
                        </Card>
                      </Col>
                    </Row>
                  </>
                }
              />
              {/* <Route path="/sales/bdm" element={<BDMManagement />} /> */}
               <Route path="/bdm/team_leader" element={<TeamLeaderPage/>} />
               <Route path="/bdm/course" element={<CoursePage/>} />
               <Route path="/bdm/courseenrollment" element={<CourseEnrollmentPage/>} />

             {/* <Route path="/sales/associate_consultant" element={<AssociateConsultantPage/>} />
                <Route path="/sales/students" element={<StudentsPage/>} />   */}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default SalesDashboard;
