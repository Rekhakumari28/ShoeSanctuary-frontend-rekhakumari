import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder, selectSortOrder } from "../../reducer/productSlice";

const PriceFilterComponent = () => {
  const [filterByPrice, setFilterByPrice] = useState("none");
  const dispatch = useDispatch();
  const sortOrder = useSelector(selectSortOrder);

  const handlePriceSort = (event) => {
    setFilterByPrice(event.target.value);
  };

  return (
    // <div>
    //   <h5 className="fw-bolder">Sort by Price</h5>
    //   <label>
    //     <input
    //       type="radio"
    //       value="lowToHigh"
    //       checked={sortOrder === "lowToHigh"}
    //       onChange={handleSortChange}
    //     />{" "}
    //      Low to High
    //   </label>
    //   <br/>
    //   <label>
    //     <input
    //       type="radio"
    //       value="highToLow"
    //       checked={sortOrder === "highToLow"}
    //       onChange={handleSortChange}
    //     />{" "}
    //     High to Low
    //   </label>
    // </div>
    <div className="mx-3">
    <h3>Price</h3>
    <label>
      <input
        type="radio"
        value="Low to high"
        name="price"
        checked={filterByPrice === "Low to high"}
        onChange={handlePriceSort}
      />{" "}
      Low to high
    </label>{" "}
    <label>
      <input
        type="radio"
        value="High to low"
        name="price"
        checked={filterByPrice === "High to low"}
        onChange={handlePriceSort}
      />{" "}
      High to low
    </label>
  </div>
  );
};

export default PriceFilterComponent;
