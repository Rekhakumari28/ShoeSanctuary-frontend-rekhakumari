import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder } from "../../reducer/productSlice";

const PriceFilterComponent = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state)=>{
    console.log(state.allProducts.sortOrder)
    return state.allProducts.sortOrder
  });

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  return (
   
    <div className="mx-3">
    <h3>Price</h3>
    <label>
      <input
        type="radio"
        value="lowToHigh"
        name="price"
        checked={sortOrder === "lowToHigh"}
        onChange={handleSortChange}
      />{" "}
      Low to high
    </label>{" "}
    <label>
      <input
        type="radio"
        value="highToLow"
        name="price"
        checked={sortOrder === "highToLow"}
        onChange={handleSortChange}
      />{" "}
      High to low
    </label>
  </div>
  );
};

export default PriceFilterComponent;
