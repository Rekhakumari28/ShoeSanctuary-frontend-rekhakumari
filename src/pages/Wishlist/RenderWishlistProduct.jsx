import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const reloadWishlistPage = () => {
  return window.location.reload()
}

const RenderWishlistProduct = ({ wishlist, orderItems }) => {

  console.log(wishlist, "wishlist")
  console.log(orderItems, "orderItems")
  //remove from cart
  const handleRemove = async (productId) => {
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
        window.location.reload()
      }
    } catch (error) {
      toast.error("An error occured while fetching wishlist products.", error);
    }
  };

  //add to cart
  const handleMoveToCart = async (object) => {
    const value = object.product
    const ifIsAlreadyExist =orderItems?.length>0 && orderItems?.filter(product => product?.product._id === value._id)
   
    const orderItemId = ifIsAlreadyExist[ifIsAlreadyExist?.length - 1] && ifIsAlreadyExist[ifIsAlreadyExist?.length - 1]._id
    let quantity = ifIsAlreadyExist[ifIsAlreadyExist?.length - 1] && ifIsAlreadyExist[ifIsAlreadyExist?.length - 1]?.quantity

    if (ifIsAlreadyExist.length > 0) {
      try {
        const response = await fetch(
          `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${orderItemId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: value, quantity: quantity + 1 }),
          }
        );
        if (!response.ok) {
          throw "Failed to add quantity to orderItem.";
        }
        const data = await response.json();
        if (data) {
          console.log("Quantity added", data);
          toast.success("Increase item in the cart")
          handleRemove(object._id)
          window.location.reload()
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
            body: JSON.stringify({ product: value._id }),
          }
        );
        if (!response.ok) {
          throw "Failed to add product to cart.";
        }
        const data = await response.json();
        if (data) {
          toast.success("Product is Moved to cart");
          handleRemove(object._id);
        }
      } catch (error) {
        toast.error("An error occured while fetching wishlist products. ", error);
      }
    }

  };

  return (
    <div className="list-group ">
      {wishlist &&
        wishlist.length > 0 &&
        wishlist?.map((product) => (
          <div className="list-group-item" key={product._id}>
            <div className="row">
              <div className="col-md-4 ">
                <div style={{ height: "180px", width: "150px" }}>
                  <img
                    className="img-fluid"
                    src={product?.product.images}
                    alt={product?.product.title}
                  />
                </div>
              </div>
              <div className="col-md-7">
                <h5>{product?.product.title}</h5>
                <span>Price: ₹{product.product.price}</span> {"| "}
                <span>Rating: {product.product.rating}</span>
                <p>Discount: {product.product.discount} </p>
                <button
                  className="btn btn-outline-primary "
                  onClick={() => handleMoveToCart(product)}
                >
                  Move to Cart
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemove(product._id)}
                >
                  Remove{" "}
                </button>

              </div>
            </div>
          </div>
        ))}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default RenderWishlistProduct;
