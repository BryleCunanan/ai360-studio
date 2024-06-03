import { Menu } from "antd";
import {
  SettingFilled,
  MessageOutlined,
  ForkOutlined,
  BookOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const MenuList = ({ darkTheme, isLoggedIn }) => {
  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
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

  const filteredItems = isLoggedIn
    ? items
    : items.filter((item) => item.key === "/");

  const location = useLocation();
  const selectedMenuItem = items.find((item) => location.pathname === item.key);

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="menu-bar"
      selectedKeys={selectedMenuItem ? [selectedMenuItem.key] : []}
    >
      {filteredItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <NavLink to={item.key}>{item.label}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
