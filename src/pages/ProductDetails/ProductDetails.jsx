import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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

const ProductDetails = () => {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(false);
  const [productSize, setProductSize] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product, loading, error } = useSelector((state) => state.productById);
  const wishlistItems = useSelector((state) => {
    console.log(state.wishlist);
    return state.wishlist.items;
  });
  const { user } = useSelector((state) => state.user.user);
  let userId = user ? user._id : null;

  console.log(wishlistItems);
  useEffect(() => {
    dispatch(fetchProductById(productId));
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, productId, userId]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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

  //add to cart
  const handleAddToCart = async (product) => {
    const value = { ...object, size: productSize };
    console.log(value);
    const ifIsAlreadyExist =
      orderItems?.length > 0 &&
      orderItems?.filter((product) => product?.product._id === value._id);

    const orderItemId =
      ifIsAlreadyExist[ifIsAlreadyExist?.length - 1] &&
      ifIsAlreadyExist[ifIsAlreadyExist?.length - 1]._id;
    let quantity =
      ifIsAlreadyExist[ifIsAlreadyExist?.length - 1] &&
      ifIsAlreadyExist[ifIsAlreadyExist?.length - 1]?.quantity;

    if (ifIsAlreadyExist?.length > 0) {
      try {
        const response = await fetch(
          `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${orderItemId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product: { ...object, size: productSize },
              quantity: quantity + 1,
            }),
          }
        );
        if (!response.ok) {
          throw "Failed to add quantity to orderItem.";
        }
        const data = await response.json();
        if (data) {
          console.log("Quantity added", data);
          toast.success("Item is already in the cart. Quantity increases.");
        }
      } catch (error) {
        toast.error("Error: ", error);
      }
    } else {
      try {
        const response = await fetch(
          `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: { ...object, size: productSize } }),
          }
        );
        if (!response.ok) {
          throw "Failed to add product to cart.";
        }
        const data = await response.json();
        if (data) {
          toast.success("Product is Added to cart");
        }
      } catch (error) {
        toast.error("An error occured while fetching products. ", error);
      }
    }
  };

  const handleSizeChange = async (product) => {
    const productId = product._id;
    dispatch(updateProducts({ productId, size: productSize, ...product }));
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
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              style={{ maxWidth: "450px" }}
              disabled={productSize === "" ? true : false}
              onClick={() => {
                setCurrent(!current);
                {
                  !current ? handleAddToCart(product) : navigate("/cart");
                }
                handleSizeChange(product);
              }}
            >
              {!current ? "Add to Cart" : "Go To Cart"}
            </button>{" "}
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
              <label>Select Shoes Size:</label>{" "}
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
              </select>
              <p>Category: {product?.category?.category}</p>
              <p>Description: {product?.description}</p>
            </div>
          </div>
          <div className="d-grid gap-2" style={{ maxWidth: "500px" }}>
            <button
              isActive={active}
              onClick={handleToggleWishlist}
              className="btn btn-outline-primary"
            >
              {!active ? "Add To Wishlist" : "Remove From Wishlist"}
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h3>Similer Products</h3>
        <div className="ms-3 row">
          {/* {similerProduct?.map((product) => (
              <div className="col-md-3 mb-2 p-2" key={product._id}>
                <div key={product._id}>
                  <div
                    style={{ height: "260px", maxWidth: "300px" }}
                    className="card bg-white border border-0 shadow mt-3"
                  >
                    {" "}
                    <div className="text-center ">
                      <Link to={`/productDetails/${product._id}`}>
                        <img
                          style={{ height: "150px", maxWidth: "150px" }}
                          className="img-fluid rounded  mt-3"
                          src={product.images}
                          alt={product.title}
                        />
                        <div className="card-img-overlay ">
                          <div className="row">
                            {" "}
                            <div className="col-auto bg-light rounded-circle  ">                              
                <span className="mt-2">{product.rating}{" "}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-warning mb-1" viewBox="0 0 16 16">
                 
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <span>{product.title.substring(0, 20)} </span>
                      <br />
                      <span>Price: ₹{product.price}</span>{" "}|{" "}
                      <span>Discount: {product.discount}%</span>
                    </div>
                  </div>
                  <div className="d-grid gap-2" style={{ maxWidth: "300px" }} >
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/productDetails/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))} */}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProductDetails;
