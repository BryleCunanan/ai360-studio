import { Divider, Input, List, Button, Flex, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { DeleteFilled, UndoOutlined, LoadingOutlined } from "@ant-design/icons";
// import { deleteLogin } from "../../helpers/loginHelper";
import axios from "axios";

const { Search } = Input;

const IntentIndex = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const confirmDeleteRef = useRef(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const navigate = useNavigate();

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
        console.log("story: ", error);
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
              });
          })
          .catch((error) => {
            console.log("Knowledge: ", error);
          });
      })
      .catch((error) => {
        console.log("Add Follow-up: ", error);
      });

    if (!parentIntent.followUpIntents) {
      parentIntent.followUpIntents = [];
    }
    parentIntent.followUpIntents.push(newFollowUp);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  // const handleDeleteFollowUp = (index, followUpIndex) => {
  //   const updatedItems = [...items];
  //   if (followUpIndex !== undefined) {
  //     updatedItems[index].followUps.splice(followUpIndex, 1);
  //   }
  //   setItems(updatedItems);
  //   setFilteredItems(updatedItems);
  // };

  const handleDeleteIntent = (
    index,
    followUpIndex,
    item,
    isFollowUp = false
  ) => {
    const itemIndex = isFollowUp ? followUpIndex : index;
    const newHiddenItems = [...hiddenItems];

    newHiddenItems[index] = true;
    setHiddenItems(newHiddenItems);
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

  const showMessage = (intentName, index, isFollowUp, story_id, intentId) => {
    message.open({
      content: (
        <span>
          Intent "{intentName}" was deleted.
          <Divider type="vertical" />
          <Button
            type="text"
            icon={<UndoOutlined />}
            onClick={() => handleUndo(index, intentName, isFollowUp)}
          />
        </span>
      ),
      duration: 3,
      onClose: () => {
        if (confirmDeleteRef.current) {
          console.log("Deleting... ", {
            story_id,
          });

          const payload = isFollowUp
            ? { isFollowUp, story_id, intentId }
            : { isFollowUp, story_id };

          axios
            .post(import.meta.env.APP_SERVER_URL + "/story-delete", payload)
            .then((result) => {
              if (isFollowUp) {
                const updatedItems = [...items];
                updatedItems[index].followUpIntents.splice(followUpIndex, 1);
                setItems(updatedItems);
                setFilteredItems(updatedItems);
              } else {
                setIsRefresh(true);
              }
              console.log("Deleted: ", result);
            })
            .catch((error) => {});
        }
      },
      key: intentName,
    });
  };

  const handleUndo = (index, key, isFollowUp) => {
    const newHiddenItems = [...hiddenItems];
    const itemIndex = isFollowUp ? index : index;
    newHiddenItems[itemIndex] = false;
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
                                handleDeleteIntent(
                                  index,
                                  followUpIndex,
                                  followUp,
                                  true
                                )
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
