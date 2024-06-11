import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";

const LoginForm = ({
  handleModalUpdate,
  handleLoginButton,
  handleUsername,
}) => {
  const [form] = Form.useForm();
  const [loginFailed, setLoginFailed] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        import.meta.env.APP_SERVER_URL + "/login",
        {
          email: values.username,
          password: values.password,
        }
      );
      const { token, user } = response.data;

      localStorage.setItem("token", `Bearer ${token}`);
      localStorage.setItem("username", user.name);
      localStorage.setItem("role", user.role);
      console.log("Local: ", localStorage.getItem("username"));
      handleUsername(localStorage.getItem("username"));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      handleLoginButton(true);
      handleModalUpdate(false);
      message.success("Login Successful", 2);
      setLoginFailed(false); // Reset the loginFailed state on successful login
    } catch (error) {
      console.error(error);
      setLoginFailed(true);
      message.error("Login Failed. Please check your username and password.");
      form.setFields([
        { name: "username" },
        { name: "password", errors: ["Invalid username or password"] },
      ]);
    }
  };

  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        validateStatus={loginFailed ? "error" : ""}
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        validateStatus={loginFailed ? "error" : ""}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
