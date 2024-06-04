import { Flex, Button, Input, Divider, List } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const data = [
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

const EntityDummy = () => {
  return (
    <div>
      <Flex style={{}} justify="space-evenly" align="center">
        <Input
          style={{ width: 800 }}
          size="large"
          placeholder="Intent Name"
          variant="filled"
          defaultValue="Dummy Entity"
        />
        <Button type="primary">Save</Button>
      </Flex>
      <Divider></Divider>
      <List
        bordered
        dataSource={data}
        renderItem={(item, index) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default EntityDummy;
