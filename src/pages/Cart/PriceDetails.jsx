import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ListOfAddressComponent from "../Address/ListOfAddressComponent";
import AddressComponent from "../Address/AddAddressComponent";

const PriceDetails = ({ orderItems, address, user }) => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handlePlaceOrder = async (data) => {
    const orderItems = data?.map((object) => object._id);

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
            orderItem: orderItems,
            shippingAddress: selectedAddressId,
            status: "Pending",
            totalPrice: afterDiscountTotalAmount,
            user: userId,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw "Failed to add product.";
      }
      const data = await response.json();
      if (data) {
        setOrderPlaced(true);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } bg-success-subtle text-success-emphasis rounded p-3`}
          >
            <span>Order Placed Successfully!</span>{" "}
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-outline-success"
            >
              Close
            </button>{" "}
          </div>
        ));
        console.log("Order Placed", data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="card bg-body-tertiary border-0">
      {orderPlaced && <Link to="/products">Continue Shopping</Link>}
      {orderItems.length > 0 && (
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
            {address && address.length > 0 ? (
              <div className='col-md-12 py-2' key={address._id}>
                <div className='card'>
                  <div className='card-body'>
                      <input type="radio" name="address" value={selectedAddress} onChange={()=>setSelectedAddress(address)}/>{" "}
                   {address.name},  {address.street}, {address.state}, {address.country}, {address.zipcode},  {address.mobileNo} <br/>
                    <button className='btn btn-danger float-end btn-sm' onClick={()=>handleRemove(address._id)}>Remove</button>
                  </div>
                </div>

              </div>              
            ) : (
              <AddressComponent />
            )}
          </div>
          {!selectedAddress ? (
            ""
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => handlePlaceOrder(orderItems)}
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
