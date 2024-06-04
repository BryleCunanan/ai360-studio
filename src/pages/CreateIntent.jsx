import { Divider, Flex, Button, Input, List, Form } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
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
  const [intentInputValue, setIntentInputValue] = useState("");
  const [knowledgeValue, setKnowledgeValue] = useState("");
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [knowledgeID, setKnowledgeID] = useState(null);

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

      axios
        .get(import.meta.env.APP_SERVER_URL + "/knowledge/" + id)
        .then((response) => {
          setKnowledgeData(response.data.knowledge);
          setKnowledgeID(response.data._id);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  const handleSubmit = () => {
    const intentValues = {
      intentName,
      intentExamples,
      followUp: false,
    };

    const knowledgeValues = {
      knowledge: knowledgeData,
    };
    console.log(knowledgeValues);

    if (location.pathname == "/intents/new") {
      axios
        .post(import.meta.env.APP_SERVER_URL + "/intent", intentValues)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // console.log(import.meta.env.APP_SERVER_URL + "/intent/" + id);
      // axios
      //   .post(import.meta.env.APP_SERVER_URL + "/intent/" + id, intentValues)
      //   .then((result) => {
      //     console.log(result.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      axios
        .post(
          import.meta.env.APP_SERVER_URL + "/knowledge/" + knowledgeID,
          knowledgeValues
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleIntentName = () => {
    setIntentName(event.target.value);
  };

  const handleInputEnter = () => {
    console.log("Entered Input: ", intentInputValue);
    if (intentInputValue.trim() !== "") {
      const newItem = intentInputValue.trim();
      const newIntentData = [...intentData, newItem];
      setIntentData(newIntentData);
      setIntentExamples(newIntentData);
      setIntentInputValue("");
    }
  };

  const handleKnowledgeEnter = () => {
    console.log("Entered Knowledge: ", knowledgeValue);
    if (knowledgeValue.trim() !== "") {
      const newItem = knowledgeValue.trim();
      const newKnowledge = [...knowledgeData, newItem];
      setKnowledgeData(newKnowledge);
      setIntentExamples(newKnowledge);
      setKnowledgeValue("");
    }
  };

  const handleIntentChange = (value, index) => {
    const newIntent = [...intentData];
    newIntent[index] = value;
    setIntentData(newIntent);
    setIntentExamples(newIntent);
  };
  const handleKnowledgeChange = (value, index) => {
    const newKnowldge = [...knowledgeData];
    newKnowldge[index] = value;
    setKnowledgeData(newKnowldge);
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
            value={intentInputValue}
            style={{ marginTop: 20, marginBottom: 20 }}
            onChange={(e) => {
              setIntentInputValue(e.target.value);
            }}
            onPressEnter={handleInputEnter}
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
                  onChange={(e) => handleIntentChange(e.target.value, index)}
                />
                <Button type="text">
                  <DeleteFilled />
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Divider orientation="left">Response</Divider>
      <div>
        <p style={{ textAlign: "left" }}>
          Write the corresponding response for this intent.
        </p>
        <div style={{ textAlign: "left" }}>
          <Input
            placeholder="Add response variety"
            size="large"
            value={knowledgeValue}
            style={{ marginTop: 20, marginBottom: 20 }}
            onChange={(e) => {
              setKnowledgeValue(e.target.value);
            }}
            onPressEnter={handleKnowledgeEnter}
          />
          <List
            dataSource={knowledgeData}
            bordered
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Input
                  style={{ width: "100%" }}
                  value={knowledgeData[index]}
                  variant="Borderless"
                  onChange={(e) => handleKnowledgeChange(e.target.value, index)}
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
