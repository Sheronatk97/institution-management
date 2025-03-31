

// import React, { useEffect, useState } from 'react';
// //import { Table, Space, Spin, message, Select } from 'antd';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// //const { Option } = Select;

// const StudentsAssign = () => {
//   const [consultants, setConsultants] = useState([]);
//   const [newconsultants,setNewConsultants]=useState([]);
//   const [student,setStudents]=useState([]);
//   const [loading, setLoading] = useState(false);
//   const token=jwtDecode(localStorage.getItem("token"))
//   console.log(token)
//   useEffect(() => {
//     const fetchConsultants = async () => {
//       setLoading(true);
//       try {
//         // const response = await axios.get(`http://localhost:3000/api/consultants/consultantsforstudents`,{'headers':{'id':token.id}});
//         // console.log("response",response.data)
//         // setConsultants(response.data);
//         await axios.get(`http://localhost:3000/api/consultants/consultantsforstudents`,{'headers':{'id':token.id}})
//         .then((res)=>{
//              console.log(res.data.result)
//               setNewConsultants(res.data.result)
//               setStudents(res.data.students)
//               console.log(res.data.students)
//         })
//         .catch(err=>console.log(err))

//       } catch (error) {
//         //message.error('Failed to fetch consultants.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConsultants();
//   }, []);

//   const handleStudentAssign = (value, studentId, consultantId) => {
//     console.log(`Assign student ${studentId} to consultant ${consultantId} with value: ${value}`);
//     axios
//       .post('http://localhost:3000/api/auth/assignStudent', { studentId, consultantId, newConsultantId: value })
//       .then((response) => {
//        // message.success('Student assigned successfully');
//       })
//       .catch((error) => {
//        // message.error('Failed to assign student');
//       });
//   };

//   // Define columns for Ant Design Table
// //   const columns = [
// //     {
// //       title: 'Consultant Name',
// //       dataIndex: 'name',
// //       key: 'name',
// //     },
// //     {
// //       title: 'Students',
// //       key: 'students',
// //       render: (text, consultant) => (
// //         <ul>
// //           {consultant.students && consultant.students.length > 0 ? (
// //             consultant.students.map((student) => (
// //               <li key={student._id}>
// //                 <Space direction="vertical">
// //                   <div>{student.name}</div>
// //                   <Select
// //                     defaultValue={consultant._id}
// //                     onChange={(value) => handleStudentAssign(value, student._id, consultant._id)}
// //                     style={{ width: 200 }}
// //                   >
// //                     {consultants.map((c) => (
// //                       <Option key={c._id} value={c._id}>
// //                         {c.name}
// //                       </Option>
// //                     ))}
// //                   </Select>
// //                 </Space>
// //               </li>
// //             ))
// //           ) : (
// //             <li>No students</li>
// //           )}
// //         </ul>
// //       ),
// //     },
// //   ];

//   return (
//     <div style={{ padding: 24 }}>
//         { newconsultants.length>0?
//            newconsultants.map((ac)=>{
//               return(
//                 <ul>
//                     <li>{ac.name}</li>
//                 </ul>
//               )
//            }) 
//            :
//            "No Data"
//        }
//       {/* <h1>Assign Students to Consultants</h1>
//       <Spin spinning={loading}>
//         <Table
//           columns={columns}
//           dataSource={consultants}
//           rowKey="_id" // Assuming _id is the unique identifier
//           pagination={{ pageSize: 10 }}
//         />
//       </Spin> */}

      
      
// {/*         
//       <table>
//         <thead>
//         <tr>
//             <th>Student Name</th>
//             <th> Course</th>
//             <th>
//                 Ac
//             </th>
//         </tr>
//         </thead><tbody>
//         {
//             student.map((std)=>{
//                <tr key={std._id}>
//                  <td>
//                     {std.email}
//                  </td>
//                  <td>
//                 kjkk
//                  </td>
//                  <td>
//                   hkhj
//                  </td>
//                </tr>
//             })
//         }
//         </tbody>
//       </table> */}
//     </div>
//   );
// };

// export default StudentsAssign;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Select, Space, Button } from "antd";
// import { jwtDecode } from 'jwt-decode';

// // Base URL of the backend API (adjust as per your backend URL)
// const BASE_URL = "http://localhost:5000/api";

