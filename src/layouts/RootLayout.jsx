import { Button, Layout, theme, Modal, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useEffect, useState } from "react";
import ToggleThemeButton from "../components/ToggleThemeButton";
import { Outlet, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { deleteLogin } from "../helpers/loginHelper";

const { Header, Sider, Content } = Layout;

const RootLayout = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    console.log("token", axios.defaults.headers.common["Authorization"]);

    if (axios.defaults.headers.common["Authorization"]) {
      setUsername(localStorage.getItem("username"));
      console.log("Logged in");
      setIsLoggedIn(true);
    } else {
      console.log("Logged out");
      setIsLoggedIn(false);
      deleteLogin(null, navigate);
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
                  <div style={{ marginRight: 20 }}>
                    Hello,{" "}
                    {username.charAt(0).toUpperCase() + username.slice(1)}
                    <Button
                      style={{ marginLeft: 20 }}
                      type="primary"
                      onClick={() => {
                        deleteLogin("logout", navigate);
                        setIsLoggedIn(false);
                        message.info("Logged out!", 2);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
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
