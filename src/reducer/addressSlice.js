import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shoeSantuary_URL } from "./userSlice";

// fetch all addresses
export const fetchAddressesByUser = createAsyncThunk(
  "address/fetchAddressesByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); 
      const response = await axios.get(`${shoeSantuary_URL}/api/address/${userId}/all-address`, {
        headers: {
          Authorization: `${token}`, 
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to fetch addresses"
      );
    }
  }
);

// add a new address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); 
      const response = await axios.post(`${shoeSantuary_URL}/api/address/${userId}/new-address`, formData, {
        headers: {
          Authorization: `${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding address:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add address");
    }
  }
);

// Async thunk to update an address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${shoeSantuary_URL}/api/address/${userId}/all-address/${addressId}`,
        formData,
        {
          headers: {
            Authorization: `${token}`, 
          },
        }
      );
      return response.data
    } catch (error) {
      console.error("Error updating address:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to update address"
      );
    }
  }
);

// Async thunk to delete an address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    if (!userId || !addressId) {
      return rejectWithValue("User ID or Address ID is missing");
    }
    try {
      const token = localStorage.getItem("jwtToken"); 
      await axios.delete(`${shoeSantuary_URL}/api/address/${userId}/all-address/${addressId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return addressId; 
    } catch (error) {
      console.error("Error deleting address:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to delete address"
      );
    }
  }
);

const initialState = {
  address: [],
  status: "idle", 
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddressesByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddressesByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = action.payload; 
      })
      .addCase(fetchAddressesByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Address
      .addCase(addAddress.fulfilled, (state, action) => {
        state.address.push(action.payload);
      })

      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const { id, updatedAddress } = action.payload;
        const index = state.address.findIndex(
          (address) => address._id === id
        );
        if (index !== -1) {
          state.address[index] = updatedAddress;
        }
      })

      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const id = action.payload;
        state.address = state.address.filter(
          (address) => address._id !== id
        );
      });
  },
});

export default addressSlice.reducer;
