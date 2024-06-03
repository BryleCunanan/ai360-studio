import { Divider, Flex, Button, Input, List, Form } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import ResponseList from "../components/ResponseList";
import axios from "axios";
import { useParams } from "react-router-dom";

const boxStyle = {
  width: "100%",
  height: 120,
  marginTop: 15,
};

const CreateIntent = () => {
  let { id } = useParams();
  const [intentExamples, setIntentExamples] = useState([]);
  const [intentName, setIntentName] = useState();
  const [intentData, setIntentData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  if (location.pathname != "/intents/new") {
    useEffect(() => {
      axios
        .get(import.meta.env.APP_SERVER_URL + "/intent/" + id)
        .then((response) => {
          setIntentExamples(response.data.intentExamples);
          setIntentData(response.data.intentExamples);
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
                <Input
                  style={{ width: "100%" }}
                  value={intentData[index]}
                  variant="Borderless"
                  onChange={(e) => handlePhraseChange(e.target.value, index)}
                />
                <Button type="text">
                  <DeleteFilled />
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateIntent;
