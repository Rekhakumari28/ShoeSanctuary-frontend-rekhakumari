// wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shoeSantuary_URL } from "./userSlice";

// Async thunk to add item to wishlist
export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItem",
  async ({ userId, productId, title, price, images }, { rejectWithValue }) => {
    if (!userId) {
      console.error("User ID is undefined");
      return rejectWithValue(
        "User ID is required to add an item to the wishlist."
      );
    }
    try {
      const response = await axios.post(`${shoeSantuary_URL}/api/wishlist/${userId}/items`,
        { productId, title, price, images },
        {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Add to wishlist error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

// Async thunk to remove item from wishlist
export const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${shoeSantuary_URL}/api/wishlist/${data.userId}/items/${data.productId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response, "wishlist")
      return response.data;
    } catch (error) {
      console.error("Remove from wishlist error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// Async thunk to fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return rejectWithValue("Unauthorized, no JWT token found");
    }

    try {
      const response = await axios.get(
        `${shoeSantuary_URL}/api/wishlist/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
     
      return response.data;
    } catch (error) {
      console.error("Fetch wishlist error:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to fetch wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeItemFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeItemFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
