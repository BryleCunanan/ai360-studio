import React, { useState, Component, useEffect } from "react";
import { List, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

const IntentComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://172.17.21.48:3000/intent")
      .then((response) => {
        // console.log(response.data);
        setItems(response.data);
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
      updatedItems[index].followUps = []; // Initialize followUps if it doesn't exist
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

  return (
    <>
      <List
        style={{ textAlign: "left" }}
        itemLayout="horizontal"
        dataSource={items}
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
    </>
  );
};

export default IntentComponent;
