import { List, Input } from "antd";

const ResponseList = () => {
  const items = [
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
    />,
  ];

  return (
    <div>
      <List
        dataSource={items}
        bordered
        style={{ marginTop: 20 }}
        renderItem={(item, index) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default ResponseList;
