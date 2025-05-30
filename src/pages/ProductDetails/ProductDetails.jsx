import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  fetchAllProducts,
  fetchProductById,
  updateProducts,
} from "../../reducer/productSlice";
import {
  addItemToWishlist,
  fetchWishlist,
  removeItemFromWishlist,
} from "../../reducer/wishlistSlice";
import SimilarProductComponent from "../../components/SimilarProductComponent";
import { addItemToBag, fetchCart } from "../../reducer/shoppingBagSlice";

const ProductDetails = () => {
   const [productSize, setProductSize] = useState("");
   const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
   const navigate = useNavigate();
   const token = localStorage.getItem("jwtToken");
  const { productId } = useParams();
  const { product, loading, error } = useSelector((state) => state.productById);
  const wishlistItems = useSelector((state) => {
   
    return state.wishlist.items;
  });
  // const { user } = useSelector((state) => state.user.user);

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
    dispatch(fetchProductById(productId));
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, productId, userId]);

  

  //handleToggleWishlist
  const handleToggleWishlist = async () => {
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
        toast.success("Item added to wishlist");
      }
      dispatch(fetchWishlist(userId));
    } catch (err) {
      toast.error(err.message || "Failed to update wishlist");
    }
  };

  const handleAddToBag = async (product) => {
    try {
           if (!userId) {
             toast.error("Please log in to manage your wishlist.");
             return;
           }
           console.log("inside", product, userId)
       await dispatch(
         addItemToBag({
           userId,
           productId: product._id,
           title: product.title,
           price: product.price,
           images: product.images,
           quantity:1
         })
       ).unwrap();
       toast.success("Item added to bag");     
       dispatch(fetchCart(userId));
     } catch (err) {
       toast.error(err.message || "Failed to add item to bag");
     }
   };

  return (
    <div className="container">
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
      <h2>Product Details</h2>
      <div className="row my-3 ">
        <div className=" col-md-6  ">
          <div
            className="card border-0 shadow-lg"
            style={{ height: "400px", maxWidth: "450px" }}
          >
            <div className="text-center mt-4 ">
              <img
                style={{ height: "320px", maxWidth: "300px" }}
                className="img-fluid rounded"
                src={product?.images}
                alt="Men's Shoes"
              />
              <div className="card-img-overlay ">
                <div className="row">
                  {" "}
                  <div className="col-auto bg-light rounded-circle  ">
                    <span className="mt-2">{product?.rating} </span>
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
          </div>
         
        </div>
        <div className="col-md-6">
          <div
            className="card border-0 shadow-lg "
            style={{ height: "400px", maxWidth: "500px" }}
          >
            <div className="card-body">
              <h4>{product?.title}</h4>
              <p className="my-1">Rating: {product?.rating}</p>
              <p className="my-1">Price: ₹{product?.price}</p>
              <p className="my-1">Discount: {product?.discount}%</p>
              {/* <label>Select Shoes Size:</label>{" "}
              <select
                name="size"
                className="btn text-bg-light p-2"
                onChange={(event) => setProductSize(event.target.value)}
              >
                <option>Select</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select> */}
              <p>Category: {product?.category?.category}</p>
              <p>Description: {product?.description}</p>
            </div>
          </div>         
        </div>
        <div className="col-md-12">
          <div className="row">
          <div className="col-md-6"><div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              style={{ maxWidth: "450px" }}
              
              onClick={() => handleAddToBag(product)}
            >Add to Cart
              
            </button>{" "}
          </div></div>
          <div className="col-md-6"><div className="d-grid gap-2" style={{ maxWidth: "500px" }}>
            <button
              // isActive={active}
              onClick={handleToggleWishlist}
              className="btn btn-outline-primary"
            >Add To Wishlist
              {/* {!active ? "Add To Wishlist" : "Remove From Wishlist"} */}
            </button>
          </div></div>
        
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h3>Similer Products</h3>
        <div className="ms-3 row">
        <SimilarProductComponent category={product?.category?.category}  />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProductDetails;
