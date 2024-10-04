// src/App.tsx
import React from 'react';
import { Layout, Typography } from 'antd';
import UserList from './components/userList';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{background:'white'}} >
      <Header style={{ background: 'white', padding: '50px 20px',textAlign:'center',fontFamily:'serif' }}>
        <Title level={2} >User Management</Title>
      </Header>
      <Content style={{ margin: '20px',width:'100%',backgroundColor:'white' }}>
        <UserList />
      </Content>
    </Layout>
  );
};

export default App;
