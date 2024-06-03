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
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.log(error);
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
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
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
            <div key={item._id}>
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
          )}
        />
      </div>
    </>
  );
};

export default IntentIndex;
