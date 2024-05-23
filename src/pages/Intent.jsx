import { Divider, Input, List, Button, Flex } from "antd";
import { Link } from "react-router-dom";
import IntentComponent from "../components/IntentComponent";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Intent = () => {
  return (
    <>
      <Flex style={{ width: "100%" }} justify="space-evenly" align="center">
        <Search
          placeholder="Search Intents"
          allowClear
          onSearch={onSearch}
          style={{ width: "100%", maxWidth: 800 }}
        />
        <Link to="/intentdummy">
          <Button type="primary">Create Intent</Button>
        </Link>
      </Flex>
      <Divider orientation="left">Intents</Divider>
      <div>
        <IntentComponent></IntentComponent>
      </div>
    </>
  );
};

export default Intent;
