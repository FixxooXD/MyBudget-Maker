import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  users: {
    userData: [],
  },
  isLoading: false,
  isError: null,
  isSucess: false
};

export const AddUser = createAsyncThunk(
  "AddUser",
  async ({ userName, password }) => {
   try {
    // const response = await axios.post("https://budget-server-rdid.onrender.com/auth", {
      const response = await axios.post("http://localhost:3000/auth", {
      user: {
        userName: userName,
        userPassword: password
      }
    });

    if(!response.data.user){
      return rejectWithValue('No user found');
    }
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
        state.isError = null
        console.log("pending")
      })
      builder.addCase(AddUser.fulfilled, (state, actions) => {
        if(actions.payload.error){
         state.isLoading = false;
         state.isError = "user is alredy defined"
        }
        console.log(actions.payload)
        state.isSucess = true
        // state.users.userData.push(actions.payload)
      })
      builder.addCase(AddUser.rejected, (state, actions) => {
        console.log(actions.payload)
        // state.users.userData.push(actions.payload)
      })
  }
});

export const { addUser } = baseSlice.actions;
export default baseSlice.reducer;