// const StudentsAssign = () => {
//   const [users, setUsers] = useState([]);
//   const [consultants, setConsultants] = useState([]);
//   const token=jwtDecode(localStorage.getItem("token"))
//     console.log(token)
  
//   // Fetch users and consultants when the component mounts
//   useEffect(() => {
//     // Fetch Users
//     axios
//       .get(`${BASE_URL}/users/getAllUsersCourse`)
//       .then((response) => {
//         setUsers(response.data.users);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });

//     // Fetch Consultants
//     axios
//       .get(`${BASE_URL}/users/getconsultants`,{'headers':{'id':token.id}})
//       .then((response) => {
//         setConsultants(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching consultants:", error);
//       });
//   }, []);

//   // Function to handle consultant selection
//   const handleConsultantChange = (value, userId) => {
//     // Update the user with the selected consultant (you can update in the backend as well)
//     console.log(`User ID: ${userId}, Selected Consultant: ${value}`);
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//       render: (course) => course?.name || "N/A", // Assuming course has a name field
//     },
//     {
//       title: "Consultant",
//       key: "consultant",
//       render: (text, record) => (
//         <Select
//           style={{ width: 200 }}
//           onChange={(value) => handleConsultantChange(value, record._id)}
//         >
//           {consultants.map((consultant) => (
//             <Select.Option key={consultant._id} value={consultant._id}>
//               {consultant.name}
//             </Select.Option>
//           ))}
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Space style={{ marginBottom: 16 }}>
//         <Button type="primary">Add User</Button>
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="_id"
//         pagination={false}
//       />
//     </div>
//   );
// };




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Select, Space, Button } from "antd";
// import {jwtDecode} from "jwt-decode"; 


// const BASE_URL = "http://localhost:3000/api";

// const StudentsAssign = () => {
//   const [users, setUsers] = useState([]);
//   const [consultants, setConsultants] = useState([]);

//   const token = localStorage.getItem("token");

//   let decodedToken;
//   if (token) {
//     decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken); 
//   }
//   useEffect(() => {
    
//     axios
//       .get(`${BASE_URL}/consultants/getAllUsersCourse`)
//       .then((response) => {
//         setUsers(response.data.users);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });

//     if (decodedToken) {
//       axios
//         .get(`${BASE_URL}/consultants/getconsultants`, {
//           headers: {
//             Authorization: `Bearer ${token}`,  
//             id: decodedToken.id,  
//           },
//         })
//         .then((response) => {
//           setConsultants(response.data);  
//         })
//         .catch((error) => {
//           console.error("Error fetching consultants:", error);
//         });
//     }
//   }, [token, decodedToken]);

//   const handleConsultantChange = (value, userId) => {

//     console.log(`User ID: ${userId}, Selected Consultant: ${value}`);
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//       render: (course) => course?.name || "N/A", 
//     },
//     {
//       title: "Consultant",
//       key: "consultant",
//       render: (text, record) => (
//         <Select
//   style={{ width: 200 }}
//   onChange={(value) => handleConsultantChange(value, record._id)}
//   placeholder="Select Consultant"  
// >
//           {consultants.map((consultant) => (
//             <Select.Option key={consultant._id} value={consultant._id}>
//               {consultant.name}
//             </Select.Option>
//           ))}
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Space style={{ marginBottom: 16 }}>
//         <Button type="primary">Add User</Button>
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="_id"
//         pagination={false}
//       />
//     </div>
//   );
// };

// export default StudentsAssign;




// import React, { useEffect, useState } from "react";---------------
// import axios from "axios";
// import { Table, Select, Space, Button } from "antd";
// import {jwtDecode} from "jwt-decode"; // Fixed import issue

// const BASE_URL = "http://localhost:3000/api";  // Update to your actual backend URL

// const StudentsAssign = () => {
//   const [users, setUsers] = useState([]);
//   const [consultants, setConsultants] = useState([]);

//   const token = localStorage.getItem("token");

//   let decodedToken;
//   if (token) {
//     decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken); 
//   }

//   useEffect(() => {
//     // Fetch users and consultants from the combined API endpoint
//     axios
//       .get(`${BASE_URL}/consultants/getAllUsersAndConsultants`, {
//         headers: {
//           Authorization: `Bearer ${token}`,  
//           id: decodedToken?.id, // Send decoded token ID if present
//         },
//       })
//       .then((response) => {
//         const { users, consultants } = response.data;
//         setUsers(users);         // Set the users state
//         setConsultants(consultants);  // Set the consultants state
//       })
//       .catch((error) => {
//         console.error("Error fetching users and consultants:", error);
//       });
//   }, [token, decodedToken]);

