import { Row, Col, Card, Space, Skeleton, Flex } from "antd";
import React from "react";

const Home = () => {
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
