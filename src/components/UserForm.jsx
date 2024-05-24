import { Button, Checkbox, Form, Input, message } from "antd";

const onFinish = () => {};

const onFinishFailed = () => {};

const UserForm = () => {
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
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password required!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
