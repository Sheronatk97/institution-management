import React from "react";
import { Form, Input, Select, Button, message, DatePicker, InputNumber, Card } from "antd";

const { Option } = Select;

const BDMCreationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("BDM created successfully!");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",paddingTop:'100px' }}>
      <Card title="Create Business Development Manager" style={{ width: 500 }}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ role: "Business Development Manager", department: "business-development" }}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter the email" }, { type: "email", message: "Please enter a valid email" }]}>
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone number" }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Department" name="department">
            <Input disabled />
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

          <Form.Item label="Target Revenue (in USD)" name="targetRevenue" rules={[{ required: true, message: "Please enter target revenue" }]}>
            <InputNumber min={1000} placeholder="Enter target revenue" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Clients Handled" name="clients" rules={[{ required: true, message: "Please enter the number of clients handled" }]}>
            <InputNumber min={0} placeholder="Enter number of clients" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Salary (in USD)" name="salary" rules={[{ required: true, message: "Please enter salary" }]}>
            <InputNumber min={1000} placeholder="Enter salary" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Create BDM
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BDMCreationForm;
