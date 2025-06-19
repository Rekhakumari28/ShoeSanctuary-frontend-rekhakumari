import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const shoeSantuary_URL = "https://shoe-sanctuary-rekhakumari.vercel.app"

// Async thunk to register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(
       `${shoeSantuary_URL}/api/user/signup`,
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

// Async thunk to login user
export const loginUser = createAsyncThunk(  "user/login",  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${shoeSantuary_URL}/api/user/login`, credentials );
      console.log("Login response:", response.data);
      localStorage.setItem("jwtToken", response.data.jwtToken);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk to fetch user by ID
export const fetchUserById = createAsyncThunk( "user/getUser ", async (userId) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return rejectWithValue("JWT token is required");
    }

    const response = await axios.get(`${shoeSantuary_URL}/api/user/${userId._id}`,{
      headers: {
         Authorization: `${token}`,
       },
     }
   );
   return response.data;
   
   
  }
);

export const updateUser = createAsyncThunk( "user/updateUser ", async (updatedUser, { rejectWithValue }) => {
    const token = localStorage.getItem("jwtToken");
    console.log("Fetching user with token:", token);    
    if (!token) {
      return rejectWithValue("JWT token is required");
    }
    try {
      const response = await axios.post(`${shoeSantuary_URL}/api/user/${updatedUser.userId}`,
        updatedUser,
        {  
            headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response
      console.log(data, "data")
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Async thunk to delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser ",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${shoeSantuary_URL}/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    },
  },
  
  extraReducers: (builder) => {
      //register
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      builder.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //login
      builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
      })
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch user by id
      builder.addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
      })
      builder.addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update user
      builder.addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(action.payload, "payload")
      })
      builder.addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete user
      builder.addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      })
      builder.addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
