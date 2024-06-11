import { Divider, Flex, Button, Input, List, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import axios from "axios";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteLogin } from "../../helpers/loginHelper";
import TextArea from "antd/es/input/TextArea";

const boxStyle = {
  width: "100%",
  height: 50,
  marginTop: 15,
};

const CreateIntent = () => {
  let { id } = useParams();
  const [intentName, setIntentName] = useState("");
  const [intentData, setIntentData] = useState([]);
  const [intentInput, setIntentInput] = useState("");
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [knowledgeInput, setKnowledgeInput] = useState("");
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [knowledgeID, setKnowledgeID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsDisabled(role ? role !== "editor" : true);
    if (location.pathname !== "/intents/new") {
      axios
        .get(`${import.meta.env.APP_SERVER_URL}/intent/${id}`)
        .then((response) => {
          setIntentData(response.data.intentExamples);
          setIntentName(response.data.intentName);
          setIsFollowUp(response.data.followUp);

          axios
            .get(
              `${import.meta.env.APP_SERVER_URL}/knowledge/${response.data._id}`
            )
            .then((response) => {
              setKnowledgeData(response.data.knowledge);
              setKnowledgeID(response.data._id);
            })
            .catch((error) => {
              console.error(error);
              deleteLogin(error, navigate);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
          deleteLogin(error, navigate);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, location.pathname]);

  const handleSubmit = () => {
    if (location.pathname === "/intents/new") {
      axios
        .post(import.meta.env.APP_SERVER_URL + "/intent", {
          intentName,
          intentExamples: intentData,
          followUp: false,
        })
        .then((result) => {
          const intentId = result.data;

          axios
            .post(import.meta.env.APP_SERVER_URL + "/knowledge", {
              intentNameId: intentId,
              knowledge: knowledgeData,
            })
            .then(() => {
              axios
                .post(import.meta.env.APP_SERVER_URL + "/story", {
                  intentName,
                  intentId,
                })
                .then(() => {
                  message.success("Saved!", 2);
                  navigate(`/intents/${intentId}`, { replace: true });
                })
                .catch((error) => {
                  console.log("Stories: ", error);
                  deleteLogin(error, navigate);
                });
            })
            .catch((error) => {
              console.log("Knowledge: ", error);
              deleteLogin(error, navigate);
            });
        })
        .catch((error) => {
          console.log("Intent: ", error);
          deleteLogin(error, navigate);
        });
    } else {
      console.log(import.meta.env.APP_SERVER_URL + "/intent/" + id);
      axios
        .post(import.meta.env.APP_SERVER_URL + "/intent/" + id, {
          intentName,
          intentExamples: intentData,
          followUp: isFollowUp,
        })
        .then(() => {
          axios
            .post(
              import.meta.env.APP_SERVER_URL + "/knowledge/" + knowledgeID,
              {
                knowledge: knowledgeData,
              }
            )
            .then((result) => {
              message.success("Saved!", 2);
            })
            .catch((error) => {
              console.log(error);
              deleteLogin(error, navigate);
            });
        })
        .catch((error) => {
          console.log(error);
          deleteLogin(error, navigate);
        });
    }
  };

  const handleIntentName = (e) => {
    setIntentName(e.target.value);
  };

  const handleEnter = (type) => {
    if (type === "phrase") {
      if (intentInput.trim() !== "") {
        const newItem = intentInput.trim();
        const newIntentData = [...intentData, newItem];
        setIntentData(newIntentData);
        setIntentInput("");
      }
    } else if (type === "knowledge") {
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
      setIntentData(updatedItems);
    } else if (type === "knowledge") {
      const updatedItems = [...knowledgeData];
      updatedItems.splice(index, 1);
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
            <Flex style={boxStyle} justify="flex-start" align="center" gap={30}>
              <NavLink to="/intents">
                <Button>Back</Button>
              </NavLink>

              <Input
                style={{ width: 1550 }}
                size="large"
                placeholder="Intent Name"
                variant="filled"
                value={intentName}
                onChange={handleIntentName}
                disabled={isDisabled}
              />
              <Button
                type="primary"
                onClick={handleSubmit}
                disabled={isDisabled}
              >
                Save
              </Button>
            </Flex>
          </div>
          {isFollowUp ? null : (
            <>
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
                    disabled={isDisabled}
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
                          disabled={isDisabled}
                        />
                        <Button
                          type="text"
                          onClick={() => handleDelete(index, "phrase")}
                          disabled={isDisabled}
                        >
                          <DeleteFilled />
                        </Button>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </>
          )}

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
                disabled={isDisabled}
                onPressEnter={() => handleEnter("knowledge")}
              />
              <List
                dataSource={knowledgeData}
                bordered
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <TextArea
                      style={{ width: "100%" }}
                      value={knowledgeData[index]}
                      variant="Borderless"
                      onChange={(e) =>
                        handleChange(e.target.value, index, "knowledge")
                      }
                      disabled={isDisabled}
                      autoSize
                    />
                    <Button
                      type="text"
                      onClick={() => handleDelete(index, "knowledge")}
                      disabled={isDisabled}
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
