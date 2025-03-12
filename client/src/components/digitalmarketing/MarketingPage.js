import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { DollarOutlined, RiseOutlined, BarChartOutlined, FundOutlined, UserAddOutlined, EyeOutlined } from '@ant-design/icons';

const MarketingPage = () => {
  return (
    <div>
      <h2>Marketing Dashboard</h2>
      {/* <p>Welcome to the Marketing page! Here are some key marketing metrics:</p> */}
      
      <Row gutter={16}>
        {/* Active Campaigns */}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Active Campaigns"
              value={8}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>

        {/* Total Leads */}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Leads"
              value={320}
              prefix={<UserAddOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        {/* Conversion Rate */}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Conversion Rate"
              value={12.5}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>

        {/* Ad Spend */}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Ad Spend"
              value={12000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
              suffix="USD"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        {/* ROI */}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Return on Investment (ROI)"
              value={15.8}
              suffix="%"
              prefix={<FundOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>

        {/* Engagement Rate */}
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Engagement Rate"
              value={8.2}
              suffix="%"
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MarketingPage;
