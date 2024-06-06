import { Button, Card, Divider, Flex, Input, Space } from "antd";
import React, { useState } from "react";
import axios from "axios";

const TestGround = () => {
  const [inputValue, setInputValue] = useState("");
  const [botResponse, setBotResponse] = useState({});

  const testPayload = {
    intent: "parking",
    _id: "237925619hkbe287bd8b12",
    examples: ["park", "car"],
    followUp: false,
    followUpItems: [{ MB: "asbnkn2sn92n92" }, { BC6: "nd9q38n9n9nd9n923n" }],
  };

  const handleSend = () => {
    console.log(inputValue);
    axios
      .post("http://54.254.184.220:5005/webhooks/rest/webhook", {
        message: inputValue,
      })
      .then((response) => {
        console.log("Message: ", response.data);
        setBotResponse(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Flex style={{ width: "100%" }} justify="space-evenly" align="center">
        <Input
          allowClear
          style={{ width: 1300 }}
          onChange={handleChange}
          value={inputValue}
          onPressEnter={handleSend}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </Flex>
      <Divider />
      <Card style={{ textAlign: "left" }}>
        <pre
          style={{
            backgroundColor: "#2e2e2e",
            color: "#f8f8f2",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "Courier, NewCourier, monospace",
            whiteSpace: "pre-wrap" /* Allows wrapping */,
            wordBreak: "break-all" /* Prevents overflow */,
            overflowX: "auto" /* Horizontal scroll if needed */,
          }}
        >
          {JSON.stringify(botResponse, null, 4)}
        </pre>
      </Card>
    </div>
  );
};

export default TestGround;
