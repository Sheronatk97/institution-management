// import React from 'react';
// import { Card, Row, Col } from 'antd';

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <Row gutter={16}>
//         <Col span={6}>
//           <Card title="Total Users" bordered={false}>
//             120
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card title="Active Sessions" bordered={false}>
//             45
//           </Card>
//         </Col>
//         <Col span={6}>              
//           <Card title="Reports" bordered={false}>
//             10
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card title="Messages" bordered={false}>
//             5
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };





// import React from 'react';
// import { Routes, Route, Link,useNavigate } from 'react-router-dom';

// import {
//   HomeOutlined,
//   ProfileOutlined,
//   DollarCircleOutlined,
//   BookOutlined,
//   ReadOutlined,
//   SolutionOutlined,
//   ScheduleOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
// import { Layout, Menu, Card, Row, Col, Statistic, theme } from 'antd';
// import StudentPage from './StudentPage';

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

// const items = [
//   { path: '/', icon: <HomeOutlined />, label: 'Dashboard' },
//   { path: '/student/creation', icon: <ProfileOutlined />, label: 'Student Profile',onClick: () => navigate("/student/creation") },
//   { path: '/fee', icon: <DollarCircleOutlined />, label: 'Fee Details' },
//   { path: '/courses', icon: <BookOutlined />, label: 'Courses' },
//   { path: '/assignments', icon: <ReadOutlined />, label: 'Assignments' },
//   { path: '/exams', icon: <SolutionOutlined />, label: 'Exams' },
//   { path: '/timetable', icon: <ScheduleOutlined />, label: 'Time Table' },
//   { path: '/settings', icon: <SettingOutlined />, label: 'Settings' },
// ].map((item, index) => ({
//   key: String(index + 1),
//   icon: item.icon,
//   label: <Link to={item.path}>{item.label}</Link>,
// }));

// const Dashboard = () => (
  
//   <div style={{ padding: 24, textAlign: 'center' }}>
//     <h2>Student Dashboard</h2>
//     <Row gutter={16}>
//       <Col span={8}>
//         <Card bordered={false}>
//           <Statistic
//             title="Student Profile"
//             value={1}
//             prefix={<ProfileOutlined />}
//             valueStyle={{ color: '#3f8600' }}
//           />
//         </Card>
//       </Col>
//       <Col span={8}>
//         <Card bordered={false}>
//           <Statistic
//             title="Fee Paid"
//             value={7500}
//             prefix={<DollarCircleOutlined />}
//             valueStyle={{ color: '#1890ff' }}
//           />
//         </Card>
//       </Col>
//       <Col span={8}>
//         <Card bordered={false}>
//           <Statistic
//             title="Fee Due"
//             value={2500}
//             prefix={<DollarCircleOutlined />}
//             valueStyle={{ color: '#cf1322' }}
//           />
//         </Card>
//       </Col>
//     </Row>
//   </div>
// );

// const StudentDashboard = () => {

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout hasSider>
//       <Sider style={siderStyle} theme="dark">
//         <div className="demo-logo-vertical" />
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }} />
//         <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
//           <Routes>
//             {/* <Route path="/" element={<Dashboard />} /> */}
//             <Route path="/student/profile" element={<Dashboard />} />
//             <Route path="/student/creation" element={<StudentPage />} />
//           </Routes>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default StudentDashboard;




import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
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

  const items = [
    { path: '/', icon: <HomeOutlined />, label: 'Dashboard' },
    { path: '/student/creation', icon: <ProfileOutlined />, label: 'Student Profile', onClick: () => navigate('/student/creation') },
    { path: '/fee', icon: <DollarCircleOutlined />, label: 'Fee Details' },
    { path: '/student/course', icon: <BookOutlined />, label: 'Courses',onClick: () => navigate('/student/course') },
    { path: '/assignments', icon: <ReadOutlined />, label: 'Assignments' },
    { path: '/exams', icon: <SolutionOutlined />, label: 'Exams' },
    { path: '/timetable', icon: <ScheduleOutlined />, label: 'Time Table' },
    { path: '/settings', icon: <SettingOutlined />, label: 'Settings' },
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
            <Route path="/student/profile" element={<Dashboard />} />
            <Route path="/student/creation" element={<StudentPage />} />
            <Route path="/student/course" element={<Course/>} />
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
