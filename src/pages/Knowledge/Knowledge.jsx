import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { LoadingOutlined } from "@ant-design/icons";

import "reactflow/dist/style.css";

const Knowledge = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [intentData, setIntentData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.APP_SERVER_URL + "/intent")
      .then((response) => {
        const data = response.data;
        console.log(data);
        setIntentData(
          data.map((item, index) => ({
            id: item._id,
            position: { x: 0, y: 0 },
            data: { label: item.intentName },
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "parking" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "utter_parking" } },

    { id: "3", position: { x: 0, y: 200 }, data: { label: "mercedes-benz" } },

    {
      id: "4",
      position: { x: 0, y: 300 },
      data: { label: "business center 6" },
    },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e2-4", source: "2", target: "4" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(intentData);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <>
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <div style={{ width: "85vw", height: "83vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant="lines" gap={12} size={2} />
          </ReactFlow>
        </div>
      )}
    </>
  );
};

export default Knowledge;
