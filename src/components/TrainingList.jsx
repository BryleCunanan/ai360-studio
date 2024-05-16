import { Input, List } from "antd";

const TrainingList = () => {
  const items = [
    <Input variant="borderless" placeholder="Existing expression" />,
    <Input variant="borderless" placeholder="Existing expression" />,
    <Input variant="borderless" placeholder="Existing expression" />,
    <Input variant="borderless" placeholder="Existing expression" />,
  ];

  return (
    <div>
      <Input placeholder="Add user expression" size="large" />

      <List
        dataSource={items}
        bordered
        style={{ marginTop: 20 }}
        renderItem={(item, index) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default TrainingList;
