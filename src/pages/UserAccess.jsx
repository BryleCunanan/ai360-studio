import { Table, Drawer, Button, Flex } from "antd";
import { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import axios from "axios";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const UserAccess = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [items, setItems] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.APP_SERVER_URL + "/user")
      .then((response) => {
        setItems(response.data);
        console.log("Users: ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [drawerOpen]);

  return (
    <>
      <Flex vertical={true} align="self-end" style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ width: 100 }}
          onClick={() => {
            setUserData({});
            setIsNewUser(true);
            setDrawerOpen(true);
          }}
        >
          Add User
        </Button>
      </Flex>

      <Table
        dataSource={items.map((item) => ({ ...item, key: item._id }))}
        columns={columns}
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setUserData(items[rowIndex]);
              setDrawerOpen(true);
            },
          };
        }}
      />
      <Drawer
        title="User Information"
        className="user-drawer"
        open={drawerOpen}
        width="600px"
        maskClosable={false}
        footer={null}
        onClose={() => {
          setIsNewUser(false);
          setDrawerOpen(false);
        }}
        destroyOnClose
      >
        <UserForm
          data={userData}
          handleDrawerOpen={setDrawerOpen}
          isNewUser={isNewUser}
        />
      </Drawer>
    </>
  );
};

export default UserAccess;
