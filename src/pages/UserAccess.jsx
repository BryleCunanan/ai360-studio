import { Table, Modal } from "antd";
import { useState } from "react";
import UserForm from "../components/UserForm";

const handleClick = () => {};

const dataSource = [
  {
    _id: "664ee24d8e82b6971dee1cdd",
    username: "romeo",
    email: "romeo.d@shoredigitalinc.com",
    role: "admin",
  },
  {
    _id: "66501f6eb7a6d3e885510003",
    username: "bryle",
    email: "bryle.c@shoredigitalinc.com",
    role: "tester",
  },
];

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

  return (
    <div>
      <Table
        dataSource={dataSource.map((item) => ({ ...item, key: item._id }))}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setUserData(dataSource[rowIndex]);
              console.log(userData);
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
        styles={{ body: { height: "88vh" } }}
        preserve={false}
        destroyOnClose
        on
      >
        <UserForm data={userData} />
      </Modal>
    </div>
  );
};

export default UserAccess;
