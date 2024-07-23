export type NodeData = {
  label: string;
  id?: string;
  children?: NodeData[];
};

export type NodeProps = {
  nodeData: NodeData;
  isRoot?: boolean;
};

export default function Node({ nodeData, isRoot = false }: NodeProps) {
  return (
    <div
      className={`${isRoot ? "" : "ml-6 "}flex flex-col items-start gap-y-2`}
    >
      {/* PARENT */}
      <div
        className="flex flex-row items-center gap-x-2 cursor-pointer text-lg font-medium px-3 py-2 rounded-xl border-2
            border-gray-200"
      >
        <button> {nodeData.label}</button>
      </div>
      {/* CHILDREN */}
      {nodeData.children &&
        nodeData.children.map((child: NodeData, key: number) => (
          <Node key={key} nodeData={child} />
        ))}
    </div>
  );
}
