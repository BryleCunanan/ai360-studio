import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

const LoginForm = ({ handleModalUpdate, handleLoginButton }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post("http://172.17.21.48:3000/login", {
        email: values.username,
        password: values.password,
      })
      .then((result) => {
        localStorage.setItem("token", "Bearer " + result.data.token);
        handleLoginButton(true);
        handleModalUpdate(false);
        message.success("Login Successful");
      })
      .catch((error) => {
        console.log(error);
      });
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
  };

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
