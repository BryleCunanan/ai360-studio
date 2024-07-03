import { Button, Card, Col, List, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Selection = () => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s",
  });

  const data = [
    {
      title: "Rasa",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, temporibus!",
      icon: <>icown</>,
    },
  ];

  useEffect(() => {
    setStyle({ opacity: 1, transition: "opacity 0.5s" });
  }, []);

  return (
    <div
      style={
        (style,
        {
          padding: 10,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })
      }
    >
      <h1 style={{}}>Select a Model</h1>
      <List
        dataSource={data}
        renderItem={(item) => (
          <NavLink to="rasa">
            <Card hoverable>
              <h1>{item.title}</h1>
              {item.icon}
            </Card>
          </NavLink>
        )}
      />
    </div>
  );
};

export default Selection;