//   const handleConsultantChange = (value, userId) => {
//     console.log(`User ID: ${userId}, Selected Consultant: ${value}`);
//     // You can implement updating the user with the selected consultant here
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//       render: (course) => course?.name || "N/A", // Assuming course has a name field
//     },
//     {
//       title: "Consultant",
//       key: "consultant",
//       render: (text, record) => (
//         <Select
//           style={{ width: 200 }}
//           onChange={(value) => handleConsultantChange(value, record._id)}
//           placeholder="Select Consultant"
//         >
//           {consultants.map((consultant) => (
//             <Select.Option key={consultant._id} value={consultant._id}>
//               {`${consultant.name} `} {/* Display name and team lead */}
//               {/* - ${consultant.teamlead_id?.name}` */}
//             </Select.Option>
//           ))}
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Space style={{ marginBottom: 16 }}>
//         <Button type="primary">Add User</Button>
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="_id"
//         pagination={false}
//       />
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";---------------------------------------------------
// import axios from "axios";
// import { Table, Select, Space, Button, message } from "antd";
// import {jwtDecode} from "jwt-decode"; // Fixed import issue

// const BASE_URL = "http://localhost:3000/api";  // Update to your actual backend URL

// const StudentsAssign = () => {
//   const [users, setUsers] = useState([]);
//   const [consultants, setConsultants] = useState([]);

//   const token = localStorage.getItem("token");

//   let decodedToken;
//   if (token) {
//     decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken); 
//   }

//   useEffect(() => {
//     // Fetch users and consultants from the combined API endpoint
//     axios
//       .get(`${BASE_URL}/consultants/getAllUsersAndConsultants`, {
//         headers: {
//           Authorization: `Bearer ${token}`,  
//           id: decodedToken?.id, // Send decoded token ID if present
//         },
//       })
//       .then((response) => {
//         const { users, consultants } = response.data;
//         setUsers(users);         // Set the users state
//         setConsultants(consultants);  // Set the consultants state
//       })
//       .catch((error) => {
//         console.error("Error fetching users and consultants:", error);
//       });
//   }, [token, decodedToken]);

//   const handleConsultantChange = (value, userId) => {
//     // Send request to update user with the selected consultant
//     axios
//       .post(`${BASE_URL}/consultants/updateConsultant`, { userId, consultantId: value }, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Include the token for authorization
//         }
//       })
//       .then((response) => {
//         // Update users state with the new consultant data
//         message.success(response.data.message); // Success message
//         setUsers((prevUsers) => {
//           return prevUsers.map((user) =>
//             user._id === userId
//               ? { ...user, consultant: response.data.consultant } // Update the user with the new consultant
//               : user
//           );
//         });
//       })
//       .catch((error) => {
//         console.error("Error assigning consultant:", error);
//         message.error("Failed to assign consultant");
//       });
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//       render: (course) => course?.name || "N/A", // Assuming course has a name field
//     },
//     {
//       title: "Consultant",
//       key: "consultant",
//       render: (text, record) => (
//         <Select
//           style={{ width: 200 }}
//           onChange={(value) => handleConsultantChange(value, record._id)}
//           placeholder="Select Consultant"
//           value={record.consultant ? record.consultant._id : undefined}
//         >
//           {consultants.map((consultant) => (
//             <Select.Option key={consultant._id} value={consultant._id}>
//               {`${consultant.name}`} {/* Display consultant's name */}
//             </Select.Option>
//           ))}
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Space style={{ marginBottom: 16 }}>
//         <Button type="primary">Add User</Button>
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="_id"
//         pagination={false}
//       />
//     </div>
//   );
// };



// export default StudentsAssign;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Select, Space, Button, message } from "antd";
// import { jwtDecode } from "jwt-decode"; // Fixed import issue

// const BASE_URL = "http://localhost:3000/api"; // Update to your actual backend URL

// const StudentsAssign = () => {
//   const [users, setUsers] = useState([]);
//   const [consultants, setConsultants] = useState([]);
//   const [selectedConsultants, setSelectedConsultants] = useState({}); // Store selected consultants

//   const token = localStorage.getItem("token");

