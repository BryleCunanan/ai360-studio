import { Divider, Flex, Button, Input, List } from "antd";
import React from "react";
import TrainingList from "../components/TrainingList";
import ResponseList from "../components/ResponseList";

const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};

const IntentDummy = () => {
  return (
    <>
      <div>
        <Flex style={boxStyle} justify="space-evenly" align="center">
          <Input
            style={{ width: 800 }}
            size="large"
            placeholder="Intent Name"
            variant="filled"
            defaultValue="Dummy Intent"
          />
          <Button type="primary">Save</Button>
        </Flex>
      </div>
      <Divider>Training Phrases</Divider>
      <div>
        <TrainingList />
      </div>
      <Divider>Actions</Divider>
      <div>
        <Input placeholder="Enter Action Name" size="large" />
      </div>

      <Divider>Responses</Divider>
      <div>
        <ResponseList />
      </div>
    </>
  );
};

export default IntentDummy;
