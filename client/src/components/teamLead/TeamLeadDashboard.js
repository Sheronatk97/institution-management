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
import ConsultantPage from "./ConsultantPage";
import CourseEnrollmentPage from "./Enroll";
import StudentsAssign from "./StudentsAssign";
import Attendance from "./Attendance";
import LeaveRequestForm from "../students/LeaveRequestForm";
import LeaveRequestPage from "./Leave";
import Navbar from "../admin/Navbar";

// import BDMManagement from "./BDMManagement";
// import TeamLeaderPage from "./teamLeader";
// import AssociateConsultantPage from "./associateConsultant";
// import StudentsPage from "./Student";
// import CoursePage from "./coursePage";

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

const TeamLeadDashboard = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const menuItems = [
    { key: "1", icon: <UserOutlined />, label: "Associate Consultant", onClick: () => navigate("/team_lead/consultant") },
    { key: "2", icon: <BarChartOutlined />, label: "Course Enrolments", onClick: () => navigate("/team_lead/courseenrolments") },
    { key: "3", icon: <BarChartOutlined />, label: "Students Assign", onClick: () => navigate("/team_lead/studentsassign") },
    { key: "4", icon: <BarChartOutlined />, label: "Attendance", onClick: () => navigate("/team_lead/attendance") },
    { key: "5", icon: <BarChartOutlined />, label: "Leaves", onClick: () => navigate("/team_lead/leave") },
    // { key: "3", icon: <DollarOutlined />, label: "Course", onClick: () => navigate("/bdm/course") },
    // { key: "3", icon: <DollarOutlined />, label: "Associate Consultant", onClick: () => navigate("/sales/associate_consultant") },
    // { key: "4", icon: <FileTextOutlined />, label: "Students", onClick: () => navigate("/sales/students") },
    { key: "6", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
  ].map(({ icon, label, key, onClick }) => ({
    key,
    icon,
    label,
    onClick,
  }));

  return (
    <Layout hasSider>
      <Navbar/>
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
                    <h2>TeamLeader Dashboard</h2>
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
              <Route path="/team_lead/consultant" element={<ConsultantPage />} />
              <Route path="/team_lead/courseenrolments" element={<CourseEnrollmentPage/>} />
              <Route path="/team_lead/studentsassign" element={<StudentsAssign/>} />
              <Route path="/team_lead/attendance" element={<Attendance/>} />
              <Route path="/team_lead/leave" element={<LeaveRequestPage/>} />
               {/* <Route path="/bdm/team_leader" element={<TeamLeaderPage/>} />
               <Route path="/bdm/course" element={<CoursePage/>} /> */}
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

export default TeamLeadDashboard;
