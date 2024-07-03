import { Flex, Divider, List, Input, Button } from "antd";
import { NavLink } from "react-router-dom";

const data = [
  <NavLink to="entitydummy" style={{ width: 800 }}>
    Reference value
  </NavLink>,
  <NavLink to="entitydummy" style={{ width: 800 }}>
    Reference value
  </NavLink>,
  <NavLink to="entitydummy" style={{ width: 800 }}>
    Reference value
  </NavLink>,
  <NavLink to="entitydummy" style={{ width: 800 }}>
    Reference value
  </NavLink>,
];

const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};

const EntityIndex = () => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s",
  });

  useEffect(() => {
    setStyle({ opacity: 1, transition: "opacity 0.5s" });
  }, []);

  return (
    <div style={style}>
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

export default EntityIndex;
