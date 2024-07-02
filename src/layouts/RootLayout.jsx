import { Button, Layout, theme, message, Card } from "antd";
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
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s",
  });

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    if (axios.defaults.headers.common["Authorization"]) {
      setUsername(localStorage.getItem("username"));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      deleteLogin(null, navigate);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    setStyle({ opacity: 1, transition: "opacity 0.5s" });
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div style={style}>
      {isLoggedIn ? (
        loading ? (
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
              style={{
                color: "#fff",
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }}
              theme={darkTheme ? "dark" : "light"}
            >
              <Logo />
              <MenuList darkTheme={darkTheme} isLoggedIn={isLoggedIn} />
              <ToggleThemeButton
                darkTheme={darkTheme}
                toggleTheme={toggleTheme}
              />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
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
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                />
                {username ? (
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
                )}
              </Header>
              <Content
                style={{
                  margin: "24px 16px 0",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  textAlign: "center",
                  overflow: "initial",
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        )
      ) : (
        <div
          style={{
            // position: "fixed",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // gap: 25,
            height: "100vh",
            // backgroundColor: "#7209b7",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          <h1
            style={{
              fontSize: 100,
              transform: "translateY(27%)",
              color: "white",
            }}
          >
            AI360 Studio
          </h1>

          <Card style={{}} bordered={false}>
            <LoginForm
              handleLoginButton={setIsLoggedIn}
              handleUsername={setUsername}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
