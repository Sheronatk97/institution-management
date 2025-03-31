import React, { useEffect, useState } from "react";
import { Table, notification } from "antd";
import axios from "axios";
import Navbar from "./Navbar";

const StudentManagementPage = () => {
  const [students, setStudents] = useState([]); // State to store student data
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/students/getAllStudents");
        setStudents(response.data); // Store the student data in state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setLoading(false);
        console.error("Error fetching students:", error);
        notification.error({ message: "Failed to fetch student data" }); // Show error notification
      }
    };

    fetchStudents(); // Call the fetch function
  }, []);

  // Columns for the Ant Design Table
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Course", dataIndex: "course", key: "course" },
    {
      title: "Address",
      key: "address",
      render: (text, record) => (
        <span>
          {record.address ? `${record.address.street}, ${record.address.city}, ${record.address.state}, ${record.address.zip}, ${record.address.country}` : "No address available"}
        </span>
      ),
    },
    {
      title: "Profile Photo",
      key: "profilePhoto",
      render: (text, record) => (
        <img
          src={record.profilePhoto || "https://via.placeholder.com/150"}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    { title: "Age", dataIndex: "age", key: "age" },
  ];

  return (
    <div>
      <Navbar/>
      <h2>Student Management</h2>
      <Table
        loading={loading}
        dataSource={students}
        columns={columns}
        rowKey="_id" // Make sure to use unique key (typically _id)
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default StudentManagementPage;
