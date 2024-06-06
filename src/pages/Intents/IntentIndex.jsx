import { Divider, Input, List, Button, Flex, message } from "antd";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { DeleteFilled, UndoOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Search } = Input;

const IntentIndex = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followUpItems, setFollowUpItems] = useState([]);
  const confirmDeleteRef = useRef(true);

  useEffect(() => {
    //Get data from database
    //   [
    //     {
    //         "_id": "66613994d67a49d2e42e6c35",
    //         "story_name": "parking_6pGz0",
    //         "parentIntentId": "6653ea8d163616451561a219",
    //         "parentIntentName": "parking ng lolo mo",
    //         "followUpIntents": [
    //             {
    //                 "intentName": "parking - custom",
    //                 "intentId": "6661008736deb653ac63e512"
    //             },
    //             {
    //                 "intentName": "nails_- custom",
    //                 "intentId": "66610cc53b1d176c293e02e2"
    //             }
    //         ]
    //     }
    // ]
    axios
      .get(import.meta.env.APP_SERVER_URL + "/story")
      .then((response) => {
        const data = response.data;
        console.log("List of Intents: ", data);
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.log("List of Intents:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddFollowUp = (index) => {
    const updatedItems = [...items];
    const parentIntent = updatedItems[index];
    newFollowUp = parentIntent.intentName + " - custom";
    axios
      .post(import.meta.env.APP_SERVER_URL + "/intent", {
        intentName: newFollowUp,
        intentExamples: [],
        followUp: true,
      })
      .then((intentId) => {
        console.log("Add Follow up: ", intentId.data);
        axios
          .post(import.meta.env.APP_SERVER_URL + "/knowledge", {
            intentId: intentId.data,
            knowledge: [],
          })
          .then((knowledgeId) => {
            console.log("Knowledge: ", knowledgeId);
            axios
              .post(import.meta.env.APP_SERVER_URL + "/story", {
                intentName: newFollowUp,
                intentId: intentId.data,
              })
              .then((result) => {
                console.log("Stories: ", result);
              })
              .catch((error) => {
                console.log("Stories: ", error);
              });
          })
          .catch((error) => {
            console.log("Knowledge: ", error);
          });
      })
      .catch((error) => {
        console.log("Add Follow-up: ", error);
      });

    const newFollowUp = {
      ...parentIntent,
      intentName: `${parentIntent.parentIntentName} - custom`,
    };
    if (!parentIntent.followUpIntents) {
      parentIntent.followUpIntents = [];
    }
    console.log("newFollowUp: ", newFollowUp.intentName);
    parentIntent.followUpIntents.push(newFollowUp);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleDeleteFollowUp = (index, followUpIndex) => {
    const updatedItems = [...items];
    if (followUpIndex !== undefined) {
      updatedItems[index].followUps.splice(followUpIndex, 1);
    }
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleDeleteIntent = (index) => {
    const newHiddenItems = [...hiddenItems];
    newHiddenItems[index] = true;
    setHiddenItems(newHiddenItems);
    confirmDeleteRef.current = true;

    message.open({
      content: (
        <span>
          Intent "{items[index].intentName}" was deleted.
          <Divider type="vertical" />
          <Button
            type="text"
            icon={<UndoOutlined />}
            onClick={() => handleUndo(index, items[index].intentName)}
          />
        </span>
      ),
      duration: 5,
      onClose: () => {
        if (confirmDeleteRef.current) {
          console.log("Deleting... ", items[index]._id);
          axios
            .delete(import.meta.env.APP_SERVER_URL + "/story/delete", [
              items[index]._id,
            ])
            .then((result) => {
              console.log("Deleted: ", result);
            });
        }
      },
      key: items[index].intentName,
    });
  };

  const handleUndo = (index, key) => {
    const newHiddenItems = [...hiddenItems];
    newHiddenItems[index] = false;
    setHiddenItems(newHiddenItems);
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
      axios
        .get(import.meta.env.APP_SERVER_URL + "/intent/search/" + value)
        .then((response) => {
          console.log("Search: ", response.data);
          setFilteredItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
          <Flex style={{ width: "100%" }} justify="space-evenly" align="center">
            <Search
              placeholder="Search Intents"
              allowClear
              onChange={onSearch}
              style={{ width: "100%", maxWidth: 800 }}
              size="large"
            />
            <NavLink to="new">
              <Button type="primary">Create Intent</Button>
            </NavLink>
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
                !hiddenItems[index] && (
                  <div key={item.parentIntentName}>
                    <List.Item
                      className="intent-item"
                      actions={[
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
                          onClick={() => handleDeleteIntent(index)}
                        >
                          <DeleteFilled />
                        </Button>,
                      ]}
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
                      renderItem={(followUp, followUpIndex) => (
                        <List.Item
                          actions={[
                            <Button
                              className="delete-btn"
                              type="text"
                              onClick={() =>
                                handleDeleteFollowUp(index, followUpIndex)
                              }
                              icon={<DeleteFilled />}
                            />,
                          ]}
                        >
                          <NavLink to={followUp.intentId}>
                            {followUp.intentName}
                          </NavLink>
                        </List.Item>
                      )}
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
