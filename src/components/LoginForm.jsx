import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const onFinish = (values) => {
  console.log("Success:", values);
  axios
    .post("http://172.17.21.48:3000/login", {
      email: values.username,
      password: values.password,
    })
    .then((result) => {
      localStorage.setItem("token", "Bearer " + result.data.token);
    })
    .catch((error) => {
      console.log(error);
    });
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  return (
    <Form
      name="login"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
