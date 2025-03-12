import React from "react";
import { Form, Input, Select, Button, message, Row, Col, Card, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const SocialMediaAdForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Social Media Ad Created Successfully!");
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={24} sm={18} md={12} lg={10}>
        <Card title="Create Social Media Ad" bordered>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            
            <Form.Item
              label="Ad Title"
              name="title"
              rules={[{ required: true, message: "Please enter ad title" }]}
            >
              <Input placeholder="Enter ad title" />
            </Form.Item>

            <Form.Item
              label="Target Audience"
              name="audience"
              rules={[{ required: true, message: "Please define your audience" }]}
            >
              <Input placeholder="Enter target audience (e.g., age 18-35, tech enthusiasts)" />
            </Form.Item>

            <Form.Item
              label="Ad Type"
              name="adType"
              rules={[{ required: true, message: "Please select ad type" }]}
            >
              <Select placeholder="Select ad type">
                <Option value="image">Image Ad</Option>
                <Option value="video">Video Ad</Option>
                <Option value="carousel">Carousel Ad</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Platform"
              name="platform"
              rules={[{ required: true, message: "Please select platform" }]}
            >
              <Select placeholder="Select platform">
                <Option value="facebook">Facebook</Option>
                <Option value="instagram">Instagram</Option>
                <Option value="linkedin">LinkedIn</Option>
                <Option value="twitter">Twitter</Option>
                <Option value="tiktok">TikTok</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Budget (in USD)"
              name="budget"
              rules={[{ required: true, message: "Please enter budget" }]}
            >
              <Input type="number" placeholder="Enter budget" />
            </Form.Item>

            <Form.Item
              label="Ad Media (Image/Video)"
              name="media"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
            >
              <Upload beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Ad Media</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Ad
              </Button>
            </Form.Item>

          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SocialMediaAdForm;
