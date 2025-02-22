import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import {
  useGetOrderItems,
  useGetWishlist,
} from "../../components/FatchingData";
import useFetch from "../../useFetch";

const Products = () => {
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByRating, setFilterByRating] = useState(0);
  const [filterByPrice, setFilterByPrice] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const { orderItems } = useGetOrderItems();
  const { wishlist } = useGetWishlist();

  const ref = useRef([]);
  const refPrice1 = useRef([null]);
  const refPrice2 = useRef([null]);

  const { data, loading, error } = useFetch("https://backend-shoesanctuary-major-project.vercel.app/api/products")

  const productCategory = useParams();

  //handle filter by category
  const handleCategoryCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterByCategory((prevValue) => [...prevValue, value]);
    }
    else {
      setFilterByCategory((prevValue) =>
        prevValue.filter((prev) => prev != value)
      );
    }
  };

  let filteredData = data?.filter((product) => product.category?.category.includes(productCategory.productCategory));

  
  const categoryFilter =
    filterByCategory.length === 0
      ? filteredData && filteredData.length !== 0
       ? filteredData 
       : data
      : data?.filter((prod) =>
        filterByCategory.includes(prod.category?.category)
      );


  //handle filter by rating

  const ratingFilter = !filterByRating
    ? categoryFilter
    : categoryFilter?.filter(
      (prod) => prod.rating >= filterByRating && prod.rating < 5
    );

  //handle filter by price sorting
  const handlePriceSort = (event) => {
    setFilterByPrice(event.target.value);
  };

  const filterPrice =
    filterByPrice === ""
      ? ratingFilter
      : filterByPrice === "Low to high"
        ? ratingFilter?.sort(
          (firstItem, secondItem) => firstItem.price - secondItem.price
        )
        : ratingFilter?.sort(
          (firstItem, secondItem) => secondItem.price - firstItem.price
        );

  //handle crear all filters
  const handleClearFilter = () => {
    ref.current.forEach((num) => (num.checked = false));
    setFilterByCategory([]);
    setFilterByRating(0);
    setFilterByPrice("");
    refPrice1.current.checked = false;
    refPrice2.current.checked = false;
  };

  const handleSearchProductFromNavbar =
    searchProduct === ""
      ? filterPrice
      : filterPrice?.filter((product) => {
        const categoryMatch = product.category.category
          .toLowerCase()
          .includes(searchProduct);
        const productMatch = product.title
          .toLowerCase()
          .includes(searchProduct);
        return categoryMatch || productMatch;
      });

  return (
    <div>
      <Header
        value={searchProduct}
        searchProducts={(event) => setSearchProduct(event.target.value)}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-body-tertiary">
            {/* categoryFilter */}
            <div className="mx-3">
              <label className="my-2">
                <h3>Category</h3>
              </label>
              <br />
              <label className="my-2">
                <input
                  ref={(element) => {
                    ref.current[0] = element;
                  }}
                  type="checkbox"
                  name="Men"
                  value="Men"
                  checked={filterByCategory.length === 0 ? filteredData?.map(prod=>prod.category?.category).includes("Men") : filterByCategory.includes("Men")}
                  onChange={handleCategoryCheckbox}
                />{" "}
                Men{" "}
              </label>
              <br />
              <label className="my-2">
                <input
                  ref={(element) => {
                    ref.current[1] = element;
                  }}
                  type="checkbox"
                  name="Women"
                  value="Women"
                  checked={filterByCategory.length === 0 ? filteredData?.map(prod=>prod.category?.category).includes("Women") : filterByCategory.includes("Women")}
                  onChange={handleCategoryCheckbox}
                />{" "}
                Women{" "}
              </label>
              <br />
              <label className="my-2">
                <input
                  ref={(element) => {
                    ref.current[2] = element;
                  }}
                  type="checkbox"
                  name="Girls"
                  value="Girls"
                  checked={filterByCategory.length === 0 ? filteredData?.map(prod=>prod.category?.category).includes("Girls") : filterByCategory.includes("Girls")}
                  onChange={handleCategoryCheckbox}
                />{" "}
                Girls{" "}
              </label>
              <br />
              <label className="my-2">
                <input
                  ref={(element) => {
                    ref.current[3] = element;
                  }}
                  type="checkbox"
                  name="Boys"
                  value="Boys"
                  checked={filterByCategory.length === 0 ? filteredData?.map(prod=>prod.category?.category).includes("Boys") : filterByCategory.includes("Boys")}
                  onChange={handleCategoryCheckbox}
                />{" "}
                Boys{" "}
              </label>
              <br />
            </div>

            {/* ratingFilter */}
            <div className="mx-3">
              <h3>Rating</h3>
              <label className="my-2">
                <input
                  type="range"
                  value={filterByRating}
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(event) => setFilterByRating(event.target.value)}
                />
                {filterByRating}
              </label>
            </div>

            {/* sortPriceFilter */}
            <div className="mx-3">
              <h3>Price</h3>
              <label>
                <input
                  type="radio"
                  value="Low to high"
                  name="price"
                  ref={refPrice1}
                  onChange={handlePriceSort}
                />{" "}
                Low to high
              </label>{" "}
              <label>
                <input
                  type="radio"
                  value="High to low"
                  name="price"
                  ref={refPrice2}
                  onChange={handlePriceSort}
                />{" "}
                High to low
              </label>
            </div>

            {/* clearFilter */}
            <div className="mt-3 mx-3">
              <h4>
                Clear Filter{" "}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleClearFilter}
                >
                  Clear
                </button>{" "}
              </h4>
            </div>
          </div>

          <div className="col-md-10">
            {loading && (
              <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
                Loading...
              </p>
            )}
            {error && (
              <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
                {error}
              </p>
            )}
            <div className="row ms-2 mb-5">
              {handleSearchProductFromNavbar?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wishlist={wishlist}
                  orderItems={orderItems}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Products;
