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
  const confirmDeleteRef = useRef(true);

  useEffect(() => {
    axios
      .get(import.meta.env.APP_SERVER_URL + "/intent")
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddFollowUp = (index) => {
    const updatedItems = [...items];
    const parentIntent = updatedItems[index];
    const newFollowUp = {
      ...parentIntent,
      name: `${parentIntent.intentName} - custom`,
    };
    if (!parentIntent.followUps) {
      parentIntent.followUps = [];
    }
    console.log("newFollowUp: ", newFollowUp.name);
    parentIntent.followUps.push(newFollowUp);
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
          <Divider orientation="left">Intents</Divider>
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
                  <div key={item._id}>
                    <List.Item
                      style={{}}
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
                      key={item._id}
                    >
                      <NavLink to={item._id}>{item.intentName}</NavLink>
                    </List.Item>
                    <List
                      style={{
                        paddingLeft:
                          (item.followUps?.length ?? 0) > 0 ? "20px" : "0",
                      }}
                      locale={{ emptyText: " " }}
                      dataSource={item.followUps ?? []}
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
                          <NavLink to={followUp._id}>{followUp.name}</NavLink>
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
