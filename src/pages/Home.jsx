import { Row, Col, Card, Space, Skeleton, Flex } from "antd";
import React from "react";

const Home = () => {
  const cardData = [
    {
      title: "Card 1",
      content: <Skeleton paragraph={{ rows: 10 }} />,
    },
    {
      title: "Card 2",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    // Add more card data as needed
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card>
          <h1>AI360 Studio</h1>
        </Card>
      </Col>
      <Col span={16}>
        <Card>
          <Skeleton active paragraph={{ rows: 9 }} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Skeleton active paragraph={{ rows: 9 }} />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <Skeleton active paragraph={{ rows: 7 }} />
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
