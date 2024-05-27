import { Divider, Flex, Button, Input, List } from "antd";
import React from "react";
import TrainingList from "../components/TrainingList";
import ResponseList from "../components/ResponseList";
import axios from "axios";
const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};
axios
  .get("http://172.17.21.48:3000/intent/664ed6c207cfa842b5bf605a")
  .then((response) => {
    // console.log(response.data);
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
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
