// // import React from 'react';
// // import { Card, Row, Col } from 'antd';

// // const AdminDashboard = () => {
// //   return (
// //     <div>
// //       <h2>Admin Dashboard</h2>
// //       <Row gutter={16}>
// //         <Col span={6}>
// //           <Card title="Total Users" bordered={false}>
// //             120
// //           </Card>
// //         </Col>
// //         <Col span={6}>
// //           <Card title="Active Sessions" bordered={false}>
// //             45
// //           </Card>
// //         </Col>
// //         <Col span={6}>
// //           <Card title="Reports" bordered={false}>
// //             10
// //           </Card>
// //         </Col>
// //         <Col span={6}>
// //           <Card title="Messages" bordered={false}>
// //             5
// //           </Card>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

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

// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
//   MessageOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

// const HRDashboard = () => {
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
//           Ant Design © {new Date().getFullYear()} Cr ` eated by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default HRDashboard;






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
//   BranchesOutlined,  // Add icons if necessary
//   TeamOutlined as TeamIcon, // you might need other icons for custom categories
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
//   paddingTop: '60px'                                       
// };

// // Update items with new sections like HR, Digital Marketing, etc.
// const items = [
//   { key: '1', icon: <UserOutlined />, label: 'Team Lead' },
//   { key: '2', icon: <VideoCameraOutlined />, label: 'Digital Marketing' },
//   { key: '4', icon: <BarChartOutlined />, label: 'BDM' },
//   { key: '3', icon: <UploadOutlined />, label: 'Students' },

//   // { key: '5', icon: <CloudOutlined />, label: '' },
//   // { key: '6', icon: <AppstoreOutlined />, label: 'Trainers' },  // You can keep adding as necessary
//   // { key: '7', icon: <TeamOutlined />, label: 'Another Section' },
//   // { key: '8', icon: <ShopOutlined />, label: 'Shop' },
//   // { key: '9', icon: <MessageOutlined />, label: 'Messages' },
// ].map(({ icon, label, key }) => ({
//   key,
//   icon,
//   label,
// }));

// const HRDashboard = () => {
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
//             <h2>HR Dashboard</h2>
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

// export default HRDashboard;


import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic, theme } from "antd";
import { UserOutlined, VideoCameraOutlined, BarChartOutlined, MessageOutlined, LogoutOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TeamLeadCreationForm from "./TeamLeadCreate";
import BDMCreationForm from "./BDMCreationForm";
import DigitalMarketingTeamForm from "./DigitalMarketingCreate";
import AccountantManagement from "./AccountantManagement";

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

const HRDashboard = () => {
  const navigate = useNavigate(); // Navigation Hook
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const items = [
    { key: "1", icon: <UserOutlined />, label: "Team Lead", onClick: () => navigate("/hr/team-lead") },
    { key: "2", icon: <BarChartOutlined />, label: "BDM", onClick: () => navigate("/hr/bdm") },
    { key: "3", icon: <VideoCameraOutlined />, label: "Digital Marketing", onClick: () => navigate("/hr/digital-marketing") },
    { key: "4", icon: <UserOutlined />, label: "Accountant", onClick: () => navigate("/hr/accountant") },
    { key: "5", icon: <MessageOutlined />, label: "Students", onClick: () => navigate("/hr/students") },
    { key: "6", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
  ].map(({ icon, label, key, onClick }) => ({
    key,
    icon,
    label,
    onClick,
  }));

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, textAlign: "center", background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Routes>
              <Route path="/" element={
                <>
                  <h2>HR Dashboard</h2>
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
              } />
              <Route path="/hr/team-lead" element={<TeamLeadCreationForm />} />
              <Route path="/hr/bdm" element={<BDMCreationForm />} />
              <Route path="/hr/digital-marketing" element={<DigitalMarketingTeamForm />} />
              <Route path="/hr/accountant" element={<AccountantManagement />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default HRDashboard;
