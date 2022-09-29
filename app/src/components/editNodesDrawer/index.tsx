import { Node } from "react-flow-renderer";
import Main from "./main";

type Props = {
  data: Node;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
};
const EditNodesDrawer = (props: Props) => {
  return <Main {...props} />;
};

export default EditNodesDrawer;
