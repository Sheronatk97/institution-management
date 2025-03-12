import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Typography, Row, Col, Card } from 'antd';
import { HomeOutlined, UserOutlined, AppstoreAddOutlined, TeamOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const Dashboard = ({ role }) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    const renderMenu = () => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Admin Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            User Management
                        </Menu.Item>
                        <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
                            Settings
                        </Menu.Item>
                    </>
                );
            case 'hr':
                return (
                    <>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            HR Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<TeamOutlined />}>
                            Employee Management
                        </Menu.Item>
                    </>
                );
            case 'digital marketing':
                return (
                    <>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Digital Marketing Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                            Campaign Management
                        </Menu.Item>
                    </>
                );
            case 'student':
                return (
                    <>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Student Dashboard
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            Course List
                        </Menu.Item>
                    </>
                );
            default:
                return <Menu.Item key="1" icon={<HomeOutlined />}>Dashboard</Menu.Item>;
        }
    };

    const renderContent = () => {
        switch (role) {
            case 'admin':
                return (
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="User Management" bordered={false}>
                                Admin can manage users here.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Settings" bordered={false}>
                                Admin can change system settings here.
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Reports" bordered={false}>
                                Admin can view reports here.
                            </Card>
                        </Col>
                    </Row>
                );
            case 'hr':
                return (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Employee Management" bordered={false}>
                                HR can manage employee records here.
                            </Card>
                        </Col>
                    </Row>
                );
            case 'digital marketing':
                return (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Campaign Management" bordered={false}>
                                Digital marketing team can manage campaigns here.
                            </Card>
                        </Col>
                    </Row>
                );
            case 'student':
                return (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Course List" bordered={false}>
                                Students can view and enroll in courses here.
                            </Card>
                        </Col>
                    </Row>
                );
            default:
                return <div>Welcome to the Dashboard</div>;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Dashboard</Menu.Item>
                </Menu>
            </Header>

            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {renderMenu()}
                    </Menu>
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
