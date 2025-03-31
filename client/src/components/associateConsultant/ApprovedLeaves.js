import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, notification } from "antd";

const ApprovedLeaves = () => {
  const [approvedLeaveRequests, setApprovedLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApprovedLeaveRequests();
  }, []);

  // Fetch approved leave requests from the backend
  const fetchApprovedLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/auth/approved-leave-requests");
      setApprovedLeaveRequests(response.data);  // Set approved leave requests
    } catch (error) {
      notification.error({ message: "Failed to fetch approved leave requests" });
    } finally {
      setLoading(false);
    }
  };

  // Table columns for displaying leave requests
  const columns = [
    {
      title: "Student Name",
      dataIndex: "userId",
      render: (user) => (user ? user.name : "Unknown"),
    },
    // {
    //   title: "Course",
    //   dataIndex: "userId",
    //   render: (user) => (user ? user.course : "Unknown"),
    // },
    // {
    //   title: "Course Name",
    //   dataIndex: "name",
    //   render: (user) => (user ? user.name : "Unknown"),
    // },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate) => new Date(startDate).toLocaleString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => new Date(endDate).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Approved Leave Requests - Associate Consultant</h2>
      <Table
        dataSource={approvedLeaveRequests}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ApprovedLeaves;
