import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import ReactFlow, { useNodesState } from "react-flow-renderer";
import { useAppSelector } from "../../redux/app/hooks";
import { useGetUserInfoQuery } from "../../redux/service/nodes";
import CreateNodes from "../createNodes";
import EditNodesDrawer from "../editNodesDrawer";
import { useFlowContext } from "./context";
import { makeStringNumbersToPosition } from "./flowHelpers";

const Flow = () => {
  const { id } = parseCookies();
  const { userId } = useAppSelector((state) => state.user);
  const idToFetch = userId ? userId : id ?? "";
  const [state, dispatch] = useFlowContext();
  const { items } = state;
  const [open, setOpen] = useState(false);
  const { data, isSuccess } = useGetUserInfoQuery(idToFetch, {
    skip: idToFetch.length === 0,
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(items);

  const { nodes: userNodes = [] } = data ?? {};

  const formatedNodes = userNodes.map((node: any) => {
    return {
      ...node,
      id: node.nodeId,
      data: { label: node.label },
      position: makeStringNumbersToPosition(node.position),
    };
  });

  useEffect(() => {
    if (isSuccess && formatedNodes.length > 0) {
      dispatch({
        type: "createFlow",
        payload: {
          data: formatedNodes,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    setNodes(items);
  }, [items]);

  const onNodeDragStop = (values: any) => {
    const draggingNode = nodes.find((node) => node.dragging);
    console.log(draggingNode);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        snapToGrid
        onNodeDragStop={onNodeDragStop}
        onNodesChange={onNodesChange}
        onDoubleClick={() => setOpen(true)}
        attributionPosition="top-right"
      >
        <svg
          className="react-flow__background react-flow__container"
          style={{ width: "100%", height: "100%" }}
        >
          <pattern
            id="pattern-0"
            x="3.858839899978925"
            y="9.118343165510367"
            width="21.96690676102026"
            height="21.96690676102026"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="0.5857841802938737"
              cy="0.5857841802938737"
              r="0.5857841802938737"
              fill="#81818a"
            ></circle>
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-0)"
          ></rect>
        </svg>
        <CreateNodes />
        {/* <EditNodesDrawer data={items} open={open} setOpen={setOpen} /> */}
      </ReactFlow>
    </>
  );
};

export default Flow;
