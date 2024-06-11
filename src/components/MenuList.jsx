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
      key: "intents",
    },
    {
      label: "Entities",
      icon: <ForkOutlined />,
      key: "entities",
    },
    {
      label: "Knowledge",
      icon: <BookOutlined />,
      key: "knowledge",
      role: "beta",
    },
    {
      label: "Testing",
      icon: <ApiOutlined />,
      key: "test",
      role: "tester",
    },
    {
      label: "Settings",
      icon: <SettingFilled />,
      key: "settings",
      role: "admin",
    },
  ];

  const filteredItems = isLoggedIn
    ? items.filter((item) => (item.role ? item.role === role : true))
    : items.filter((item) => item.key === "/");

  const location = useLocation();
  const selectedMenuItem = location.pathname.split("/")[1];
  console.log(selectedMenuItem);

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="menu-bar"
      mode="inline"
      defaultSelectedKeys={[selectedMenuItem]}
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
