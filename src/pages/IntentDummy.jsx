import { Divider, Flex, Button, Input, List, Form } from "antd";
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
  const [intentExamples, setIntentExamples] = useState([]);
  const [intentName, setIntentName] = useState();

  if (location.pathname != "/intents/intentdummy") {
    useEffect(() => {
      axios
        .get("http://172.17.21.48:3000/intent/" + id)
        .then((response) => {
          setIntentExamples(response.data.intentExamples);
          setIntentName(response.data.intentName);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  const handleSubmit = () => {
    const values = {
      intentName,
      intentExamples,
      followUp: false,
    };
    console.log(values);

    // axios
    //   .post("http://172.17.21.48:3000/intent", values)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleIntentName = () => {
    setIntentName(event.target.value);
  };
  return (
    <div>
      <div>
        <Flex style={boxStyle} justify="space-evenly" align="center">
          <Input
            style={{ width: 800 }}
            size="large"
            placeholder="Intent Name"
            variant="filled"
            value={intentName}
            onChange={handleIntentName}
          />

          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Flex>
      </div>
      <Divider orientation="left">Training Phrases</Divider>
      <div>
        <p style={{ textAlign: "left" }}>
          Write user expressions that are inline with this intent.
        </p>
        <TrainingList
          data={intentExamples}
          setIntentExamples={setIntentExamples}
        />
      </div>
    </div>
  );
};

export default IntentDummy;
