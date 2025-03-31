import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, notification, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {jwtDecode} from 'jwt-decode'

const ConsultantPage = () => {
  const [consultants, setConsultants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editConsultant, setEditConsultant] = useState(null);
  const [loading, setLoading] = useState(false);
   const [token,setToken]=useState('')
  // Fetch consultants from the backend
  useEffect(() => {
    fetchConsultants();
    const token=jwtDecode(localStorage.getItem("token"))
        setToken(token.id)
        console.log("token",token.id)
  }, []);

  const fetchConsultants = async () => {
    try {
      const token=jwtDecode(localStorage.getItem("token"))
      const response = await axios.get('http://localhost:3000/api/consultants/getconsultants',{headers:{id:token.id}});
      console.log(response.data)
      setConsultants(response.data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch consultants' });
    }
  };

  const showModal = (consultant = null) => {
    setEditConsultant(consultant);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditConsultant(null);
  };

  // const handleSubmit = async (values) => {
  //   setLoading(true);
  //   try {
  //     if (editConsultant) {
  //       // Update consultant
  //       await axios.put(`http://localhost:3000/api/consultants/updateconsultants/${editConsultant._id}`, values);
  //       notification.success({ message: 'Consultant updated successfully' });
  //     } else {
  //       // Create new consultant
  //       await axios.post('http://localhost:3000/api/consultants/createconsultants',values, {headers:{id:token}});
  //       notification.success({ message: 'Consultant created successfully' });
  //     }
  //     fetchConsultants();
  //     setIsModalVisible(false);
  //   } catch (error) {
  //     notification.error({ message: 'Operation failed' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log('Submitting values:', values);  // Log data being sent
  
      // Ensure the `bdm` field is included
      values.bdm = token;  // Assuming the `token` contains the `bdm` id
  
      if (editConsultant) {
        // Update consultant
        await axios.put(`http://localhost:3000/api/consultants/updateconsultants/${editConsultant._id}`, values);
        notification.success({ message: 'Consultant updated successfully' });
      } else {
        // Create new consultant
        console.log(values)
        await axios.post('http://localhost:3000/api/consultants/createconsultants', values, {
          headers: { id: token },
        }).then((res)=>{
         alert(res.data.message);
        }).catch((err)=>{
          console.log(err)
        })
       
      }
      fetchConsultants();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error during operation:', error);  // Log the error
      notification.error({ message: 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };
  
  
// const handleSubmit = async (values) => {
//   setLoading(true);
//   try {
//     if (editConsultant) {
//       // Update consultant
//       await axios.put(`http://localhost:3000/api/consultants/updateconsultants/${editConsultant._id}`, values);
//       notification.success({ message: 'Consultant updated successfully' });
//     } else {
//       // Hash the password before sending it
//       // const hashedPassword = await bcrypt.hash(values.password, 10);
//       // values.password = hashedPassword;

//       // Create new consultant
//       await axios.post('http://localhost:3000/api/consultants/createconsultants', values, { headers: { id: token } });
//       notification.success({ message: 'Consultant created successfully' });
//     }
//     fetchConsultants();
//     setIsModalVisible(false);
//   } catch (error) {
//     notification.error({ message: 'Operation failed' });
//   } finally {
//     setLoading(false);
//   }
// };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/consultants/deleteconsultants/${id}`);
      notification.success({ message: 'Consultant deleted successfully' });
      fetchConsultants();
    } catch (error) {
      notification.error({ message: 'Failed to delete consultant' });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: 'Password',
    //   dataIndex: 'password',
    //   key: 'password',
    // },
    // {
    //   title: 'Course',
    //   dataIndex: 'course',
    //   key: 'course',
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '80px' }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Consultant
      </Button>
      <Table
        dataSource={consultants}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title={editConsultant ? 'Edit Consultant' : 'Add Consultant'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editConsultant}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the Password!' }]}
          >
            <Input />
          </Form.Item>
      
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {editConsultant ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConsultantPage;
