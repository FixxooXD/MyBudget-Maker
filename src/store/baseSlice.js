import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: {
    userData: [],
  },
  isLoading: false,
  isError: null,
};

export const AddUser = createAsyncThunk(
  "AddUser",
  async ({ userName, password }) => {
   try {
    const response = await axios.post("http://localhost:3000/auth", {
      user: {
        userName: userName,
        userPassword: password
      }
    });
    return response.data.user;
  }catch(error){
    return { error: error.message };
   }
  }
    
);

export const baseSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser: (state, actions) => {
      let user = {
        userName: actions.payload.userName,
        password: actions.payload.password,
      };
      state.users.userData.push(user);
    },
  },
  extraReducers:(builder) => {
      builder.addCase(AddUser.pending, (state, actions) =>{
        state.isLoading = true
        console.log("pending")
      })
      builder.addCase(AddUser.fulfilled, (state, actions) => {
        console.log(actions.payload)
        // state.users.userData.push(actions.payload)
      })
  }
});

export const { addUser } = baseSlice.actions;
export default baseSlice.reducer;
