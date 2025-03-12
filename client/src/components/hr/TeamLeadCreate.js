import React from "react";
import { Form, Input, Select, Button, message, DatePicker, InputNumber, Card } from "antd";

const { Option } = Select;

const TeamLeadCreationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Team Lead created successfully!");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",paddingTop:"60px" }}>
      <Card title="Create Team Lead" style={{ width: 500 }}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ role: "Team Lead" }}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter the email" }, { type: "email", message: "Please enter a valid email" }]}>
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone number" }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Department" name="department" rules={[{ required: true, message: "Please select a department" }]}>
            <Select placeholder="Select department">
              <Option value="engineering">Engineering</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="sales">Sales</Option>
              <Option value="hr">Human Resources</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Experience (Years)" name="experience" rules={[{ required: true, message: "Please enter experience" }]}>
            <InputNumber min={0} max={50} placeholder="Enter years of experience" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Key Skills" name="skills" rules={[{ required: true, message: "Please enter key skills" }]}>
            <Input placeholder="Enter skills (comma separated)" />
          </Form.Item>

          <Form.Item label="Joining Date" name="joiningDate" rules={[{ required: true, message: "Please select a joining date" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Salary (in USD)" name="salary" rules={[{ required: true, message: "Please enter salary" }]}>
            <InputNumber min={1000} placeholder="Enter salary" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Create Team Lead
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TeamLeadCreationForm;
