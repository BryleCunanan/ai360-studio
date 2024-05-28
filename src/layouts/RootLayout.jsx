import { Button, Layout, theme, Modal, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { Outlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const RootLayout = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogin = () => {
    setModalOpen(true);
  };

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="sidebar"
        theme={darkTheme ? "dark" : "light"}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Button
            style={{ marginRight: 20 }}
            type="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Modal
            title="Login"
            open={modalOpen}
            width="600px"
            maskClosable={false}
            footer={null}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            preserve={false}
            destroyOnClose
          >
            <LoginForm />
          </Modal>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            textAlign: "center",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
