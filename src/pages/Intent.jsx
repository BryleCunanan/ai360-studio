import { Divider, Input, List, Button, Flex } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const data = [
  { title: "Dummy Intent" },
  {
    title: "other intents",
  },
];

const handleClick = (index, key) => {
  key === "list-intent-followup"
    ? console.log("Followup: ", index)
    : key === "list-intent-delete" && console.log("Deleted: ", index);
};

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
        <List
          style={{ textAlign: "left" }}
          itemLayout="horizontal"
          dataSource={data}
          onClick={handleClick}
          renderItem={(item, index) => (
            <>
              <List.Item
                actions={[
                  <Button
                    onClick={() => handleClick(index, "list-intent-followup")}
                  >
                    Add Follow-up Intent
                  </Button>,
                  <Button
                    onClick={() => handleClick(index, "list-intent-delete")}
                  >
                    <DeleteFilled />
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={<Link to="/intentdummy">{item.title}</Link>}
                />
              </List.Item>
              <List
                renderItem={(item) => <List.Item>{item}</List.Item>}
                locale={{ emptyText: " " }}
              ></List>
            </>
          )}
        />
      </div>
    </>
  );
};

export default Intent;
