// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Input, notification, Popconfirm } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editCourse, setEditCourse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch courses from backend
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/courses");
//       setCourses(response.data);
//     } catch (error) {
//       notification.error({ message: "Failed to fetch courses" });
//     }
//   };

//   const showModal = (course = null) => {
//     setEditCourse(course);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setEditCourse(null);
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       if (editCourse) {
//         await axios.put(`http://localhost:3000/api/courses/${editCourse._id}`, values);
//         notification.success({ message: "Course updated successfully" });
//       } else {
//         await axios.post("http://localhost:3000/api/courses", values);
//         notification.success({ message: "Course created successfully" });
//       }
//       fetchCourses();
//       setIsModalVisible(false);
//     } catch (error) {
//       notification.error({ message: "Operation failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/courses/${id}`);
//       notification.success({ message: "Course deleted successfully" });
//       fetchCourses();
//     } catch (error) {
//       notification.error({ message: "Failed to delete course" });
//     }
//   };

//   const columns = [
//     {
//       title: "Course ID",
//       dataIndex: "cou_id",
//       key: "cou_id",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "BDM",
//       dataIndex: "BDM_id",
//       key: "BDM_id",
//       render: (BDM) => BDM ? BDM.name : 'N/A',  // Assuming BDM has a name field
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => showModal(record)}
//             style={{ marginRight: 8 }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete?"
//             onConfirm={() => handleDelete(record._id)}
//           >
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "70px" }}>
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => showModal()}
//         style={{ marginBottom: 16 }}
//       >
//         Add Course
//       </Button>
//       <Table
//         dataSource={courses}
//         columns={columns}
//         rowKey="_id"
//         loading={loading}
//       />
//       <Modal
//         title={editCourse ? "Edit Course" : "Add Course"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           initialValues={editCourse}
//           onFinish={handleSubmit}
//           layout="vertical"
//         >
//           <Form.Item
//             name="cou_id"
//             label="Course ID"
//             rules={[{ required: true, message: "Please input the course ID!" }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item
//             name="name"
//             label="Course Name"
//             rules={[{ required: true, message: "Please input the course name!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: "Please input the course description!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="BDM_id"
//             label="Business Development Manager"
//             rules={[{ required: true, message: "Please select the BDM!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               block
//             >
//               {editCourse ? "Update" : "Create"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CoursePage;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Input, Select, notification, Popconfirm } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [bdms, setBdms] = useState([]); // For storing list of Business Development Managers
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editCourse, setEditCourse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch courses and BDMS
//   useEffect(() => {
//     fetchCourses();
//     fetchBDMs();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/courses/get");
//       setCourses(response.data);
//     } catch (error) {
//       notification.error({ message: "Failed to fetch courses" });
//     }
//   };

//   const fetchBDMs = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/bdm/get");  // Assuming there is an endpoint for BDMS
//       setBdms(response.data);
//     } catch (error) {
//       notification.error({ message: "Failed to fetch Business Development Managers" });
//     }
//   };

//   const showModal = (course = null) => {
//     setEditCourse(course);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setEditCourse(null);
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       if (editCourse) {
//         await axios.put(`http://localhost:3000/api/courses/update/${editCourse._id}`, values);
//         notification.success({ message: "Course updated successfully" });
//       } else {
//         await axios.post("http://localhost:3000/api/courses/create", values);
//         notification.success({ message: "Course created successfully" });
//       }
//       fetchCourses();
//       setIsModalVisible(false);
//     } catch (error) {
//       notification.error({ message: "Operation failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/courses/delete/${id}`);
//       notification.success({ message: "Course deleted successfully" });
//       fetchCourses();
//     } catch (error) {
//       notification.error({ message: "Failed to delete course" });
//     }
//   };

//   const columns = [
//     {
//       title: "Course Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "BDM",
//       dataIndex: "BDM_id",
//       key: "BDM_id",
//       render: (BDM) => BDM ? BDM.name : 'N/A',  // Assuming BDM has a name field
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => showModal(record)}
//             style={{ marginRight: 8 }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete?"
//             onConfirm={() => handleDelete(record._id)}
//           >
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "70px" }}>
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => showModal()}
//         style={{ marginBottom: 16 }}
//       >
//         Add Course
//       </Button>
//       <Table
//         dataSource={courses}
//         columns={columns}
//         rowKey="_id"
//         loading={loading}
//       />
//       <Modal
//         title={editCourse ? "Edit Course" : "Add Course"}
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           initialValues={editCourse}
//           onFinish={handleSubmit}
//           layout="vertical"
//         >
//           <Form.Item
//             name="name"
//             label="Course Name"
//             rules={[{ required: true, message: "Please input the course name!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: "Please input the course description!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="BDM_id"
//             label="Business Development Manager"
//             rules={[{ required: true, message: "Please select the BDM!" }]}
//           >
//             <Select>
//               {bdms.map((bdm) => (
//                 <Select.Option key={bdm._id} value={bdm._id}>
//                   {bdm.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               block
//             >
//               {editCourse ? "Update" : "Create"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CoursePage;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form, Input, Select, notification, Popconfirm } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [bdms, setBdms] = useState([]); // For storing list of Business Development Managers
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editCourse, setEditCourse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch courses and BDMS
//   useEffect(() => {
//     fetchCourses();
//     fetchBDMs();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/courses/get");
//       setCourses(response.data);
//     } catch (error) {
//       notification.error({ message: "Failed to fetch courses" });
//     }
//   };

