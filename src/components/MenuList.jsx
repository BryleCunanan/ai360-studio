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
  const location = useLocation();

  const [role, setRole] = useState();
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  useEffect(() => {
    const currentRole = localStorage.getItem("role");
    setRole(currentRole);
    setSelectedMenuItem(location.pathname.split("/")[1]);
  }, [isLoggedIn, location]);

  const items = [
    { label: <NavLink to="/">Home</NavLink>, icon: <HomeOutlined />, key: "" },
    {
      label: <NavLink to="intents">Intents</NavLink>,
      icon: <MessageOutlined />,
      key: "intents",
    },
    {
      label: <NavLink to="entities">Entities</NavLink>,
      icon: <ForkOutlined />,
      key: "entities",
    },
    {
      label: <NavLink to="knowledge">Knowledge</NavLink>,
      icon: <BookOutlined />,
      key: "knowledge",
      role: "beta",
    },
    {
      label: <NavLink to="test">Testing</NavLink>,
      icon: <ApiOutlined />,
      key: "test",
      role: "tester",
    },
    {
      label: <NavLink to="settings">Settings</NavLink>,
      icon: <SettingFilled />,
      key: "settings",
      role: "admin",
    },
  ];

  const filteredItems = isLoggedIn
    ? items.filter((item) => (item.role ? item.role === role : true))
    : items.filter((item) => item.key === "");

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      className="menu-bar"
      mode="inline"
      selectedKeys={selectedMenuItem}
      items={filteredItems}
      onSelect={(item) => {
        console.log(item);
        setSelectedMenuItem(item.key);
      }}
    />
  );
};

export default MenuList;
