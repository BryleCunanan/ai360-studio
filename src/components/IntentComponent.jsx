import { List } from "antd";

const IntentComponent = () => {
  return (
    <>
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
    </>
  );
};

export default IntentComponent;
