import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shoeSantuary_URL } from "./userSlice";

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    try {
      const response = await axios.get(
        `${shoeSantuary_URL}/api/products/${productId}`
      );
      // console.log(response.data.data.product)
      return response.data.data.product; 
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

const fetchProductByIdSlice = createSlice({
  name: "ProductById",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchProductByIdSlice.reducer;
