import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shoeSantuary_URL } from "./userSlice";

// Async thunk to add item to bag
export const addItemToBag = createAsyncThunk(
  "shoppingBag/addItem",
  async ({ userId, productId,quantity, title, price, images }, { rejectWithValue }) => {
 
    if (!userId) {
      console.error("User ID is undefined");
      return rejectWithValue("User ID is required to add an item to the bag.");
    }

    try {
      console.log( productId, title, price, images, quantity)
      const response = await axios.post(
       `${shoeSantuary_URL}/api/cart/${userId}/items`,
       { productId, title, price, images, quantity },
        {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Add to bag error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add item");
    }
  }
);

// Async thunk to remove item from bag
export const removeItemFromBag = createAsyncThunk(
  "shoppingBag/removeItem",
  async ({userId, productId}, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${shoeSantuary_URL}/api/cart/${userId}/items/${productId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response, "response")
      return response.data;
    } catch (error) {
      console.error("Remove from bag error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// Async thunk to update item quantity in bag
export const updateItemQuantityInBag = createAsyncThunk(
  "shoppingBag/updateQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      console.log(userId, productId, quantity)
      const response = await axios.post(
        `${shoeSantuary_URL}/api/cart/${userId}/items/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response.data, "response update")
      return response.data;
    } catch (error) {
      console.error("Update quantity error:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "Failed to update quantity"
      );
    }
  }
);

// Async thunk to fetch cart
export const fetchCart = createAsyncThunk(
  "shoppingBag/fetchCart",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return rejectWithValue("Unauthorized, no JWT token found");
    }
    const response = await axios.get(
      `${shoeSantuary_URL}/api/cart/${userId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response.data, "response fetching")
    return response.data;
  }
);

const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBag: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToBag.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(addItemToBag.fulfilled, (state, action) => {
              state.loading = false;
              state.items = action.payload;
                console.log(action.payload, "action.payload adding")
            })
            .addCase(addItemToBag.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            })
      .addCase(removeItemFromBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromBag.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
          console.log(action.payload, "action.payload remove")
      })
      .addCase(removeItemFromBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateItemQuantityInBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantityInBag.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload
          console.log(action.payload, "action.payload update")
      })
      .addCase(updateItemQuantityInBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload
          console.log(action.payload, "action.payload fetch")
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearBag } = shoppingBagSlice.actions;

export default shoppingBagSlice.reducer;
