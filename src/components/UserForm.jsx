import { Button, Select, Form, Input } from "antd";
import axios from "axios";
import { deleteLogin } from "../helpers/loginHelper";
import { useNavigate } from "react-router-dom";

const UserForm = ({ data, handleDrawerOpen, isNewUser }) => {
  const navigate = useNavigate();

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
    if (isNewUser) {
      axios
        .post(import.meta.env.APP_SERVER_URL + "/user", value)
        .then(() => {
          handleDrawerOpen(false);
        })
        .catch((error) => {
          console.log(error);
          deleteLogin(error, navigate);
        });
    } else {
      console.log("value: ", value);
      axios
        .post(import.meta.env.APP_SERVER_URL + "/user/" + data._id, value)
        .then(() => {
          handleDrawerOpen(false);
        })
        .catch((error) => {
          console.log(error);
          deleteLogin(error, navigate);
        });
    }
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
      onFinish={onFinish}
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
      <Form.Item label="Role" name="role" initialValue={data.role}>
        <Select onChange={handleChange} options={items} />
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
