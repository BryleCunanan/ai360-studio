import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
const { Content, Sider } = Layout;

const items = [
  {
    label: "User Access",
    icon: <UserOutlined />,
    key: "useraccess",
  },
  {
    label: "Others",
    key: "others",
  },
];

const Settings = () => {
  const handleClick = () => {};

  return (
    <Layout>
      <Sider>
        <Menu
          onClick={handleClick}
          className="sidebar"
          defaultSelectedKeys={"useraccess"}
          mode="inline"
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <NavLink to={item.key}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Settings;
