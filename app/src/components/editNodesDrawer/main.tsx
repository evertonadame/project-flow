import { Node } from "react-flow-renderer";
import EditNodesDrawer from "./editNodesDrawer";

type Props = {
  data: Node;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
};

const Main = (props: Props) => {
  return <EditNodesDrawer {...props} />;
};

export default Main;
