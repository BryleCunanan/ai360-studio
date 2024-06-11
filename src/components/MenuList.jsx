import { Menu } from "antd";
import {
  SettingFilled,
  MessageOutlined,
  ForkOutlined,
  BookOutlined,
  HomeOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MenuList = ({ darkTheme, isLoggedIn }) => {
  const [role, setRole] = useState();

  useEffect(() => {
    setRole(localStorage.getItem("role"));
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
      label: "Testing",
      icon: <ApiOutlined />,
      key: "/test",
    },
    {
      label: "Settings",
      icon: <SettingFilled />,
      key: "/settings",
    },
  ];

  const filteredItems = isLoggedIn
    ? items.filter((item) => (item.role ? item.role === role : true))
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
