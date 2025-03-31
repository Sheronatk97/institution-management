
import { useState, useEffect } from "react";
import { Form, Input, Radio, Select, Upload, Button, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "antd/dist/reset.css";
import { jwtDecode } from 'jwt-decode';
import moment from "moment"; // Import moment to handle date formatting

import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const { Option } = Select;

function Register() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [bdms, setBDMs] = useState([]); // Stores BDMs
    const [courses, setCourses] = useState([]); // Stores courses for selected BDM
    const [token, setToken] = useState('');
    const navigate=useNavigate()    // Fetch all BDMs on page load
    useEffect(() => {
        fetchBdms();  // Fetch the BDMs on page load
        handleBDMChange();  // Fetch the courses on page load
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        setToken(decodedToken.id); // Assuming the token has an 'id' field
    }, []);

    // Function to fetch BDMs
    const fetchBdms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/bdm/getallbdm");
            setBDMs(response.data); // Set BDMs to state
        } catch (error) {
            console.error("Error fetching BDMs", error);
        }
    };

    // Fetch courses when a BDM is selected
    const handleBDMChange = async (bdmId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/courses/get`);
            setCourses(response.data); // Set courses for the selected BDM
            form.setFieldsValue({ course: null });
           
             // Reset selected course
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    const handleFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();
    
        // Add fields to FormData
        Object.keys(values).forEach(key => {
            if (key === "idProof") {
                const file = values.idProof && values.idProof.fileList[0]; // Get the uploaded file
                if (file) {
                    formData.append(key, file.originFileObj); // Append the file to FormData
                }
            } else if (key === "dob") {
                // Ensure that dob is in the right format and is added to FormData
                formData.append(key, values[key].format("YYYY-MM-DD"));
            } else {
                // Append regular fields to FormData
                formData.append(key, values[key]);
            }
        });
    
        // Log each key-value pair in the FormData for debugging purposes
        for (let [key, value] of formData.entries()) {
            console.log(key, value); // Logging each form data key and value
        }
    
        // Log the entire formData object (FormData object doesn't have a direct way to print, but logging the entries is helpful)
        console.log("FormData Entries:", [...formData.entries()]);
    
        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // You can add additional headers here, like the Authorization token if necessary
                },
            });
            
            // Show success notification using Toastify
            toast.success("Registration successful!");
            navigate("/login")
            message.success(res.data.message);
            form.resetFields(); // Reset the form
        } catch (error) {
            message.error("Error registering student");
            console.error("Error registering student:", error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toast container to display the toasts */}
            <ToastContainer />

            <br />
            <br />
            <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
                <h2 style={{ textAlign: "center" }}>Student Registration</h2>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please enter your phone number" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter your address" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender">
                        <Radio.Group>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="qualification" label="Qualification" rules={[{ required: true, message: "Please enter your qualification" }]}>
                        <Input />
                    </Form.Item>

                    {/* BDM Selection */}
                    {/* <Form.Item name="bdm" label="BDM" rules={[{ required: true, message: "Please select a BDM" }]}>
                        <Select placeholder="Select BDM" onChange={handleBDMChange}>
                            {bdms.map(bdm => (
                                <Option key={bdm._id} value={bdm._id}>{bdm.name}</Option>
                            ))}
                        </Select>
                    </Form.Item> */}

                    {/* Course Selection */}
                    <Form.Item name="course" label="Course" rules={[{ required: true, message: "Please select a course" }]}>
                        <Select placeholder="Select Course" disabled={!courses.length}>
                            {courses.map(course => (
                                <Option key={course._id} value={course._id}>{course.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Date of Birth */}
                    <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: "Please select your date of birth" }]}>
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter a password" }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="idProof" label="ID Proof with photo">
                        <Upload beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Register;
