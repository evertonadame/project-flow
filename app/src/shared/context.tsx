import React, {
  Reducer,
  Dispatch,
  PropsWithChildren,
  useReducer,
  createContext,
} from "react";
import { NodeCreateDto } from "./types/node.dto";

export function CreateContext<StateType, ActionType>(
  name: string,
  reducer: Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: Dispatch<ActionType> = () => initialState;
  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch,
  });
  ctx.displayName = name;
  function Provider(props: PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
      reducer,
      initialState
    );
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  }

  return [ctx, Provider] as const;
}

export const CreateGenericContext = (name: string) => {
  const initialState: { items: NodeCreateDto[] } = {
    items: [],
  };

  type AppState = typeof initialState;

  type Action =
    | { type: "reset" }
    | {
        type: "createFlow";
        payload: { data: NodeCreateDto[] };
      }
    | { type: "deleteFlow"; payload: { id: string } }
    | {
        type: "updateFlowPosition";
        payload: { data: NodeCreateDto };
      }
    | {
        type: "updateFlow";
        payload: { data: NodeCreateDto };
      };

  function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
      case "reset":
        return initialState;
      case "createFlow":
        return {
          ...state,
          items: [...state.items, ...action.payload.data],
        };
      case "deleteFlow":
        return {
          ...state,
          items: state.items.filter(({ id }) => id !== action.payload.id),
        };
      case "updateFlowPosition":
        return {
          ...state,
          items: state.items.map((item) => {
            const { id } = item;
            const { data } = action.payload;

            return {
              ...item,
              position: data.id === id ? data.position : item.position,
            };
          }),
        };
      case "updateFlow":
        return {
          ...state,
          items: state.items.map((item) => {
            const { id } = item;
            const { data } = action.payload;

            return {
              ...item,
              data: data.id === id ? { label: data.data.label } : item.data,
            };
          }),
        };

      default:
        throw new Error();
    }
  }

  const [Ctx, CtxProvider] = CreateContext(name, reducer, initialState); // [ctx, CtxProvider]

  const useCtx = (): [typeof initialState, React.Dispatch<Action>] => {
    const theContext = React.useContext(Ctx);
    if (theContext === undefined)
      throw new Error(`No provider for ${name} context`);
    return [theContext.state, theContext.dispatch];
  };

  return {
    Ctx,
    CtxProvider,
    useCtx,
  };
};
