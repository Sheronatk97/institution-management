
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Spin, Alert, Divider, Button, Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const [form] = Form.useForm(); // Form instance for managing form data

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please login");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3000/api/auth/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserProfile(response.data);
        // Pre-fill the form with the user profile data
        form.setFieldsValue(response.data);
      } catch (err) {
        setError("Error fetching user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [form]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.setFieldsValue(userProfile); // Reset the form to initial values
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Only send password if it's filled
      const profileData = {
        ...values,
        password: values.password || undefined, // Only send password if it's provided
      };

      const response = await axios.put(
        `http://localhost:3000/api/auth/profileupdate/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserProfile(response.data);
      setIsEditing(false); // Switch back to view mode after successful update
    } catch (err) {
      setError("Error updating user profile");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", paddingTop: "90px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert message={error} type="error" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert message="No user profile data available" type="warning" />
      </div>
    );
  }

  return (
    <div style={{ padding: "80px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card
        title={<Title level={2}>User Profile</Title>}
        bordered={false}
        style={{ width: "100%", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
      >
        {isEditing ? (
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={userProfile}
          >
            {/* Form Fields */}
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Phone" name="phone">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Gender" name="gender">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Qualification" name="qualification">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Date of Birth" name="dob">
                  <Input />
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={12} md={8}>
                <Form.Item label="Course" name="course.name">
                  <Input />
                </Form.Item>
              </Col> */}
              {/* <Col xs={24} sm={12} md={8}>
                <Form.Item label="Consultant" name="consultant">
                  <Input />
                </Form.Item>
              </Col> */}
              {/* <Col xs={24} sm={12} md={8}>
                <Form.Item label="ID Proof" name="idProof">
                  <Input />
                </Form.Item>
              </Col> */}
              {/* Password Field */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item label="Password" name="password">
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                  Save Changes
                </Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <div>
            <Row gutter={[24, 16]}>
              {/* {userProfile.image && (
                <Col xs={24} sm={12} md={8}>
                  <Text strong>Profile Image:</Text>
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <img
                      src={userProfile.image} // Full path for the profile image
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Col>
              )} */}
              <Col xs={24} sm={12} md={8}>
                <Text strong>Name:</Text>
                <div>{userProfile.name || "N/A"}</div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Email:</Text>
                <div>{userProfile.email || "N/A"}</div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Phone:</Text>
                <div>{userProfile.phone || "N/A"}</div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Address:</Text>
                <div>{userProfile.address || "N/A"}</div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Gender:</Text>
                <div>{userProfile.gender || "N/A"}</div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Qualification:</Text>
                <div>{userProfile.qualification || "N/A"}</div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Date of Birth:</Text>
                <div>{userProfile.dob || "N/A"}</div>
              </Col>
              {userProfile.course && userProfile.course.name && (
                <Col xs={24} sm={12} md={8}>
                  <Text strong>Course:</Text>
                  <div>{userProfile.course.name || "N/A"}</div>
                </Col>
              )}
              {/* {userProfile.consultant && userProfile.consultant.name && (
                <Col xs={24} sm={12} md={8}>
                  <Text strong>Consultant:</Text>
                  <div>{userProfile.consultant.name || "N/A"}</div>
                </Col>
              )} */}
              {/* Password: Don't display it, just show a note */}
              <Col xs={24} sm={12} md={8}>
                <Text strong>Password:</Text>
                <div>{userProfile.password ? "Set" : "Not Set"}</div>
              </Col>
            </Row>

            <Divider />
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">Last updated: {new Date().toLocaleDateString()}</Text>
            </div>
            <Button onClick={handleEditClick} style={{ marginTop: "20px" }} type="primary">
              Edit Profile
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
