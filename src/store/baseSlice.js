import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  users: {
    userData: [],
  },
  isLoading: false,
  isError: null,
  isSucess: false,
  authenticated: false
};

export const AddUser = createAsyncThunk(
  "AddUser",
  async ({ userName, password }) => {
   try {
    const response = await axios.post("https://budget-server-rdid.onrender.com/auth", {
      // const response = await axios.post("http://localhost:3000/auth", {
        userName: userName,
        userPassword: password
    });
    if(!response.data){
      return rejectWithValue('No user found');
    }
    return response.data;

  }catch(error){
    return { error: error.message };
   }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ userName, password }) => {
   try {
    const response = await axios.post("https://budget-server-rdid.onrender.com/auth/login", {
      // console.log(userName);
      // const response = await axios.post("http://localhost:3000/auth/login", {
          userName: userName,
          userPassword: password
    });
    if(!response.data){
      return rejectWithValue('No user found');
    }
    return response.data;

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
        if(actions.payload.message){
         state.isLoading = false;
         console.log("hehe");
         state.isError = "user is alredy defined"
         state.isSucess = false
        }else{
        console.log(actions.payload)
        state.isLoading = false;
        state.isSucess = true
        state.isError = null
        }
        // state.users.userData.push(actions.payload)
      })
      builder.addCase(AddUser.rejected, (state, actions) => {
        console.log(actions.payload)
        // state.users.userData.push(actions.payload)
      })
      builder.addCase(loginUser.pending, (state, actions) => {
        state.isLoading = true
        // state.users.userData.push(actions.payload)
      })
      builder.addCase(loginUser.fulfilled, (state, actions) => {
        if(actions.payload.error){
        console.log(actions.payload.error);
        state.isLoading = false
        state.isError = "User Not Found or signup baby if not"
        }else{
        state.isLoading = false
        state.isSucess = true
        state.isError = null
        state.authenticated = true
        console.log(actions.payload)
        state.users.userData.push(actions.payload)
        }
        // state.users.userData.push(actions.payload)
      })
  }
});

export const { addUser } = baseSlice.actions;
export default baseSlice.reducer;
