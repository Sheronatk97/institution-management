// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, notification, Row, Col } from "antd";

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

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

//   const handleEnroll = (courseId) => {
//     // Handle the enrollment logic here
//     notification.success({ message: `You have enrolled in course ${courseId}` });
//   };

//   return (
//     <div style={{ padding: "80px" }}>
//       <Row gutter={16}>
//         {courses.map((course) => (
//           <Col span={8} key={course._id}>
//             <Card
//               title={course.name}
//               bordered={false}
//               style={{ width: 300, marginBottom: 16 }}
//             >
//               <p><strong>Description:</strong> {course.description}</p>
//               <p><strong>Duration:</strong> {course.duration}</p>
//               <p><strong>Fee:</strong> ${course.fee}</p>
//               <Button
//                 type="primary"
//                 onClick={() => handleEnroll(course._id)}
//                 block
//               >
//                 Add
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Course;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, notification, Row, Col } from "antd";

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Mock userId for testing; you should replace this with your actual user data from authentication
//   const userId = "USER_ID_HERE"; // Get the logged-in user's ID from your auth system

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

//   const handleEnroll = async (courseId) => {
//     if (!userId) {
//       return notification.error({ message: "User ID is missing!" });
//     }

//     try {
//       // Enroll the user in the course
//       const response = await axios.post("http://localhost:3000/api/enrollment/enroll", {
//         userId, // Pass the userId
//         courseId,
//       });

//       if (response.data) {
//         notification.success({ message: `Successfully enrolled in course` });
//       }
//     } catch (error) {
//       notification.error({ message: "Failed to enroll in course" });
//     }
//   };

//   return (
//     <div style={{ padding: "80px" }}>
//       <Row gutter={16}>
//         {courses.map((course) => (
//           <Col span={8} key={course._id}>
//             <Card
//               title={course.name}
//               bordered={false}
//               style={{ width: 300, marginBottom: 16 }}
//             >
//               <p><strong>Description:</strong> {course.description}</p>
//               <p><strong>Duration:</strong> {course.duration}</p>
//               <p><strong>Fee:</strong> ${course.fee}</p>
//               <Button
//                 type="primary"
//                 onClick={() => handleEnroll(course._id)}
//                 block
//               >
//                 Add
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Course;







import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, notification, Row, Col } from "antd";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userId, setUserId] = useState("67c2fe88698547493f01db41"); // Replace with actual user ID from your authentication system

  // Fetch courses from the backend
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEnrollments(userId);
    }
  }, [userId]);

  // Fetch all courses
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

  // Fetch user's enrollments
  const fetchEnrollments = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/enrollment/user/${userId}`);
      setEnrolledCourses(response.data);  // Store enrolled courses in state
    } catch (error) {
      notification.error({ message: "Failed to fetch enrollments" });
    }
  };

  // Handle enrollment in a course
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
      <h2>Available Courses</h2>
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
                Enroll
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Show user's enrolled courses */}
      <h2>Your Enrolled Courses</h2>
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
          <p>No courses enrolled yet.</p>
        )}
      </Row>
    </div>
  );
};

export default Course;
