import { Table, Modal, Button, Flex } from "antd";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://172.17.21.48:3000/user")
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalOpen]);

  return (
    <>
      <Flex vertical={true} align="self-end" style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ width: 100 }}
          onClick={() => {
            setUserData({});
            setModalOpen(true);
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
              setModalOpen(true);
            },
          };
        }}
      />
      <Modal
        title="User Information"
        className="user-modal"
        open={modalOpen}
        width="600px"
        maskClosable={false}
        footer={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        styles={{ body: { height: "93vh" } }}
        preserve={false}
        destroyOnClose
      >
        <UserForm data={userData} handleModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default UserAccess;
