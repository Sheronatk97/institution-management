import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Popconfirm, notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const LeaveRequestPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all leave requests
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/auth/leave-requests");
        console.log(response.data);  // Log the leave requests data to check userId field
        setLeaveRequests(response.data);
      } catch (error) {
        notification.error({ message: "Failed to fetch leave requests" });
      } finally {
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);
  

  // Handle leave request status update (Approve/Reject)
  const handleLeaveRequestStatus = async (leaveRequestId, status) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/update-leave-status", {
        leaveRequestId,
        status,
      });
      notification.success({ message: response.data.message });
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === leaveRequestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      notification.error({ message: "Failed to update leave request status" });
    }
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "userId",
      render: (user) => user ? user.name : "Unknown",  // Handle null case
    },
    {
      title: "Course",
      dataIndex: "course",
    },
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Are you sure to approve this leave request?"
            onConfirm={() => handleLeaveRequestStatus(record._id, "Approved")}
          >
            <Button type="primary" icon={<CheckOutlined />} disabled={record.status !== "Pending"} />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to reject this leave request?"
            onConfirm={() => handleLeaveRequestStatus(record._id, "Rejected")}
          >
            <Button type="danger" icon={<CloseOutlined />} disabled={record.status !== "Pending"} style={{ marginLeft: 8 }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  
   

  return (
    <div style={{ padding: "20px" }}>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={leaveRequests}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default LeaveRequestPage;
