import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  workspace: [],
  tasks: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setSignOut: (state) => {
      state.name = null;
      state.email = null;
    },
    getWorkspace: (state, action) => {
      state.workspace = action.payload.workspace;
    }
  }
})

export const { setUserLogin, setSignOut } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectWorkspace = (state) => state.user.workspace;
export const selectTasks = (state) => state.user.tasks;

export default userSlice.reducer;