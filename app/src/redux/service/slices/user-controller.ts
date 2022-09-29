import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserController = {
  userId: string;
};

const initialState: UserController = {
  userId: "",
};

const setUserIdReducer = (
  state: UserController,
  action: PayloadAction<string>
) => {
  state.userId = action.payload;
};

const userController = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: setUserIdReducer,
  },
});

export const { setUserId } = userController.actions;
export default userController.reducer;
