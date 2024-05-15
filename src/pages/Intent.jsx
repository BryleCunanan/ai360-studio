import { Divider, Flex, Button, Input } from "antd";
import React from "react";

const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};

const Intents = () => {
  return (
    <>
      <div>
        <Flex style={boxStyle} justify="space-evenly" align="center">
          <Input
            style={{ width: 800 }}
            size="large"
            placeholder="Intent Name"
            variant="filled"
          />
          <Button type="primary">Save</Button>
        </Flex>
      </div>
      <Divider>Training Phrases</Divider>
      <div>
        <Input placeholder="Add user expression" />

        <ul style={{ marginTop: 15 }}>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
        </ul>
      </div>
      <Divider>Actions</Divider>
      <div>
        <Input placeholder="Enter Action Name" />
      </div>

      <Divider>Responses</Divider>
      <div>
        <ul style={{ marginTop: 15 }}>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
          <li>
            <Input placeholder="Existing expression" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Intents;
