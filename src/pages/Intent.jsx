import { Divider, Input, List } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const data = [
  { title: "Dummy Intent" },
  {
    title: "other intents",
  },
];

const Intent = () => {
  return (
    <>
      <div>
        <Search
          placeholder="Search Intents"
          allowClear
          onSearch={onSearch}
          style={{ width: 800 }}
        />
      </div>
      <Divider orientation="left">Intents</Divider>
      <div>
        <List
          style={{ textAlign: "left" }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a key="list-intent-followup">Add Follow-up Intent</a>,
                <a key="list-intent-delete">
                  <DeleteFilled />
                </a>,
              ]}
            >
              <List.Item.Meta title={<a href="/intentdummy">{item.title}</a>} />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default Intent;
