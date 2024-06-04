import { Button, Layout, theme, Modal } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { Outlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const RootLayout = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    if (axios.defaults.headers.common["Authorization"]) {
      setUsername(localStorage.getItem("username"));
      console.log("Logged in");
      setIsLoggedIn(true);
    } else {
      console.log("Logged out");
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleLogin = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="loading-icon">
          <LoadingOutlined
            style={{
              fontSize: 50,
            }}
          />
        </div>
      ) : (
        <Layout>
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            className="sidebar"
            theme={darkTheme ? "dark" : "light"}
          >
            <Logo />
            <MenuList darkTheme={darkTheme} isLoggedIn={isLoggedIn} />
            <ToggleThemeButton
              darkTheme={darkTheme}
              toggleTheme={toggleTheme}
            />
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
              {isLoggedIn ? (
                username ? (
                  <div style={{ marginRight: 20 }}>Hello, {username}</div>
                ) : (
                  <LoadingOutlined style={{ marginRight: 20 }} />
                )
              ) : (
                <Button
                  style={{ marginRight: 20 }}
                  type="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}

              <Modal
                title="Login"
                open={modalOpen}
                width="600px"
                maskClosable={false}
                footer={null}
                preserve={false}
                destroyOnClose
                onCancel={handleCancel}
              >
                <LoginForm
                  handleModalUpdate={setModalOpen}
                  handleLoginButton={setIsLoggedIn}
                  handleUsername={setUsername}
                />
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
      )}
    </>
  );
};

export default RootLayout;
