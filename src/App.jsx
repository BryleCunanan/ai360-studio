import { Button, Flex, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import { useState } from "react";
import ToggleThemeButton from "./components/ToggleThemeButton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intent from "./pages/Intent";
import Entities from "./pages/Entities";
import Knowledge from "./pages/Knowledge";

const { Header, Sider, Content } = Layout;
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
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
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
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
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/intents" element={<Intent />}></Route>
              <Route path="/entities" element={<Entities />}></Route>
              <Route path="/knowledge" element={<Knowledge />}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
