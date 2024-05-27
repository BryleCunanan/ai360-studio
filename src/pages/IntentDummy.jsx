import { Divider, Flex, Button, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import TrainingList from "../components/TrainingList";
import ResponseList from "../components/ResponseList";
import axios from "axios";
import { useParams } from "react-router-dom";

const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};

const IntentDummy = () => {
  let { id } = useParams();
  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    axios
      .get("http://172.17.21.48:3000/intent/" + id)
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log("Data: ", data);
  return (
    <>
      <div>
        <Flex style={boxStyle} justify="space-evenly" align="center">
          <Input
            style={{ width: 800 }}
            size="large"
            placeholder="Intent Name"
            variant="filled"
            value={responseData.intentName}
          />
          <Button
            type="primary"
            onClick={() => {
              console.log(responseData.intentName);
            }}
          >
            Save
          </Button>
        </Flex>
      </div>
      <Divider orientation="left">Training Phrases</Divider>
      <div>
        <p style={{ textAlign: "left" }}>
          Write user expressions that are inline with this intent.
        </p>
        <TrainingList data={responseData.intentExamples} />
      </div>
    </>
  );
};

export default IntentDummy;
