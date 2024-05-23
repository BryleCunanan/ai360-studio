import { Menu } from "antd";
import {
  SettingFilled,
  MessageOutlined,
  ForkOutlined,
  BookOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { label: "Home", icon: <HomeOutlined />, key: "/" },
  {
    label: "Intents",
    icon: <MessageOutlined />,
    key: "/intents",
  },
  {
    label: "Entities",
    icon: <ForkOutlined />,
    key: "/entities",
  },
  {
    label: "Knowledge",
    icon: <BookOutlined />,
    key: "/knowledge",
  },
  {
    label: "Settings",
    icon: <SettingFilled />,
    key: "/settings",
  },
];

const MenuList = ({ darkTheme }) => {
  const location = useLocation(); // Move this inside the functional component
  const selectedMenuItem = items.find((item) => location.pathname === item.key);

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"} // Removed extra space after "dark"
      className="menu-bar"
      selectedKeys={selectedMenuItem ? [selectedMenuItem.key] : []}
    >
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <NavLink to={item.key}>{item.label}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
