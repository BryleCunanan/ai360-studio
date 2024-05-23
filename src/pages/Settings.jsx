import { Menu, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import UserAccess from "./UserAccess";
const { Content, Sider } = Layout;

const items = [
  {
    label: "User Access",
    icon: <UserOutlined />,
    key: "/useraccess",
  },
  {
    label: "Others",
    key: "/other",
  },
];

const Settings = () => {
  const handleClick = () => {};

  return (
    <Layout>
      <Sider>
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["aa"]}
          mode="inline"
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>
        <Routes>
          <Route path="/useraccess" element={<UserAccess />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Settings;
