/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, createContext } from "react";
import Node, { type NodeData } from "./Node";

export const DragContext = createContext({
  openedEntryId: null as null | string,
  changeOpenedEntryId: (id: null | string) => {},
  changeDraggingNodeAddr: (addr: number[]) => {},
  changeStructure: (newParentAddr: number[]) => {},
});

const DATA_FETCH_URL = "https://ubique.img.ly/frontend-tha/data.json";

function App() {
  const [root, setRoot] = useState<NodeData>({
    label: "Root",
    children: [],
  });

  const [openedEntryId, setOpenedEntryId] = useState<null | string>(null);
  const [openedEntryContent, setOpenedEntryContent] = useState<null | string>(
    null
  );

  const [draggignNodeAddr, setDraggingNodeAddr] = useState<number[]>([]);

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DATA_FETCH_URL);
        const data = await response.json();
        setRoot({ ...root, children: data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Additional Entry Data Fetch with an ID
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(
          `https://ubique.img.ly/frontend-tha/entries/${openedEntryId}.json`
        );
        const data = await response.json();
        setOpenedEntryContent(JSON.stringify(data));
      } catch (err) {
        setOpenedEntryContent("Fetch failed.");
      }
    };
    if (openedEntryId) {
      fetchEntry();
    }
  }, [openedEntryId]);

  const changeOpenedEntryId = (id: null | string) => {
    setOpenedEntryId(id);
  };

  const changeDraggingNodeAddr = (addr: number[]) => {
    setDraggingNodeAddr(addr);
  };

  const changeStructure = (newParentAddr: number[]) => {
    if (newParentAddr.join().startsWith(draggignNodeAddr.join())) {
      alert("A node can't be moved under its sub-nodes.");
      return;
    }
    const newRoot = { ...root };
    let parent = newRoot;
    newParentAddr.forEach((pos: number) => {
      parent.children && (parent = parent.children[pos]);
    });
    let child = newRoot;
    draggignNodeAddr.forEach((pos: number, idx: number) => {
      if (child.children) {
        if (idx === draggignNodeAddr.length - 1) {
          //remove the child if found
          child = child.children.splice(pos, 1)[0];
          parent["children"] = parent.children
            ? [...parent.children, child]
            : [child];
        } else {
          child = child.children[pos];
        }
      }
    });
    setRoot(newRoot);
    console.log(JSON.stringify(newRoot.children, undefined, 2));
  };

  return (
    <div className="w-screen max-w-lg">
      <div className="mx-4 my-4">
        {/* JSON structure */}
        <DragContext.Provider
          value={{
            openedEntryId,
            changeOpenedEntryId,
            changeDraggingNodeAddr,
            changeStructure,
          }}
        >
          <Node nodeData={root} isRoot={true} selected={false} addr={[]} />
        </DragContext.Provider>
        {/* clicked Leaf Content */}
        {openedEntryId && (
          <div className="fixed top-0 right-0 w-[60vw] h-screen flex items-center justify-center">
            <div className="px-5 py-5 bg-gray-100 rounded-md w-[50vw] h-[80vh] overflow-auto">
              <div className="w-full text-center mb-8 flex flex-col">
                <span className="text-xs">Fetched Entry ID</span>
                <span className="font-semibold text-lg">{openedEntryId}</span>
              </div>
              <p
                className={`${
                  openedEntryContent?.includes("fail") ? "text-red-500" : ""
                }`}
              >
                {openedEntryContent}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
