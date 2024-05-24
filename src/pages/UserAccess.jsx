import { Table, Modal } from "antd";
import { useState } from "react";
import UserForm from "../components/UserForm";

const handleClick = () => {};

const dataSource = [
  {
    key: "1",
    name: "Bryle",
    email: "brylepaulocunanan@gmail.com",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
];

const UserAccess = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{ type: "checkbox" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setModalOpen(true);
            },
          };
        }}
      />
      <Modal
        title="aa "
        className="user-modal"
        open={modalOpen}
        width="600px"
        maskClosable={false}
        footer={null}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        styles={{ body: { height: "88vh" } }}
      >
        <UserForm />
      </Modal>
    </div>
  );
};

export default UserAccess;