//   let decodedToken;
//   if (token) {
//     decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken);
//   }

//   useEffect(() => {
//     // Fetch users and consultants from the combined API endpoint
//     axios
//       .get(`${BASE_URL}/consultants/getAllUsersAndConsultants`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           id: decodedToken?.id, // Send decoded token ID if present
//         },
//       })
//       .then((response) => {
//         const { users, consultants } = response.data;
//         setUsers(users); // Set the users state
//         setConsultants(consultants); // Set the consultants state
//       })
//       .catch((error) => {
//         console.error("Error fetching users and consultants:", error);
//       });
//   }, [token, decodedToken]);

//   const handleConsultantChange = (value, userId) => {
//     setSelectedConsultants((prevState) => ({
//       ...prevState,
//       [userId]: value, // Update selected consultant for the user
//     }));
//   };

//   const handleSubmitAll = () => {
//     // Gather all the selected consultants for each user
//     const selectedData = Object.keys(selectedConsultants).map((userId) => ({
//       userId,
//       consultantId: selectedConsultants[userId],
//     }));

//     if (selectedData.length === 0) {
//       message.error("Please select at least one consultant.");
//       return;
//     }

//     // Send selected consultant data to the backend
//     axios
//       .post(
//         `${BASE_URL}/consultants/submitAllConsultants`,
//         { selectedData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token for authorization
//           },
//         }
//       )
//       .then((response) => {
//         message.success("Consultants assigned successfully to all users!");
//         // Optionally, update users state with the response data (if needed)
//       })
//       .catch((error) => {
//         console.error("Error assigning consultants to all users:", error);
//         message.error("Failed to assign consultants to users");
//       });
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//       render: (course) => course?.name || "N/A", // Assuming course has a name field
//     },
//     {
//       title: "Consultant",
//       key: "consultant",
//       render: (text, record) => (
//         <Space>
//           <Select
//             style={{ width: 200 }}
//             onChange={(value) => handleConsultantChange(value, record._id)}
//             placeholder="Select Consultant"
//             value={selectedConsultants[record._id] || record.consultant?._id} // Default value is the selected consultant
//           >
//             {consultants.map((consultant) => (
//               <Select.Option key={consultant._id} value={consultant._id}>
//                 {`${consultant.name}`} {/* Display consultant's name */}
//               </Select.Option>
//             ))}
//           </Select>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="_id"
//         pagination={false}
//       />

//       {/* Submit All button */}
//       <Space style={{ marginTop: 16 }}>
//         <Button type="primary" onClick={handleSubmitAll}>
//           Submit All
//         </Button>
//       </Space>
//     </div>
//   );
// };

// export default StudentsAssign;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Select, Space, Button, message } from "antd";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

const BASE_URL = "http://localhost:3000/api"; // Update to your actual backend URL

