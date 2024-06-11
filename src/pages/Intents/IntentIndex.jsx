import { Divider, Input, List, Button, Flex, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { DeleteFilled, UndoOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { deleteLogin } from "../../helpers/loginHelper";

const { Search } = Input;

const IntentIndex = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hiddenParents, setHiddenParents] = useState([]);
  const [hiddenFollowUps, setHiddenFollowUps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const confirmDeleteRef = useRef(true);
  const [isRefresh, setIsRefresh] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsDisabled(role ? role !== "editor" : true);
    axios
      .get(import.meta.env.APP_SERVER_URL + "/story")
      .then((response) => {
        const data = response.data;
        console.log("List of Intents: ", data);
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.log("story: ", error);
        deleteLogin(error, navigate);
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefresh(false);
      });
  }, [isRefresh]);

  const handleAddFollowUp = (index) => {
    const updatedItems = [...items];
    const parentIntent = updatedItems[index];
    const newFollowUp = parentIntent.parentIntentName + " - custom";
    console.log("newFollowUp", newFollowUp);
    const parentStory = parentIntent._id;
    axios
      .post(import.meta.env.APP_SERVER_URL + "/intent", {
        intentName: newFollowUp,
        intentExamples: [],
        followUp: true,
      })
      .then((intentId) => {
        console.log("Add Follow up: ", {
          intentName: newFollowUp,
          intentId: [parentIntent.parentIntentId, intentId.data],
        });

        axios
          .post(import.meta.env.APP_SERVER_URL + "/knowledge", {
            intentNameId: intentId.data,
            knowledge: [],
          })
          .then((knowledgeId) => {
            console.log("Knowledge: ", knowledgeId);

            axios
              .post(import.meta.env.APP_SERVER_URL + "/story/" + parentStory, {
                parentIntentId: parentIntent.parentIntentId,
                followUpIntentId: intentId.data,
              })
              .then((result) => {
                console.log("Stories: ", result);
                setIsRefresh(true);
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
        console.log("Add Follow-up: ", error);
        deleteLogin(error, navigate);
      });

    if (!parentIntent.followUpIntents) {
      parentIntent.followUpIntents = [];
    }
    parentIntent.followUpIntents.push(newFollowUp);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleDeleteIntent = (
    index,
    followUpIndex = null,
    item,
    isFollowUp = false
  ) => {
    const itemIndex = isFollowUp ? followUpIndex : index;
    const newHiddenitems = isFollowUp
      ? [...hiddenFollowUps]
      : [...hiddenParents];

    newHiddenitems[itemIndex] = true;

    isFollowUp
      ? setHiddenFollowUps(newHiddenitems)
      : setHiddenParents(newHiddenitems);

    confirmDeleteRef.current = true;

    const intentName = isFollowUp
      ? filteredItems[index].followUpIntents[followUpIndex].intentName
      : filteredItems[index].parentIntentName;
    const intentId = isFollowUp
      ? filteredItems[index].followUpIntents[followUpIndex].intentId
      : filteredItems[index].parentIntentId;

    const story_id = filteredItems[index]._id;

    showMessage(intentName, itemIndex, isFollowUp, story_id, intentId);
  };

  const showMessage = (
    intentName,
    itemIndex,
    isFollowUp,
    story_id,
    intentId
  ) => {
    message.open({
      content: (
        <span>
          Intent "{intentName}" was deleted.
          <Divider type="vertical" />
          <Button
            type="text"
            icon={<UndoOutlined />}
            onClick={() => handleUndo(itemIndex, intentName, isFollowUp)}
          />
        </span>
      ),
      duration: 3,
      onClose: () => {
        if (confirmDeleteRef.current) {
          const payload = isFollowUp
            ? { isFollowUp, story_id, intentId }
            : { isFollowUp, story_id };

          axios
            .post(import.meta.env.APP_SERVER_URL + "/story-delete", payload)
            .then((result) => {
              setIsRefresh(true);
              console.log("Deleted: ", result);
            })
            .catch((error) => {
              console.log(error);
              deleteLogin(error, navigate);
            });
        }
      },
      key: intentName,
    });
  };

  const handleUndo = (itemIndex, key, isFollowUp) => {
    const newHiddenitems = isFollowUp
      ? [...hiddenFollowUps]
      : [...hiddenParents];

    newHiddenitems[itemIndex] = false;
    isFollowUp
      ? setHiddenFollowUps(newHiddenitems)
      : setHiddenParents(newHiddenitems);
    confirmDeleteRef.current = false;
    message.destroy(key);
  };

  const onSearch = (e, value) => {
    if (typeof value != "string") {
      value = e.target.value;
    }
    if (value.trim() === "") {
      setFilteredItems(items);
    } else {
      const filteredItems = items.filter((item) =>
        item.parentIntentName.toLowerCase().includes(value.toLowerCase())
      );

      // Update the state with the filtered items
      setFilteredItems(filteredItems);
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
        <>
          <Flex style={{ width: "100%" }} justify="space-around" align="center">
            <Search
              placeholder="Search Intents"
              allowClear
              onChange={onSearch}
              style={{ width: "100%", maxWidth: 800 }}
              size="large"
            />
            <NavLink to="new">
              <Button type="primary" disabled={isDisabled}>
                Create Intent
              </Button>
            </NavLink>
            <Button type="primary" disabled>
              Train Chatbot
            </Button>
          </Flex>
          <Divider orientation="left">Intents</Divider> {/* LIST OF INTENTS */}
          <div>
            <List
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 6,
              }}
              style={{ textAlign: "left" }}
              itemLayout="horizontal"
              dataSource={filteredItems}
              renderItem={(item, index) =>
                !hiddenParents[index] && (
                  <div key={item.parentIntentName}>
                    <List.Item
                      className="intent-item"
                      actions={
                        isDisabled
                          ? null
                          : [
                              <Button
                                className="follow-up-btn"
                                type="text"
                                onClick={() => handleAddFollowUp(index)}
                              >
                                Add Follow-up Intent
                              </Button>,
                              <Button
                                className="delete-btn"
                                type="text"
                                onClick={() =>
                                  handleDeleteIntent(index, index, item, false)
                                }
                              >
                                <DeleteFilled />
                              </Button>,
                            ]
                      }
                      key={item.parentIntentName}
                    >
                      <NavLink to={item.parentIntentId}>
                        {item.parentIntentName}
                      </NavLink>
                    </List.Item>
                    <List
                      style={{
                        paddingLeft: 20,
                      }}
                      locale={{ emptyText: " No intents" }}
                      dataSource={item.followUpIntents}
                      renderItem={(followUp, followUpIndex) =>
                        !hiddenFollowUps[followUpIndex] && (
                          <List.Item
                            actions={
                              isDisabled
                                ? null
                                : [
                                    <Button
                                      className="delete-btn"
                                      type="text"
                                      onClick={() =>
                                        handleDeleteIntent(
                                          index,
                                          followUpIndex,
                                          followUp,
                                          true
                                        )
                                      }
                                      icon={<DeleteFilled />}
                                    />,
                                  ]
                            }
                          >
                            <NavLink to={followUp.intentId}>
                              {followUp.intentName}
                            </NavLink>
                          </List.Item>
                        )
                      }
                    />
                  </div>
                )
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default IntentIndex;
