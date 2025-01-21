import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AddAddressComponent from "../Address/AddAddressComponent";


const handleRemoveCart = async (cartId) =>{
  try {
    const response = await fetch(
      `https://backend-shoesanctuary-major-project.vercel.app/api/carts/${cartId}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw "Failed to remove cart.";
    }
    const data = await response.json();
    if (data) {
      toast.success("Item removed Successfully.");
      window.location.reload()
    }
  } catch (error) {
    toast.error("An error occured while removing item from cart.");
  }
}

const handleRemoveOrderItems = async(orderItemId) =>{
  try {
    const response = await fetch(
      `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems/${orderItemId}`,
      { method: "DELETE" }
    );
    if(!response.ok){
      throw "Failed to delete product from cart."
    }
    const data = response.json()
    console.log("Product deleted:", data)
    toast.success("Product Removed from Cart.")
  } catch (error) {
    toast.error("Error: ", error)
  }
}

const handleRemoveAddress = async (addressId) =>{
  try {
    const response = await fetch(`https://backend-shoesanctuary-major-project.vercel.app/api/addresses/${addressId}`,
     { method: "DELETE"},
  );
  
    if(!response.ok){
      throw "Failed to delete Address."
    }
    const data = await response.json()
    if(data){
      setSuccessMessage("Address deleted Successfully.")
      console.log("Address deleted Successfully.", data)
    }
  } catch (error) {
    console.log("Error: ", error)
  }
}

const PriceDetails = ({ orderItems, address, user, cart }) => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [orderPlaced, setOrderPlaced] = useState(false);
const navigate = useNavigate()

  const orderAmount =
    orderItems.length > 0 &&
    orderItems
      ?.map((product) => product.product.price * product.quantity)
      .reduce((acc, curr) => acc + curr, 0);

  const totalQuantity =
    orderItems.length > 0 &&
    orderItems
      ?.map((product) => product.quantity)
      .reduce((acc, curr) => acc + curr, 0);

  const totalOrderDiscount =
    orderItems.length > 0 &&
    orderItems
      ?.map((product) => product.product.price * 0.1 * product.quantity)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);

  const deliveryCharges = orderAmount > 2000 ? 0 : 100;

  const afterDiscountTotalAmount = orderAmount - totalOrderDiscount;
  const totalSavedAmount = totalOrderDiscount + deliveryCharges;

const cartId = cart?.length > 0 && cart[cart?.length-1]._id 
console.log(cartId)

  const handlePlaceOrder = async (data) => {
    const orderItem = data?.map((object) => object._id);
    const selectedAddressId = selectedAddress._id;
    const userId = user._id;
    try {
      const response = await fetch(
        "https://backend-shoesanctuary-major-project.vercel.app/api/carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderItem: orderItem,
            shippingAddress: selectedAddressId,
            status: "Pending",
            totalPrice: afterDiscountTotalAmount,
            user: userId,
          }),
        }
      );
      
      if (!response.ok) {
        throw "Failed to add product.";
      }
      const data = await response.json();
      if (data) {
        window.location.reload()
        setOrderPlaced(true);
         console.log("Order Placed", data);
         toast.success("Order Placed Successfully.")
         handleRemoveCart(cartId) 
                       
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An error occured while placing order.")
    }
  };


  return (
    <div className="card bg-body-tertiary border-0">
      {orderPlaced && <Link to="/products">Continue Shopping</Link>}
      {orderItems && orderItems.length > 0 && (
        <div className="card-body d-grid">
          <h4>Price Details</h4>
          <hr />
          <p>
            <span>
              Price: ({totalQuantity && totalQuantity} :{" "}
              {totalQuantity > 1 ? "item" + "s" : "item"} )
            </span>
            <span className="float-end">${orderAmount && orderAmount}</span>
          </p>
          <p>
            <span>Discount:</span>
            <span className="float-end">
              -${totalOrderDiscount && totalOrderDiscount} (10% Item above
              $1000)
            </span>
          </p>
          <p>
            <span>Delivery Charges:</span>
            <span className="float-end">
              {orderAmount && orderAmount > 5000 ? "Free Delivery" : "$" + 100}
            </span>
          </p>
          <hr />
          <h4>
            Total Amount{" "}
            <span className="float-end">
              $ {afterDiscountTotalAmount && afterDiscountTotalAmount}
            </span>
          </h4>
          <hr />
          <p>You save ${totalSavedAmount && totalSavedAmount} on this order.</p>
          <hr />
          <h4>Select address</h4>

          <div className="row">
              <div className='col-md-12 py-2 mb-2' >
            {address && address.length > 0 && address.map(address=>(
                <div className='card' key={address._id}>
                  <div className='card-body'>
                      <input type="radio" name="address" value={selectedAddress} onChange={()=>setSelectedAddress(address)}/>{" "}
                      {address.address}, {address.city}, {address.postalCode},  {address.country} <br/>
                    <button className='btn btn-danger float-end btn-sm' onClick={()=>handleRemoveAddress(address._id)}>Remove</button>
                  </div>
                </div>
               
              ) ) }
              </div> 
              <hr />
              <div className="my-2">
                <h5>Add New Address</h5>
               <AddAddressComponent />   
               </div>          
          </div>
          {!selectedAddress ? (
            ""
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {handlePlaceOrder(orderItems);
                  ;orderItems?.map(order=>handleRemoveOrderItems (order._id))  ; navigate("/checkout") 
                }}
            >
              Checkout
            </button>
          )}
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default PriceDetails;
