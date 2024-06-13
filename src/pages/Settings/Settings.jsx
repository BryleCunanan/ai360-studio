import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const { Content, Sider } = Layout;

const items = [
  {
    label: <NavLink to="users">Users</NavLink>,
    icon: <UserOutlined />,
    key: "users",
  },
  {
    label: <NavLink to="config">Config</NavLink>,
    key: "config",
  },
];

const Settings = () => {
  const location = useLocation();
  const handleClick = () => {};

  return (
    <Layout>
      <Sider>
        <Menu
          onClick={handleClick}
          className="settings-menu"
          mode="inline"
          defaultSelectedKeys={[location.pathname.split("/")[2]]}
          items={items}
        />
      </Sider>
      <Content style={{ backgroundColor: "white" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Settings;
