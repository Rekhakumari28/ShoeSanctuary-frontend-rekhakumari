import React, { useState } from "react";
import Heart from "react-heart";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product, wishlist }) => {
  const [active, setActive] = useState(false);
  const { images, title, rating, price } = product;

  const wishlistProductId = wishlist?.lenght > 0 && wishlist[wishlist?.length - 1]


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
      toast.error("Error occured while adding product to wishlist. ");
    }
  };

  //remove product from cart
  const removeProductFromCart = async (productId) => {

    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/wishlists/${productId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw "Failed to remove product from wishlist.";
      }
      const data = await response.json();
      if (data) {

        toast.success("Product removed from wishlist Successfully.");
      }
    } catch (error) {
      toast.error("An error occured while fetching wishlist products.", error);
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
      if (data) {
        toast.success("Product is added to the cart");
      }
    } catch (error) {
      toast.error("Error: ", error);
    }
  };

  const handleDisable = (event) => {
    event.target.disabled = true;
  };

  return (
    <div className="col-md-3 my-2 p-2">
      <div>

        <div
          style={{ height: "260px", width: "230px" }}
          className="card bg-white border border-0 shadow mt-3"
        >
          <Link to={`/productDetails/${product._id}`} >
            {" "}
            <div className="text-center ">


              <img
                style={{ height: "150px", width: "150px" }}
                className="img-fluid rounded  mt-1"
                src={images}
                alt={title}
              />


              <div className="card-img-overlay ">
                <div className="row">
                  {" "}
                  <div style={{ width: "3rem" }} className="col-auto bg-light rounded-circle  ">
                    {/* <Heart
                    isActive={active}
                    onClick={() => {
                      setActive(!active); { !active ?  handleAddToWishlist(product) : removeProductFromCart(wishlistProductId._id)  }
                      ;
                    }}
                    animationScale={1.25}
                  /> */}
                  </div>
                </div>
              </div>

            </div>
          </Link>
          <div className="card-body ">
            <span >
              {" "}
              <strong >{title.substring(0, 25)}</strong>{" "}
            </span>
            <br />
            <span >
              <strong  >Price:</strong> ${price}
            </span>{" "}
            <br />
            <span >
              <strong  >Rating:</strong> {rating}
            </span>{" "}

          </div>

        </div>

        <div className="d-grid gap-2" style={{ width: "230px" }}>

          <button
            className="btn btn-primary"
            onClick={() => {
              handleAddToCart(product);
              handleDisable(event);
            }}
          >
            Add to Cart
          </button>{" "}
          <button isActive={active}
            onClick={() => {
              setActive(!active); { !active ? handleAddToWishlist(product) : removeProductFromCart(wishlistProductId._id) }
              ;
            }}
            className="btn btn-outline-primary"
          >{!active ? "Add To Wishlist" : "Remove From Wishlist"}</button>

        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProductCard;
