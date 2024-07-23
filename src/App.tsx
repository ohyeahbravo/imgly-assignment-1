import { useState, useEffect } from "react";
import Node, { type NodeData } from "./Node";

const DATA_FETCH_URL = "https://ubique.img.ly/frontend-tha/data.json";

function App() {
  const [root, setRoot] = useState<NodeData>({
    label: "Root",
    children: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(DATA_FETCH_URL);
        const data = await response.json();
        setRoot({ ...root, children: data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-screen max-w-lg">
      <div className="mx-4 my-4">
        <Node nodeData={root} isRoot={true} selected={false} />
      </div>
    </div>
  );
}

export default App;
