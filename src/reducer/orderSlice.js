import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shoeSantuary_URL } from "./userSlice";

// Async thunk to fetch order history
export const fetchOrderHistory = createAsyncThunk(
  "order/fetchOrderHistory",
  async (userId) => {  
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No authentication token found");

      const response = await axios.get(
        `${shoeSantuary_URL}/api/orders/${userId}/order-history`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = response.data
      console.log(data, "response")
      return data
    }
    
);

// Async thunk to fetch order details by order ID
export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(
        `${shoeSantuary_URL}/api/orders/${userId}/order-details/${orderId}`,
        {
          headers: { Authorization: `${token}` },
        }
      );

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      return rejectWithValue({
        message: error.response?.data?.error || "Failed to fetch order details",
        status: error.response?.status,
      });
    }
  }
);

// Async thunk to place a new order
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ userId, cartItems, totalAmount, shippingAddress }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Get the token here!

      if (!token) {
        console.error("JWT token not found in localStorage");
        return rejectWithValue("Unauthorized, JWT token is required");
      }

      if (!userId || !cartItems || !totalAmount || !shippingAddress ) {
        return rejectWithValue("Missing required fields");
      }

      const response = await axios.post(
        `${shoeSantuary_URL}/api/orders/${userId}/place-order`,
        {cartItems, totalAmount, shippingAddress },
        {
         
          headers: {
            Authorization: `${token}`, 
          },
        }
      );
console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error placing order:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

const initialState = {
  orders: [],
  orderDetails: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order history";
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        console.log(action.payload, "action")
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order details";
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Handle order placement success if needed
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to place order";
      });
  },
});

export default orderSlice.reducer;
