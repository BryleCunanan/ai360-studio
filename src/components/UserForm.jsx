import { Button, Select, Form, Input } from "antd";
import axios from "axios";

const UserForm = ({ data, handleModalOpen }) => {
  // console.log(data);
  // data = data.data;
  console.log(data);

  const items = [
    {
      label: "Viewer",
      value: "viewer",
    },
    { label: "Editor", value: "editor" },
    { label: "Tester", value: "tester" },
    { label: "Admin", value: "admin" },
  ];

  const onFinish = (value) => {
    console.log("Finished: ", value);
    axios
      .post("http://172.17.21.48:3000/user", value)
      .then((result) => {
        console.log(result);
        handleModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = () => {
    console.log("Not Finished.");
  };

  const handleChange = (value) => {
    console.log("role:", value);
  };

  return (
    <Form
      name="user-form"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Name required!" }]}
        initialValue={data.username}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email required!" }]}
        initialValue={data.email}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ message: "Password required!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="Role" name="role">
        <Select
          onChange={handleChange}
          options={items}
          defaultValue={data.role}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
