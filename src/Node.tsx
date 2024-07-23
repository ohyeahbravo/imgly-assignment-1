import { useState, useEffect, useContext } from "react";
import { LeafIcon } from "./assets/LeafIcon.tsx";
import { ExpandedIcon } from "./assets/ExpandedIcon.tsx";
import { CollapsedIcon } from "./assets/CollapsedIcon.tsx";
import { DragContext } from "./App.tsx";

export type NodeData = {
  label: string;
  id?: string;
  children?: NodeData[];
};

export type NodeProps = {
  nodeData: NodeData;
  isRoot?: boolean;
  selected: boolean;
  addr: number[];
};

export default function Node({
  nodeData,
  isRoot = false,
  selected = false,
  addr = [],
}: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCurrentlySelected, setIsCurrentlySelected] = useState(false);
  const [dragEntered, setDragEntered] = useState(false);
  const {
    openedEntryId,
    changeOpenedEntryId,
    changeDraggingNodeAddr,
    changeStructure,
  } = useContext(DragContext);

  useEffect(() => {
    if (selected) {
      setIsCurrentlySelected(true);
    } else {
      setIsCurrentlySelected(false);
    }
  }, [selected]);

  const toggleExpansion = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const clickHandler = () => {
    if (nodeData.children && nodeData.children.length > 0) {
      setIsCurrentlySelected(!isCurrentlySelected);
    } else if (nodeData.id) {
      changeOpenedEntryId(openedEntryId === nodeData.id ? null : nodeData.id);
    }
  };

  const dragStartHandler = () => {
    changeDraggingNodeAddr(addr.slice());
    setDragEntered(false);
  };

  const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragEntered(true);
  };

  const dropHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    changeStructure(addr.slice());
    setDragEntered(false);
  };

  return (
    <div
      className={`${isRoot ? "" : "ml-6 "}flex flex-col items-start gap-y-2`}
    >
      {/* PARENT */}
      <div
        className={`flex flex-row items-center gap-x-2 cursor-pointer text-lg font-medium px-3 py-2 rounded-xl border-2
            border-gray-200
            ${
              dragEntered
                ? " bg-gray-200"
                : isCurrentlySelected
                ? " bg-amber-100"
                : " bg-transparent"
            }
            ${
              openedEntryId === nodeData.id
                ? " border-green-400"
                : " border-gray-200"
            }`}
        onClick={clickHandler}
        draggable={!isRoot}
        onDragStart={dragStartHandler}
        onDragLeave={() => setDragEntered(false)}
        onDragOver={allowDrop}
        onDrop={dropHandler}
      >
        {/* Icon for expand/collapse for nested ones */}
        {nodeData.children && nodeData.children.length > 0 ? (
          <button className="text-lg" onClick={toggleExpansion}>
            {isExpanded ? <ExpandedIcon /> : <CollapsedIcon />}
          </button>
        ) : (
          <button className="text-green-500 text-lg">
            <LeafIcon />
          </button>
        )}
        <button> {nodeData.label}</button>
      </div>
      {/* CHILDREN */}
      {nodeData.children &&
        isExpanded &&
        nodeData.children.map((child: NodeData, key: number) => (
          <Node
            key={key}
            nodeData={child}
            isRoot={false}
            selected={isCurrentlySelected}
            addr={[...addr, key]}
          />
        ))}
    </div>
  );
}
