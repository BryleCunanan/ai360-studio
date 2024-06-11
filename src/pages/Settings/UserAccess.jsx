import { Table, Drawer, Button, Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import UserForm from "../../components/UserForm";
import axios from "axios";
import { deleteLogin } from "../../helpers/loginHelper";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.APP_SERVER_URL + "/user")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
        deleteLogin(error, "/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [drawerOpen]);

  return (
    <>
      {isLoading ? (
        <div className="loading-icon">
          <LoadingOutlined
            style={{
              fontSize: 50,
            }}
          />
        </div>
      ) : (
        <>
          {" "}
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
            pagination={{ pageSize: 11, hideOnSinglePage: true }}
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
      )}
    </>
  );
};

export default UserAccess;
