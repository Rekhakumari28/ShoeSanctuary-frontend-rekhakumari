import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { shoeSantuary_URL } from "./userSlice";

// Async thunk to fetch products
export const fetchAllProducts = createAsyncThunk( "product/fetchProducts", async () => {
    try {     
      const response = await axios.get( `${shoeSantuary_URL}/api/products`);     
          const data = response.data
      return data
    } catch (error) {
      throw new Error(
        error.response ? error.response.data : "Failed to fetch data"
      );
    }
  }
);

export const updateProducts = createAsyncThunk( "product/updateProducts", async ({productId, updatedProduct} ) => {
  try {     
    const response = await axios.get( `${shoeSantuary_URL}/api/products/${productId}`, updatedProduct);     
    const data = response.data
    return data
  } catch (error) {
    throw new Error(
      error.response ? error.response.data : "Failed to update data"
    );
  }
}
);

export const fetchProductById = createAsyncThunk("product/fetchProductById", async(productId)=>{
  try {
    const response= await axios.get(`${shoeSantuary_URL}/api/products/${productId}`)
    const data = response.data
    return data
  } catch (error) {
    throw new Error(
      error.response ? error.response.data : "Failed to fetch data"
    );
  }
})

// Create a slice
export const productSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    sortOrder: "lowToHigh",
    priceRange: { min: 100, max: 10000 },
  },
  reducers: {
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch all products
    builder.addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
              state.loading = false;
        state.products = action.payload;
     
      })
      builder.addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      //update product
      builder.addCase(updateProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(updateProducts.fulfilled, (state, action) => {
              state.loading = false;
        state.products = action.payload;
     
      })
      builder.addCase(updateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      //fetchProductById
      builder.addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchProductById.fulfilled, (state, action) => {
              state.loading = false;
        state.products = action.payload;
     
      })
      builder.addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
  },
});

export const { setSortOrder, setPriceRange } = productSlice.actions;

export const selectAllProducts = (state) => state.allProducts.products;
export const selectSortOrder = (state) => state.allProducts.sortOrder;
export const selectPriceRange = (state) => state.allProducts.priceRange;

export default productSlice.reducer;
