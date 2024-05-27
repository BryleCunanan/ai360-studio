import { Button, Mentions, List } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const onChange = (value) => {
  console.log("Change:", value);
};

const onSelect = (option) => {
  console.log("Select", option);
};

const TrainingList = ({ data }) => {
  console.log(data);
  const options = [
    { value: "sinigang", label: "sinigang", entity: "ulam" },
    { value: "menudo", label: "menudo", entity: "ulam" },
    { value: "sisig", label: "sisig", entity: "ulam" },
    { value: "shirt", label: "shirt", entity: "clothing" },
  ];

  return (
    <div style={{ textAlign: "left" }}>
      <Mentions
        placeholder="Add user expression"
        size="large"
        onChange={onChange}
        onSelect={onSelect}
        options={options}
        style={{ marginTop: 20, marginBottom: 20 }}
      />

      <List
        dataSource={data}
        bordered
        renderItem={(item, index) => (
          <List.Item>
            {item.name}
            <Mentions
              style={{ width: "100%" }}
              defaultValue={data[index]}
              options={options}
              onChange={onChange}
              onSelect={onSelect}
              variant="Borderless"
            />
            <Button type="text">
              <DeleteFilled />
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TrainingList;
