import { useState, useEffect } from "react";
import { LeafIcon } from "./assets/LeafIcon.tsx";
import { ExpandedIcon } from "./assets/ExpandedIcon.tsx";
import { CollapsedIcon } from "./assets/CollapsedIcon.tsx";

export type NodeData = {
  label: string;
  id?: string;
  children?: NodeData[];
};

export type NodeProps = {
  nodeData: NodeData;
  isRoot?: boolean;
  selected: boolean;
};

export default function Node({
  nodeData,
  isRoot = false,
  selected = false,
}: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCurrentlySelected, setIsCurrentlySelected] = useState(false);

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
    setIsCurrentlySelected(!isCurrentlySelected);
  };

  return (
    <div
      className={`${isRoot ? "" : "ml-6 "}flex flex-col items-start gap-y-2`}
    >
      {/* PARENT */}
      <div
        className={`flex flex-row items-center gap-x-2 cursor-pointer text-lg font-medium px-3 py-2 rounded-xl border-2
            border-gray-200
            ${isCurrentlySelected ? " bg-amber-100" : " bg-transparent"}`}
        onClick={clickHandler}
      >
        {" "}
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
          <Node key={key} nodeData={child} selected={isCurrentlySelected} />
        ))}
    </div>
  );
}
