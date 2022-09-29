import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { createNodeApi } from "../service/nodes";
import { userApi } from "../service/user";
import userControllerReducer from "../service/slices/user-controller";

export const store = configureStore({
  reducer: {
    [createNodeApi.reducerPath]: createNodeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userControllerReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      createNodeApi.middleware,
      userApi.middleware
    );
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
