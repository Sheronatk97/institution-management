// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, notification, Popconfirm } from 'antd';
// import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// const CourseEnrollmentPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState('someUserId'); // Replace with the actual user ID
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentEnrollment, setCurrentEnrollment] = useState(null);

//   // Fetch courses and enrollments
//   useEffect(() => {
//     fetchCourses();
//     fetchEnrollments();
//   }, []);

//   // Fetch all courses
//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/courses/get');
//       setCourses(response.data);
//     } catch (error) {
//       notification.error({ message: 'Failed to fetch courses' });
//     }
//   };

//   // Fetch all enrollments
//   const fetchEnrollments = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/courses/enrollments');
//       setEnrollments(response.data);
//     } catch (error) {
//       notification.error({ message: 'Failed to fetch enrollments' });
//     }
//   };

//   // Handle enrollment request
//   const handleEnroll = async (courseId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/api/courses/enroll', { userId, courseId });
//       notification.success({
//         message: 'Successfully enrolled in the course',
//       });
//       fetchEnrollments(); // Refresh enrollments list
//     } catch (error) {
//       notification.error({
//         message: 'Enrollment failed',
//         description: error.response?.data?.message || 'Something went wrong',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle updating enrollment status
//   const handleUpdateStatus = async (enrollmentId, status) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`http://localhost:3000/api/courses/enrollment/${enrollmentId}`, {
//         status,
//       });
//       notification.success({
//         message: `Enrollment ${status}`,
//       });
//       fetchEnrollments(); // Refresh enrollments list
//     } catch (error) {
//       notification.error({
//         message: 'Failed to update enrollment status',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete enrollment
//   const handleDeleteEnrollment = async (enrollmentId) => {
//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:3000/api/courses/enrollment/${enrollmentId}`);
//       notification.success({
//         message: 'Enrollment deleted',
//       });
//       fetchEnrollments(); // Refresh enrollments list
//     } catch (error) {
//       notification.error({
//         message: 'Failed to delete enrollment',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const courseColumns = [
//     {
//       title: 'Course Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Duration',
//       dataIndex: 'duration',
//       key: 'duration',
//     },
//     {
//       title: 'Fee',
//       dataIndex: 'fee',
//       key: 'fee',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <Button
//           type="primary"
//           onClick={() => handleEnroll(record._id)}
//           loading={loading}
//         >
//           Enroll
//         </Button>
//       ),
//     },
//   ];

//   const enrollmentColumns = [
//     {
//       title: 'Course Name',
//       dataIndex: 'courseId',
//       key: 'courseId',
//       render: (text) => text?.name,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <>
//           <Popconfirm
//             title="Are you sure you want to accept this enrollment?"
//             onConfirm={() => handleUpdateStatus(record._id, 'Accepted')}
//           >
//             <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 8 }}>
//               Accept
//             </Button>
//           </Popconfirm>
//           <Popconfirm
//             title="Are you sure you want to reject this enrollment?"
//             onConfirm={() => handleUpdateStatus(record._id, 'Rejected')}
//           >
//             <Button type="danger" icon={<DeleteOutlined />}>
//               Reject
//             </Button>
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Courses</h1>
//       <Table
//         dataSource={courses}
//         columns={courseColumns}
//         rowKey="_id"
//         loading={loading}
//         pagination={false}
//         style={{ marginBottom: '20px' }}
//       />
//       <h1>Your Enrollments</h1>
//       <Table
//         dataSource={enrollments}
//         columns={enrollmentColumns}
//         rowKey="_id"
//         loading={loading}
//         pagination={false}
//         style={{ marginBottom: '20px' }}
//       />
//     </div>
//   );
// };

// export default CourseEnrollmentPage;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, notification, Row, Col } from "antd";

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Mock userId for testing, replace it with the actual userId from your auth system
//   const userId = "USER_ID_HERE"; // Get the logged-in user's ID from your authentication system

//   // Fetch courses from the backend
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:3000/api/courses/get");
//       setCourses(response.data);
//     } catch (error) {
//       notification.error({ message: "Failed to fetch courses" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle course enrollment
//   const handleEnroll = async (courseId) => {
//     if (!userId) {
//       return notification.error({ message: "User ID is missing!" });
//     }

//     console.log("Sending enrollment request for:", { userId, courseId });

//     try {
//       // Send enrollment request to the backend
//       const response = await axios.post("http://localhost:3000/api/enrollment/enroll", {
//         userId, // Current user's ID
//         courseId, // The selected course ID
//       });

//       console.log("Response from server:", response.data);

//       // Show success notification
//       if (response.data) {
//         notification.success({ message: `Successfully enrolled in course ${courseId}` });
//       }
//     } catch (error) {
//       console.error("Error during enrollment:", error);
//       notification.error({ message: "Failed to enroll in course" });
//     }
//   };

//   return (
//     <div style={{ padding: "80px" }}>
//       {/* Loading spinner while fetching courses */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <Row gutter={16}>
//           {courses.map((course) => (
//             <Col span={8} key={course._id}>
//               <Card
//                 title={course.name}
//                 bordered={false}
//                 style={{ width: 300, marginBottom: 16 }}
//               >
//                 <p><strong>Description:</strong> {course.description}</p>
//                 <p><strong>Duration:</strong> {course.duration}</p>
//                 <p><strong>Fee:</strong> ${course.fee}</p>
//                 <Button
//                   type="primary"
//                   onClick={() => handleEnroll(course._id)}
//                   block
//                 >
//                   Add
//                 </Button>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default Course;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, notification, Row, Col } from "antd";

const CourseEnrollmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userId, setUserId] = useState("67c2fe88698547493f01db41"); // Replace with actual user ID from your authentication system

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
    fetchEnrollments(userId);
  }, [userId]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/courses/get");
      setCourses(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch courses" });
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/enrollment/user/${userId}`);
      setEnrolledCourses(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch enrollments" });
    }
  };

  const handleEnroll = async (courseId) => {
    if (!userId) {
      return notification.error({ message: "User ID is missing!" });
    }

    try {
      // Enroll the user in the course
      const response = await axios.post("http://localhost:3000/api/enrollment/enroll", {
        userId, // Pass the userId
        courseId,
      });

      if (response.data) {
        notification.success({ message: `Successfully enrolled in course` });
        fetchEnrollments(userId); // Refresh the enrollments after successful enrollment
      }
    } catch (error) {
      notification.error({ message: "Failed to enroll in course" });
    }
  };

  return (
    <div style={{ padding: "80px" }}>
      <h2>Enrolled Courses</h2>
      <Row gutter={16}>
        {courses.map((course) => (
          <Col span={8} key={course._id}>
            <Card
              title={course.name}
              bordered={false}
              style={{ width: 300, marginBottom: 16 }}
            >
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Fee:</strong> ${course.fee}</p>
              <Button
                type="primary"
                onClick={() => handleEnroll(course._id)}
                block
              >
                Enrolled
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Show user's enrolled courses */}
      {/* <h2>Your Enrolled Courses</h2> */}
      <Row gutter={16}>
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((enrollment) => (
            <Col span={8} key={enrollment._id}>
              <Card
                title={enrollment.courseId.name}
                bordered={false}
                style={{ width: 300, marginBottom: 16 }}
              >
                <p><strong>Status:</strong> {enrollment.status}</p>
                <p><strong>Duration:</strong> {enrollment.courseId.duration}</p>
                <p><strong>Fee:</strong> ${enrollment.courseId.fee}</p>
              </Card>
            </Col>
          ))
        ) : (
          <p></p>
        )}
      </Row>
    </div>
  );
};

export default CourseEnrollmentPage;












