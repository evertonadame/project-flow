import { CreateGenericContext } from "../../shared/context";

const {
  Ctx: FlowContext,
  CtxProvider: FlowProvider,
  useCtx: useFlowContext,
} = CreateGenericContext("flowMain");

export { FlowContext, FlowProvider, useFlowContext };