const StudentsAssign = () => {
  const [users, setUsers] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState({}); // Store selected consultants

  const token = localStorage.getItem("token");

  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
  }

  // Fetching users and consultants
  useEffect(() => {
    axios
      .get(`${BASE_URL}/consultants/getAllUsersAndConsultants`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: decodedToken?.id, // Send decoded token ID if present
        },
      })
      .then((response) => {
        const { users, consultants } = response.data;
        setUsers(users); // Set the users state
        setConsultants(consultants);
        console.log("users", users);
        console.log("consultants", consultants); // Set the consultants state
      })
      .catch((error) => {
        console.error("Error fetching users and consultants:", error);
        message.error("Failed to fetch users and consultants.");
      });
  }, []);

  // Handle consultant change
  const handleConsultantChange = (value, userId) => {
    setSelectedConsultants((prevState) => ({
      ...prevState,
      [userId]: value, // Update selected consultant for the user
    }));
  };

  // Handle submit consultant change
  const handleSubmitConsultant = (userId) => {
    const consultantId = selectedConsultants[userId];
    if (!consultantId) {
      message.error("Please select a consultant for this user.");
      return;
    }

    // Log studentId and consultantId to console
    console.log("Student ID:", userId);
    console.log("Consultant ID:", consultantId);

    // Optionally, send data to the backend if needed
    axios
      .post(
        `${BASE_URL}/consultants/updateconsultantsforstudents`,
        { userId, consultantId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authorization
          },
        }
      )
      .then((response) => {
        message.success(response.data);
        // Success message
        setUsers((prevUsers) => {
          return prevUsers.map((user) =>
            user._id === userId
              ? { ...user, consultant: response.data.consultant }
              : user
          );
        });
      })
      .catch((error) => {
        console.error("Error assigning consultant:", error);
        message.error("Failed to assign consultant.");
      });
  };

  // Table columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course) => course?.name || "N/A", // Assuming course has a name field
    },
    {
      title: "Consultant",
      key: "consultant",
      render: (text, record) => (
        <Space>
          <Select
            style={{ width: 200 }}
            onChange={(value) => handleConsultantChange(value, record._id)}
            placeholder="Select Consultant"
            value={
              selectedConsultants[record._id] ||
              record.consultant?.name ||
              undefined // Default to the consultant's name if available
            }
          >
            {consultants.map((consultant) => (
              <Select.Option key={consultant._id} value={consultant._id}>
                {consultant.name} {/* Display consultant's name */}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => handleSubmitConsultant(record._id)} // Pass the user ID here
            disabled={!selectedConsultants[record._id]} // Disable button if no consultant is selected
          >
            Submit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 74 }}>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default StudentsAssign;

//needed--------------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Select, Space, Button, message } from "antd";
// import { jwtDecode } from "jwt-decode"; // Fixed import issue

// const BASE_URL = "http://localhost:3000/api"; // Update to your actual backend URL

// const StudentsAssign = () => {
//   const [users, setUsers] = useState([]);
//   const [consultants, setConsultants] = useState([]);
//   const [selectedConsultants, setSelectedConsultants] = useState({}); // Store selected consultants

//   const token = localStorage.getItem("token");

//   let decodedToken;
//   if (token) {
//     decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken);
//   }

//   useEffect(() => {
//     // Fetch users and consultants from the combined API endpoint
//     axios
//       .get(`${BASE_URL}/consultants/getAllUsersAndConsultants`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           id: decodedToken?.id, // Send decoded token ID if present
//         },
//       })
//       .then((response) => {
//         const { users, consultants } = response.data;
//         setUsers(users); // Set the users state
//         setConsultants(consultants); // Set the consultants state
//       })
//       .catch((error) => {
//         console.error("Error fetching users and consultants:", error);
//       });
//   }, [token, decodedToken]);

//   const handleConsultantChange = (value, userId) => {
//     setSelectedConsultants((prevState) => ({
//       ...prevState,
//       [userId]: value, // Update selected consultant for the user
//     }));
//   };

//   const handleSubmitConsultant = (userId) => {
//     const consultantId = selectedConsultants[userId];
//     if (!consultantId) {
//       message.error("Please select a consultant for this user.");
//       return;
//     }

//     // Send selected consultant data to the backend for this user
//     axios
//       .post(
//         `${BASE_URL}/consultants/updateConsultant`,
//         { userId, consultantId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token for authorization
//           },
//         }
//       )
//       .then((response) => {
//         message.success(response.data.message); // Success message
//         // Optionally, update the users state with the updated consultant data
//         setUsers((prevUsers) => {
//           return prevUsers.map((user) =>
//             user._id === userId
//               ? { ...user, consultant: response.data.consultant }
//               : user
//           );
//         });
//       })
//       .catch((error) => {
//         console.error("Error assigning consultant:", error);
//         message.error("Failed to assign consultant");
//       });
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Course",
//       dataIndex: "course",
//       key: "course",
//       render: (course) => course?.name || "N/A", // Assuming course has a name field
//     },
//     {
//       title: "Consultant",
//       key: "consultant",
//       render: (text, record) => (
//         <Space>
//           <Select
//             style={{ width: 200 }}
//             onChange={(value) => handleConsultantChange(value, record._id)}
//             placeholder="Select Consultant"
//             value={selectedConsultants[record._id] || record.consultant?._id} // Default value is the selected consultant
//           >
//             {consultants.map((consultant) => (
//               <Select.Option key={consultant._id} value={consultant._id}>
//                 {`${consultant.name}`} {/* Display consultant's name */}
//               </Select.Option>
//             ))}
//           </Select>
//           <Button
//             type="primary"
//             onClick={() => handleSubmitConsultant(record._id)}
//           >
//             Submit
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 74 }}>
//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="_id"
//         pagination={false}
//       />
//     </div>
//   );
// };

// export default StudentsAssign;
