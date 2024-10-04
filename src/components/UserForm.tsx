import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Upload, Radio, DatePicker, InputNumber,Checkbox} from 'antd';
import { User } from '../types/user';
import { createUser, updateUser } from '../services/api';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // Import Dayjs directly

interface UserFormProps {
  user?: User | null;
  onSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      console.log(dayjs(user.dateOfBirth));
      form.setFieldsValue({ 
        ...user,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null, // Convert string to Dayjs
      });
      setImage(user.image || null);
    } else {
      form.resetFields();
      setImage(null);
    }
  }, [user, form]);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // Set the image as a Base64 string
    };
    reader.readAsDataURL(file); // Read file as Data URL
  };

  const onFinish = async (values: User) => {
    if (!image) {
      message.error('Please upload a profile image!');
      return;
    }

    try {
      const userData = {
        ...values,
        image, // Include the image in the user data
        // dateOfBirth: dayjs(values.dateOfBirth).format('DD/MM/YYYY') , 
      };

      if (user) {
        await updateUser(user.id!, userData);
        message.success('User updated successfully');
      } else {
        await createUser(userData);
        message.success('User created successfully');
      }

      onSuccess();
      form.resetFields();
      setImage(null); // Clear the image after submission
    } catch (error) {
      message.error('Operation failed');
      console.error('Error during user creation/update:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please input the user name!' },
          {
            pattern: /^[a-zA-Z\s]*$/, // Regex to allow only alphabets and spaces
            message: 'Name must contain only alphabets!',
          },
        ]}
      >
        <Input placeholder="Enter user name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input the email!' },
          { type: 'email', message: 'Please enter a valid email!' },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item label="Profile Image" required validateStatus={image ? '' : 'error'}>
        <Upload
          accept="image/*"
          beforeUpload={(file) => {
            handleImageChange(file);
            return false; // Prevent automatic upload
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        {image && (
          <img
            src={image}
            alt="Profile"
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              marginTop: 10,
            }}
          />
        )}
      </Form.Item>

      <Form.Item 
        name="favoriteCodingLanguage"
        label="Favorite Coding Language"
        rules={[{ required: true, message: 'Please select your favorite coding language!' }]}
      >
        <Radio.Group>
          <Radio value="Java">Java</Radio>
          <Radio value="C++">C++</Radio>
          <Radio value="Python">Python</Radio>
          <Radio value="JavaScript">JavaScript</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item 
        name='dateOfBirth'
        label='Date of Birth'
        rules={[{ required: true, message: 'Please select your date of birth' }]}
      >
        <DatePicker  />
      </Form.Item>
      <Form.Item
      name='age'
      label='age'
      rules={[{required:true,message:'Please enter your age'}]}
      >
        <InputNumber
        value = 'age'
        type='number'
        >
        </InputNumber>
      </Form.Item>
      <Form.Item
      name ='domains'
      label = 'select domains'
      rules={[{required:true,message:'kindly secelct the domains '}]}
      >
        <Checkbox.Group options={[ { label: 'FrontEnd', value: 'FrontEnd' },
                                   { label: 'Backend', value: 'Backend' },
                                   { label: 'FullStack', value: 'Fullstack' },]}
        
        >

        </Checkbox.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {user ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
