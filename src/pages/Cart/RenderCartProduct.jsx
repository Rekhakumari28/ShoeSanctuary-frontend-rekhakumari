import React from "react";
import toast, { Toaster } from "react-hot-toast";

const RenderCartProduct = ({ orderItems }) => {

  //add Quantity
  const addQuantity = async (productId, product) => {
    const productsId = productId;
    let quantity = product.quantity;
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${productsId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity + 1 }),
        }
      );
      if (!response.ok) {
        throw "Failed to add quantity to orderItem.";
      }
      const data = await response.json();
      if (data) {
        console.log("Quantity added", data);
        toast.success("Increase item in the cart")
        window.location.reload()
      }

    } catch (error) {
      toast.error("Error: ", error);
    }
  };

  //remove Quantity
  const removeQuantity = async (productId, product) => {
    const productsId = productId;
    let quantity = product.quantity;

    if (quantity > 1) {
      try {
        const response = await fetch(
          `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${productsId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantity - 1 }),
          }
        );

        if (!response.ok) {
          throw "Failed to remove quantity from orderItem.";
        }
        const data = await response.json();
        if (data) {
          toast.success("Decrease item in the cart")
          console.log("Quantity removed", data);
          window.location.reload()
        }
      } catch (error) {
        toast.error("Error", error);
      }
    } else {
      try {
        const response = await fetch(
          `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${productId}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw "Failed to delete product from cart."
        }
        const data = response.json()
        if (data) {
          console.log("Product deleted:", data)
          toast.success("Product Removed from Cart.")
          window.location.reload()
        }

      } catch (error) {
        toast.error("Error: ", error)
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${productId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw "Failed to delete product from cart."
      }
      const data = response.json()
      if (data) {
        console.log("Product deleted:", data)
        toast.success("Product Removed from Cart.")
        window.location.reload()
      }
    } catch (error) {
      toast.error("Error: ", error)
    }
  }

  const handleMoveToWishlist = async (object) => {
    const value = object.product

    const productId = object._id
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
        toast.success("Move product from the cart to the wishlist");
        handleRemoveFromCart(productId)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="">
      {orderItems && orderItems.length > 0 && orderItems?.map((product) => (
        <div
          className="card bg-body-tertiary shadow p-3 my-3 border-0"
          key={product._id}
          style={{ maxWidth: "540px" }}
        >
          <div className="row g-0">
            <div className="col-md-4 ">
              <div className="d-grid ">
                <img
                  className="img-fluid "
                  src={product.product.images}
                  alt={product.product.title}
                />  </div>
              
            </div>
            <div className="col-md-8  ">
              <div className="mx-2">
                <h4>{product.product.title}</h4>
                <p>Price: ₹{product.product.price}</p>
                <p>Discount: {product.product.discount}% </p>
                <p>Rating: {product.product.rating}</p>
                <p>Quantity: <button className="rounded-circle btn btn-outline-secondary" onClick={() => addQuantity(product._id, product)}>+</button> {" "}
                  <span>{product.quantity}</span>  {" "}
                  <button className="rounded-circle btn btn-outline-secondary" onClick={() => removeQuantity(product._id, product)}>-</button></p>
              </div>             
            </div>
          </div> 
          <div className="d-grid gap-2 mt-2">
            <span><button style={{ width: "250px" }} className="btn btn-outline-danger " onClick={() => handleRemoveFromCart(product._id)}>Remove From Cart</button>
          <button style={{ width: "250px" }} className="btn btn-outline-secondary " onClick={() => handleMoveToWishlist(product)}>Move to Wishlist</button></span>
          
          </div>
        </div>
      ))}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );

};
export default RenderCartProduct;
