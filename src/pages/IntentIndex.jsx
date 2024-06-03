import { Divider, Input, List, Button, Flex } from "antd";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import axios from "axios";

const { Search } = Input;

const IntentIndex = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.APP_SERVER_URL + "/intent")
      .then((response) => {
        // console.log(response.data);
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddFollowUp = (index) => {
    const parentIntent = items[index];
    const newFollowUp = {
      ...parentIntent,
      name: `${parentIntent.name} - custom`,
    };
    const updatedItems = [...items];
    if (!updatedItems[index].followUps) {
      updatedItems[index].followUps = [];
    }
    updatedItems[index].followUps.push(newFollowUp);
    setItems(updatedItems);
  };

  const handleDeleteIntent = (index, followUpIndex) => {
    const updatedItems = [...items];
    if (followUpIndex !== undefined) {
      updatedItems[index].followUps.splice(followUpIndex, 1);
    } else {
      updatedItems.splice(index, 1);
    }
    setItems(updatedItems);
  };

  const onSearch = (value) => {
    if (typeof value != "string") {
      value = event.target.value;
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
      <Flex style={{ width: "100%" }} justify="space-evenly" align="center">
        <Search
          placeholder="Search Intents"
          allowClear
          onSearch={onSearch}
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
          style={{ textAlign: "left" }}
          itemLayout="horizontal"
          dataSource={filteredItems}
          renderItem={(item, index) => (
            <div>
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
                key={item._id}
              >
                <NavLink to={item._id}>{item.intentName}</NavLink>
              </List.Item>
              <List
                style={{
                  paddingLeft: (item.followUps?.length ?? 0) > 0 ? "20px" : "0",
                }}
                locale={{ emptyText: " " }}
                dataSource={item.followUps ?? []}
                renderItem={(followUp, followUpIndex) => (
                  <List.Item
                    className="intent-"
                    actions={[
                      <Button
                        className="delete-btn"
                        type="text"
                        onClick={() => handleDeleteIntent(index, followUpIndex)}
                        icon={<DeleteFilled />}
                      />,
                    ]}
                  >
                    <NavLink to="intentdummy">{followUp.name}</NavLink>
                  </List.Item>
                )}
              />
            </div>
          )}
        />
      </div>
    </>
  );
};

export default IntentIndex;