//   const fetchBDMs = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/bdm/get");  // Assuming there is an endpoint for BDMS
//       setBdms(response.data);
//     } catch (error) {
//       notification.error({ message: "Failed to fetch Business Development Managers" });
//     }
//   };

//   const showModal = (course = null) => {
//     setEditCourse(course);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setEditCourse(null);
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       if (editCourse) {
//         await axios.put(`http://localhost:3000/api/courses/update/${editCourse._id}`, values);
//         notification.success({ message: "Course updated successfully" });
//       } else {
//         await axios.post("http://localhost:3000/api/courses/create", values);
//         notification.success({ message: "Course created successfully" });
//       }
//       fetchCourses();
//       setIsModalVisible(false);
//     } catch (error) {
//       notification.error({ message: "Operation failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/courses/delete/${id}`);
//       notification.success({ message: "Course deleted successfully" });
//       fetchCourses();
//     } catch (error) {
//       notification.error({ message: "Failed to delete course" });
//     }
//   };

//   const columns = [
//     {
//       title: "Course Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "BDM",
//       dataIndex: "BDM_id",
//       key: "BDM_id",
//       render: (BDM) => BDM ? BDM.name : 'N/A',  // Assuming BDM has a name field
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => showModal(record)}
//             style={{ marginRight: 8 }}
//           />
//           <Popconfirm
//             title="Are you sure you want to delete?"
//             onConfirm={() => handleDelete(record._id)}
//           >
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "70px" }}>
//       <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: 16 }}>
//         Add Course
//       </Button>
//       <Table dataSource={courses} columns={columns} rowKey="_id" loading={loading} />
//       <Modal title={editCourse ? "Edit Course" : "Add Course"} open={isModalVisible} onCancel={handleCancel} footer={null}>
//         <Form initialValues={editCourse} onFinish={handleSubmit} layout="vertical">
//           <Form.Item name="name" label="Course Name" rules={[{ required: true, message: "Please enter course name!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter description!" }]}>
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item name="duration" label="Duration" rules={[{ required: true, message: "Please enter duration!" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="fee" label="Fee" rules={[{ required: true, message: "Please enter fee!" }]}>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} block>
//               {editCourse ? "Update" : "Create"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, notification, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/courses/get");
      setCourses(response.data);
    } catch (error) {
      notification.error({ message: "Failed to fetch courses" });
    }
  };

  const showModal = (course = null) => {
    setEditCourse(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditCourse(null);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editCourse) {
        await axios.put(`http://localhost:3000/api/courses/update/${editCourse._id}`, values);
        notification.success({ message: "Course updated successfully" });
      } else {
        await axios.post("http://localhost:3000/api/courses/create", values);
        notification.success({ message: "Course created successfully" });
      }
      fetchCourses();
      setIsModalVisible(false);
      setEditCourse(null);
    } catch (error) {
      notification.error({ message: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/courses/delete/${id}`);
      notification.success({ message: "Course deleted successfully" });
      fetchCourses();
    } catch (error) {
      notification.error({ message: "Failed to delete course" });
    }
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (fee) => `$${fee}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} style={{ marginRight: 8 }} />
          <Popconfirm
            title="Are you sure you want to delete this course?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "70px" }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Course
      </Button>
      <Table dataSource={courses} columns={columns} rowKey="_id" loading={loading} />
      <Modal title={editCourse ? "Edit Course" : "Add Course"} open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form initialValues={editCourse} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Course Name" rules={[{ required: true, message: "Please enter course name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter description!" }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true, message: "Please enter duration!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fee" label="Fee" rules={[{ required: true, message: "Please enter fee!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {editCourse ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoursePage;
