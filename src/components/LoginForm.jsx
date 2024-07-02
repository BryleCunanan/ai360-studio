import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";

const LoginForm = ({ handleLoginButton, handleUsername }) => {
  const [form] = Form.useForm();
  const [loginFailed, setLoginFailed] = useState(false);

  const onFinish = (values) => {
    axios
      .post(import.meta.env.APP_SERVER_URL + "/login", {
        email: values.username,
        password: values.password,
      })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("token", `Bearer ${token}`);
        localStorage.setItem("username", user.name);
        localStorage.setItem("role", user.role);
        handleUsername(localStorage.getItem("username"));

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        handleLoginButton(true);
        message.success("Login Successful", 2);
        setLoginFailed(false);
      })
      .catch((error) => {
        console.error(error);
        setLoginFailed(true);
        message.error("Login Failed. Please check your username and password.");
        form.setFields([
          { name: "username" },
          { name: "password", errors: ["Invalid username or password"] },
        ]);
      });
  };

  return (
    <div
      style={{
        height: 600,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // flexDirection: "column",
        padding: 20,
      }}
    >
      <div style={{ marginBottom: 50 }}>
        <h1>Login</h1>
        <p>Welcome! Sign In to Get Started</p>
      </div>
      <Form
        form={form}
        name="login"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 32 }}
        style={{ width: 600 }}
        onFinish={onFinish}
        layout="vertical"
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
