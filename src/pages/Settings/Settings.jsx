import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const { Content, Sider } = Layout;

const items = [
  {
    label: "Users",
    icon: <UserOutlined />,
    key: "users",
  },
  {
    label: "Others",
    key: "others",
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
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.key}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ backgroundColor: "white" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Settings;
