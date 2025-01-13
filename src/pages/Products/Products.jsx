import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Products = ({ products, loadingProducts, errorProducts }) => {
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByRating, setFilterByRating] = useState(0);
  const [filterByPrice, setFilterByPrice] = useState("");

  const ref = useRef([]);
  const refPrice1 = useRef([null]);
  const refPrice2 = useRef([null]);
  const productCategory = useParams();

  //handle filter by category
  const handleCategoryCheckbox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFilterByCategory((prevValue) => [...prevValue, value]);
    } else {
      setFilterByCategory((prevValue) =>
        prevValue.filter((prev) => prev != value)
      );
    }
  };

  const categoryFilter =
    filterByCategory.length === 0
      ? products
      : products.filter((prod) =>
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

  // handle category directally from home page

  const categoryFromHomePage = !productCategory.productCategory
    ? filterPrice
    : filterPrice?.filter(
        (prod) => prod?.category?.category === productCategory.productCategory
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

  //add to wishlist
  const handleAddToWishlist = async (object) => {
    const value = object;
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/wishlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: value }),
        }
      );
      if (!response.ok) {
        throw "Failed to add product.";
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        toast.success("Product is added to the wishlist.");
      }
    } catch (error) {
      toast.error("Error: ", error);
    }
  };

  //add to cart
  const handleAddToCart = async (object) => {
    const value = object;
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: value }),
        }
      );
      if (!response.ok) {
        throw "Failed to add product to cart.";
      }
      const data = await response.json();
      if(data){
        toast.success("Product is added to the cart");
      }     
    } catch (error) {
      toast.error("Error: ", error);
    }
  };

  const handleDisable = (event)=>{
    event.target.disabled = true;
  }

  return (
    <div>
      <Header />
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
                name="category"
                value="Men"
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
                name="category"
                value="Women"
                onChange={handleCategoryCheckbox}
              />{" "}
              Women{" "}
            </label>
            <br />
            <label className="my-2">
              <input
                ref={(element) => {
                  ref.current[3] = element;
                }}
                type="checkbox"
                name="category"
                value="Girls"
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
                name="category"
                value="Boys"
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
          <div className="row">
            {loadingProducts ? (
              <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
                Loading...
              </p>
            ) : errorProducts ? (
              <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
                {errorProducts}
              </p>
            ) : (
              categoryFromHomePage?.map((product) => (
                <div className="col-md-3 my-2 p-2" key={product._id}>
                  <div key={product._id}>
                    <div
                      style={{ height: "260px", width: "230px" }}
                      className="card bg-white border border-0 shadow mt-3"
                    >
                      {" "}
                      <div className="text-center ">
                        <Link to={`/productDetails/${product._id}`}>
                          <img
                            style={{ height: "150px", width: "150px" }}
                            className="img-fluid rounded  mt-1"
                            src={product.images}
                            alt={product.title}
                          />
                          <div className="card-img-overlay ">
                            <div className="row">
                              {" "}
                              <div className="col-auto bg-light rounded-circle  ">
                                <Link
                                  onClick={() =>{ handleAddToWishlist(product); handleDisable(event) }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-heart"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                  </svg>
                                </Link>
                              </div>                             
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="card-body">
                        <span>
                          {" "}
                          <strong>{product.title.substring(0, 25)}</strong>{" "}
                        </span>
                        <br />
                        <span>
                          <strong>Price:</strong> ${product.price}
                        </span>
                        <br />
                      </div>
                    </div>
                    <div className="d-grid gap-2" style={{ width: "230px" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {handleAddToCart(product); handleDisable(event)}}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default Products;
