import { Divider, Flex, Button, Input, List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  const [intentName, setIntentName] = useState("");
  const [intentData, setIntentData] = useState([]);
  const [intentInput, setIntentInput] = useState("");
  const [knowledgeInput, setKnowledgeInput] = useState("");
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [knowledgeID, setKnowledgeID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.pathname !== "/intents/new") {
      axios
        .get(`${import.meta.env.APP_SERVER_URL}/intent/${id}`)
        .then((response) => {
          setIntentData(response.data.intentExamples);
          setIntentName(response.data.intentName);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      axios
        .get(`${import.meta.env.APP_SERVER_URL}/knowledge/${id}`)
        .then((response) => {
          setKnowledgeData(response.data.knowledge);
          setKnowledgeID(response.data._id);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, location.pathname]);

  const handleSubmit = () => {
    const intentValues = {
      intentName,
      intentExamples: intentData,
      followUp: false,
    };

    const knowledgeValues = {
      intentNameId: id,
      knowledge: knowledgeData,
    };

    console.log(knowledgeValues);

    if (location.pathname === "/intents/new") {
      axios
        .post(import.meta.env.APP_SERVER_URL + "/intent", intentValues)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(import.meta.env.APP_SERVER_URL + "/knowledge", knowledgeValues)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(import.meta.env.APP_SERVER_URL + "/intent/" + id);
      axios
        .post(import.meta.env.APP_SERVER_URL + "/intent/" + id, intentValues)
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
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

  const handleIntentName = (e) => {
    setIntentName(e.target.value);
  };

  const handleEnter = (type) => {
    if (type === "phrase") {
      console.log("Entered Input: ", intentInput);
      if (intentInput.trim() !== "") {
        const newItem = intentInput.trim();
        const newIntentData = [...intentData, newItem];
        setIntentData(newIntentData);
        setIntentInput("");
      }
    } else if (type === "knowledge") {
      console.log("Entered Knowledge: ", knowledgeInput);
      if (knowledgeInput.trim() !== "") {
        const newItem = knowledgeInput.trim();
        const newKnowledge = [...knowledgeData, newItem];
        setKnowledgeData(newKnowledge);
        setKnowledgeInput("");
      }
    }
  };

  const handleChange = (value, index, type) => {
    if (type === "phrase") {
      const newIntent = [...intentData];
      newIntent[index] = value;
      setIntentData(newIntent);
    } else if (type === "knowledge") {
      const newKnowledge = [...knowledgeData];
      newKnowledge[index] = value;
      setKnowledgeData(newKnowledge);
    }
  };

  const handleDelete = (index, type) => {
    if (type === "phrase") {
      const updatedItems = [...intentData];
      updatedItems.splice(index, 1);
      console.log(updatedItems);
      setIntentData(updatedItems);
    } else if (type === "knowledge") {
      const updatedItems = [...knowledgeData];
      updatedItems.splice(index, 1);
      console.log(updatedItems);
      setKnowledgeData(updatedItems);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="loading-icon">
          <LoadingOutlined
            style={{
              fontSize: 50,
            }}
          />
        </div>
      ) : (
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
                value={intentInput}
                style={{ marginTop: 20, marginBottom: 20 }}
                onChange={(e) => {
                  setIntentInput(e.target.value);
                }}
                onPressEnter={() => handleEnter("phrase")}
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
                      onChange={(e) =>
                        handleChange(e.target.value, index, "phrase")
                      }
                    />
                    <Button
                      type="text"
                      onClick={() => handleDelete(index, "phrase")}
                    >
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
                value={knowledgeInput}
                style={{ marginTop: 20, marginBottom: 20 }}
                onChange={(e) => {
                  setKnowledgeInput(e.target.value);
                }}
                onPressEnter={() => handleEnter("knowledge")}
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
                      onChange={(e) =>
                        handleChange(e.target.value, index, "knowledge")
                      }
                    />
                    <Button
                      type="text"
                      onClick={() => handleDelete(index, "knowledge")}
                    >
                      <DeleteFilled />
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateIntent;
