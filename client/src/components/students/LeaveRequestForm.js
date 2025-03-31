import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message, Card, Row, Col } from "antd";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Importing jwt-decode to decode the token

const LeaveRequestForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const onFinish = async (values) => {
    // Get the logged-in user's ID by decoding the token from localStorage
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      message.error("User is not logged in.");
      return;
    }

    const decodedToken = jwtDecode(token); // Decode the token to get user information
    const userId = decodedToken.id; // Extract the userId from the decoded token

    // Prepare the leave request data
    const leaveData = {
      reason: values.reason,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };

    setLoading(true);

    try {
      // Sending the leave request to the backend API
      const response = await axios.post(
        "http://localhost:3000/api/auth/request-leave",  // Update with your actual backend API URL
        leaveData,
        {
          headers: {
            id: userId, // Send userId in the headers
          },
        }
      );

      message.success(response.data.message); // Display success message
      form.resetFields(); // Reset the form after successful submission
    } catch (error) {
      message.error("Failed to submit leave request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "70px 20px", backgroundColor: "#f7f7f7" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            title="Request Leave"
            bordered={false}
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                reason: "",
                startDate: null,
                endDate: null,
              }}
            >
              <Form.Item
                label="Reason"
                name="reason"
                rules={[{ required: true, message: "Please input your reason!" }]}
              >
                <Input.TextArea
                  placeholder="Please describe the reason for your leave"
                  rows={4}
                  style={{ borderRadius: "8px", border: "1px solid #ddd", padding: "8px" }}
                />
              </Form.Item>

              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: "Please select start date!" }]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%", borderRadius: "8px", border: "1px solid #ddd", padding: "8px" }}
                />
              </Form.Item>

              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select end date!" }]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%", borderRadius: "8px", border: "1px solid #ddd", padding: "8px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{
                    backgroundColor: "#1890ff",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "16px",
                  }}
                >
                  Submit Leave Request
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LeaveRequestForm;
