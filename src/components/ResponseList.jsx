import { List, Input, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const ResponseList = () => {
  const items = [
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
      suffix={
        <Button type="text">
          <DeleteFilled />
        </Button>
      }
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
      suffix={
        <Button type="text">
          <DeleteFilled />
        </Button>
      }
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
      suffix={
        <Button type="text">
          <DeleteFilled />
        </Button>
      }
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
      suffix={
        <Button type="text">
          <DeleteFilled />
        </Button>
      }
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
      suffix={
        <Button type="text">
          <DeleteFilled />
        </Button>
      }
    />,
    <Input
      variant="borderless"
      placeholder="Existing expression"
      size="small"
      suffix={
        <Button type="text">
          <DeleteFilled />
        </Button>
      }
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
