

import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  LogoutOutlined,
  HomeOutlined,
  ProfileOutlined,
  DollarCircleOutlined,
  BookOutlined,
  ReadOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Card, Row, Col, Statistic, theme } from 'antd';
import StudentPage from './StudentPage';
import Course from './Course';
import Profile from './Profile';
import LeaveRequestForm from './LeaveRequestForm';
import WhatsAppButton from '../associateConsultant/Chat';
import UserLeaveStatus from './LeaveStatus';
import AddPayment from './addPayment';
import StudentsAttendance from './StudentsAttendance';
import CourseDetails from './CourseDetails';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};


const Dashboard = () => (
  
  <div style={{ padding: 24, textAlign: 'center' }}>
    <h2>Student Dashboard</h2>
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="Student Profile"
            value={1}
            prefix={<ProfileOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="Fee Paid"
            value={7500}
            prefix={<DollarCircleOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="Fee Due"
            value={2500}
            prefix={<DollarCircleOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };
  
  const items = [
    { path: '/', icon: <HomeOutlined />, label: 'Dashboard' },
    { path: '/student/profile', icon: <ProfileOutlined />, label: 'Profile', onClick: () => navigate('/student/profile') },
    { path: '/student/payment', icon: <DollarCircleOutlined />, label: 'Fee Details',onClick: () => navigate('/student/payment')  },
    // <Route path="/student/leaveform" element={<LeaveRequestForm />} />
    // { path: '/student/course', icon: <BookOutlined />, label: 'Courses',onClick: () => navigate('/student/course') },
    { path: '/student/leaveform', icon: <ReadOutlined />, label: 'Leave Form',onClick: () => navigate('/student/leaveform') },
    { path: '/student/leavestatus', icon:<BookOutlined /> , label: 'Leave Status',onClick: () => navigate('/student/leavestatus') },
    { path: '/student/chat', icon: <WhatsAppButton/>, label: 'Chat',onClick: () => navigate('/student/chat') },
    { path: '/student/studentsattendance', icon: <BookOutlined />, label: 'Attendance',onClick: () => navigate('/student/studentsattendance') },
    { path: '/student/coursedetails', icon: <BookOutlined />, label: 'Course Details',onClick: () => navigate('/student/coursedetails') },
    { icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },

  ].map((item, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.onClick ? (
      <span onClick={item.onClick} style={{ cursor: 'pointer' }}>
        {item.label}
      </span>
    ) : (
      <Link to={item.path}>{item.label}</Link>
    ),
  }));

  return (
    <Layout hasSider>
      <Sider style={siderStyle} theme="dark">
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/payment" element={<AddPayment/>} />
            <Route path="/student/creation" element={<StudentPage />} />
            <Route path="/student/course" element={<Course/>} />
            <Route path="/student/leaveform" element={<LeaveRequestForm />} />
            <Route path="/student/chat" element={<WhatsAppButton/>}/>
            <Route path="/student/leavestatus" element={<UserLeaveStatus/>}/>
            <Route path="/student/studentsattendance" element={<StudentsAttendance/>}/>
            <Route path="/student/coursedetails" element={<CourseDetails/>}/>
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
