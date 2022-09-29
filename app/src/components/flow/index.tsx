import { FlowProvider } from "./context";
import Main from "./main";

const Flow = () => {
  return (
    <FlowProvider>
      <Main />
    </FlowProvider>
  );
};

export default Flow;
