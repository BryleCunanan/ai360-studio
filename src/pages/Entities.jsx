import { Flex, Divider, List, Input, Button } from "antd";
import { Link } from "react-router-dom";

const data = [
  <Link to="/entitydummy" style={{ width: 800 }}>
    Reference value
  </Link>,
  <Link to="/entitydummy" style={{ width: 800 }}>
    Reference value
  </Link>,
  <Link to="/entitydummy" style={{ width: 800 }}>
    Reference value
  </Link>,
  <Link to="/entitydummy" style={{ width: 800 }}>
    Reference value
  </Link>,
];

const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};

const Entities = () => {
  return (
    <div>
      <div>
        <Flex style={boxStyle} justify="space-evenly" align="center">
          <Input
            style={{ width: 800 }}
            size="large"
            placeholder="Entity Name"
            variant="filled"
          />
          <Button type="primary">Save</Button>
        </Flex>
      </div>
      <Divider />
      <div>
        <List
          style={{ textAlign: "left" }}
          size="small"
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
};

export default Entities;
