import { Button, List, Input } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";

const TrainingList = ({ data, setIntentExamples }) => {
  const [intentData, setIntentData] = useState(data);
  const [inputValue, setInputValue] = useState("");

  console.log("intentData; ", intentData);

  const handlePressEnter = () => {
    console.log("Entered Function: ", inputValue);
    if (inputValue.trim() !== "") {
      const newItem = inputValue.trim();
      const newIntentData = [...intentData, newItem];
      setIntentData(newIntentData);
      setIntentExamples(newIntentData);
      setInputValue("");
    }
  };

  const handlePhraseChange = (value, index) => {
    const newIntent = [...intentData];
    newIntent[index] = value;
    console.log(newIntent);
    setIntentData(newIntent);
    setIntentExamples(newIntent);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Input
        placeholder="Add user expression"
        size="large"
        value={inputValue}
        style={{ marginTop: 20, marginBottom: 20 }}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onPressEnter={handlePressEnter}
      />
      <List
        dataSource={intentData}
        bordered
        renderItem={(item, index) => (
          <List.Item key={index}>
            {item}

            <Input
              style={{ width: "100%" }}
              value={intentData[index]}
              variant="Borderless"
              key={item}
              onChange={(e) => handlePhraseChange(e.target.value, index)}
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
