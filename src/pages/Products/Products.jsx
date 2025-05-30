import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, setSortOrder } from "../../reducer/productSlice";
import { fetchAllCategories } from "../../reducer/categoriesSlice";
import {
  addItemToWishlist,
  fetchWishlist,
  removeItemFromWishlist,
} from "../../reducer/wishlistSlice";
import { addItemToBag, fetchCart } from "../../reducer/shoppingBagSlice";
import { jwtDecode } from "jwt-decode";
import CategoryFilter from "../../components/filter/CategooryFilter";
import RatingFilterComponent from "../../components/filter/RatingFilterComponent";
import PriceFilterComponent from "../../components/filter/PriceFilterComponent";
import toast from "react-hot-toast";
import { categoryImage } from "../../components/Category";

const Products = () => {
  const { productCategory } = useParams();
  const [selectedCategories, setSelectedCategories] = useState(
    productCategory === "All"
      ? ["Men", "Women", "Boys", "Girls"]
      : [productCategory]
  );
  const [selectedRating, setSelectedRating] = useState(null);
  const [resetFilters, setResetFilters] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { products, loading, error } = useSelector(
    (state) => state.allProducts
  );
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const sortOrder = useSelector((state) => state.allProducts.sortOrder);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // Check the actual field names
        setUserId(decoded._id || decoded.id); // Try both _id and id
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        toast.error("Invalid session. Please log in again.");
        navigate("/login"); // Redirect to login page if necessary
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (productCategory === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([productCategory]);
    }
  }, [productCategory]);

  //fetching wishlist
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  //fetching products and categories
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  //category filter from home

  const filteredProducts =
    products.data?.products?.length > 0 &&
    products.data?.products?.filter((product) => {
      const searchProducts = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch = product.category.category
        .toLowerCase()
        .includes(searchTerm);
      const selectedCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category.category);

      const selectedMatchRating =
        selectedRating === null || product.rating >= selectedRating;

      return searchProducts && selectedCategory && selectedMatchRating && categoryMatch
    });

  const sortedProducts =
    filteredProducts?.length > 0
      ? [...filteredProducts].sort((a, b) => {
          return sortOrder === "lowToHigh"
            ? a.price - b.price
            : b.price - a.price;
        })
      : products.data?.products;




const handleSearchProductFromNavbar =
    searchTerm === ""
      ? sortedProducts
      : sortedProducts?.filter((product) => {
        const categoryMatch = product.category.category
          .toLowerCase()
          .includes(searchTerm);
        const productMatch = product.title
          .toLowerCase()
          .includes(searchTerm)
        return categoryMatch || productMatch;
      });


  //handle filter by category
  const handleCategoryChange = useCallback((categoryImage) => {
    setSelectedCategories(categoryImage);
  }, []);

  const handleRatingChange = useCallback((rating) => {
    setSelectedRating(rating);
  }, []);

  const handleClearFilter = () => {
    setSelectedCategories([]);
    setSelectedRating(null);
    setResetFilters(true);
    dispatch(setSortOrder(null));
    window.location.reload();
  };

  useEffect(() => {
    if (resetFilters) {
      setResetFilters(false);
    }
  }, [resetFilters]);

  //handleToggleWishlist
  const handleToggleWishlist = async (product) => {
    console.log(product, userId);
    try {
      if (!userId) {
        toast.error("Please log in to manage your wishlist.");
        return;
      }
      const existingItem = wishlistItems.find(
        (item) => item.productId == product._id
      );
      if (existingItem) {
        await dispatch(
          removeItemFromWishlist({
            userId,
            productId: product._id,
          })
        ).unwrap();
        toast.error("Item removed from wishlist");
        setIsWishlisted(false);
      } else {
        await dispatch(
          addItemToWishlist({
            userId,
            productId: product._id,
            title: product.title,
            price: product.price,
            images: product.images,
          })
        ).unwrap();
        setIsWishlisted(true);
        toast.success("Item added to wishlist");
      }
      dispatch(fetchWishlist(userId));
    } catch (err) {
      toast.error(err.message || "Failed to update wishlist");
    }
  };

  //add to cart
  const handleAddToBag = async (product) => {
    try {
      if (!userId) {
        toast.error("Please log in to manage your wishlist.");
        return;
      }
      console.log("inside", product, userId);
      await dispatch(
        addItemToBag({
          userId,
          productId: product._id,
          title: product.title,
          price: product.price,
          images: product.images,
          quantity: 1,
        })
      ).unwrap();
      toast.success("Item added to bag");
      dispatch(fetchCart(userId));
    } catch (err) {
      toast.error(err.message || "Failed to add item to bag");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-body-tertiary mb-5">
            {/* categoryFilter */}
            <CategoryFilter
              categories={categoryImage}
              productCategory={productCategory}
              onCategoryChange={handleCategoryChange}
            />
            <hr />

            {/* ratingFilter */}
            <RatingFilterComponent
              onRatingChange={handleRatingChange}
              reset={resetFilters}
            />

            <hr />

            {/* sortPriceFilter */}
            <PriceFilterComponent />

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
            {loading === true && (
              <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
                Loading...
              </p>
            )}
            {error !== null && (
              <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
                {error}
              </p>
            )}
            <div className="row ms-2 mb-5">
              {Array.isArray(handleSearchProductFromNavbar) && handleSearchProductFromNavbar.length > 0
                ? handleSearchProductFromNavbar?.map((product) => (
                    <div className="col-md-3 p-2" key={product._id}>
                      <div
                        style={{ height: "260px", maxWidth: "300px" }}
                        className="card bg-white border border-0 shadow mt-2"
                      >
                        <Link to={`/productDetails/${product._id}`}>
                          {" "}
                          <div className="text-center ">
                            <img
                              style={{ height: "150px", width: "150px" }}
                              className="img-fluid rounded  mt-4"
                              src={product.images}
                              alt={product.title}
                            />
                            <div className="card-img-overlay ">
                              <div className="row">
                                {" "}
                                <div className="col-auto bg-light rounded-circle  ">
                                  <span className="mt-2">
                                    {product.rating}{" "}
                                  </span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-star-fill text-warning mb-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="container my-1 ">
                          <span className="fw-normal">
                            {product.title.substring(0, 30)}
                          </span>
                          <br />
                          <span>
                            <span className="fw-bold">Price:</span> ₹
                            {product.price}
                          </span>{" "}
                          <br />
                        </div>
                      </div>
                      <div
                        className="d-grid gap-2"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToBag(product)}
                        >
                          Add to Cart
                        </button>{" "}
                        <button
                          onClick={() => handleToggleWishlist(product)}
                          className="btn btn-outline-primary"
                        >
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  ))
                : !loading &&
                  !error && (
                    <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
                      No products available. Try adjusting your filters.
                    </p>
                  )}
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Products;
