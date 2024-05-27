import { List, Input, Button } from "antd";

const ResponseList = ({ data }) => {
  console.log("Response: ", data);
  return (
    <div>
      <List
        dataSource={[data]}
        bordered
        style={{ marginTop: 20 }}
        renderItem={(item, index) => (
          <Input
            variant="borderless"
            placeholder="Existing expression"
            size="small"
            defaultValue={item}
            key={index}
          />
        )}
      />
    </div>
  );
};

export default ResponseList;
