import { Button, Mentions, List } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const onChange = (value) => {
  console.log("Change:", value);
};

const onSelect = (option) => {
  console.log("Select", option);
};

const TrainingList = () => {
  const options = [
    { value: "sinigang", label: "sinigang", entity: "ulam" },
    { value: "menudo", label: "menudo", entity: "ulam" },
    { value: "sisig", label: "sisig", entity: "ulam" },
    { value: "shirt", label: "shirt", entity: "clothing" },
  ];

  const items = [
    <>
      <Mentions
        size="small"
        variant="borderless"
        placeholder="Existing expression"
        onChange={onChange}
        onSelect={onSelect}
        options={options}
      />
      <Button type="text">
        <DeleteFilled />
      </Button>
    </>,
    <>
      <Mentions
        size="small"
        variant="borderless"
        placeholder="Existing expression"
        onChange={onChange}
        onSelect={onSelect}
        options={options}
      />
      <Button type="text">
        <DeleteFilled />
      </Button>
    </>,
    <>
      <Mentions
        size="small"
        variant="borderless"
        placeholder="Existing expression"
        onChange={onChange}
        onSelect={onSelect}
        options={options}
      />
      <Button type="text">
        <DeleteFilled />
      </Button>
    </>,
    <>
      <Mentions
        size="small"
        variant="borderless"
        placeholder="Existing expression"
        onChange={onChange}
        onSelect={onSelect}
        options={options}
      />
      <Button type="text">
        <DeleteFilled />
      </Button>
    </>,
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
        dataSource={items}
        bordered
        renderItem={(item, index) => (
          <div>
            <List.Item>{item}</List.Item>
          </div>
        )}
      />
    </div>
  );
};

export default TrainingList;
