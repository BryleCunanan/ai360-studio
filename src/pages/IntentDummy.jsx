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
      <Divider orientation="left">Training Phrases</Divider>
      <div>
        <p style={{ textAlign: "left" }}>
          Write user expressions that are inline with this intent.
        </p>
        <TrainingList />
      </div>
      <Divider orientation="left">Actions</Divider>
      <div>
        <Input placeholder="Enter Action Name" size="large" />
      </div>

      <Divider orientation="left">Responses</Divider>
      <div>
        <ResponseList />
      </div>
    </>
  );
};

export default IntentDummy;