// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { User } from '../types/user';
import { getUsers, deleteUser } from '../services/api';
import UserForm from './UserForm';
import dayjs from 'dayjs';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      console.log(response.data); // Log user data to check image URLs
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
      console.error(error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const columns: ColumnsType<User> = [
    
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Profile Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string | null) => (
        <img
          src={image || 'https://via.placeholder.com/50'} // Use a valid placeholder image URL
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: '50%' }} // Adjust styles as needed
        />
      ),
    },
    {
      title:'Favorite coding language',
      dataIndex:'favoriteCodingLanguage',
      key:'favoriteCodingLanguage',
      render: (language) => language || 'N/A',
    },
    {
      title:'dateOfBirth',
      dataIndex:'dateOfBirth',
      key:'dateOfBirth',
      render:(Date)=>dayjs(Date).format('YYYY/MM/DD') || 'N/A',
    },
    {
      title:'age',
      dataIndex:'age',
      key:'age',
      render:(age)=>age|| 'N/A',

    },
    {
    title:'domains',
    dataIndex:'domains',
    key:'domains',
    render: (domains: Array<string>) => 
      domains && domains.length > 0 ? domains.join(', ') : 'N/A',
    },
    


    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id!)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleFormSuccess = () => {
    setIsModalVisible(false);
    fetchUsers();
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add User
      </Button>
      {loading ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={users} rowKey="id" loading={loading} style={{width:'95%'}} />
      )}
      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <UserForm user={editingUser} onSuccess={handleFormSuccess} />
      </Modal>
    </div>
  );
};

export default UserList;
