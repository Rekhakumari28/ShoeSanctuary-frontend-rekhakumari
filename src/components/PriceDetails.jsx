import React, { useEffect, useState } from "react";
import toast  from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddAddressComponent from "./AddAddressComponent";
import { deleteAddress } from "../reducer/addressSlice";
import { placeOrder } from "../reducer/orderSlice";
import { clearBag } from "../reducer/shoppingBagSlice";
import { jwtDecode } from "jwt-decode";

const PriceDetails = () => {
  const [userId, setUserId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("bag"); 
  const [selectedAddress, setSelectedAddress] = useState();
  const { address} = useSelector((state) => state.address)
  const { items } = useSelector((state) => state.shoppingBag);
  const navigate = useNavigate()
  const dispatch = useDispatch();
   const { user } = useSelector((state) => state.user.user);
   
   const token = localStorage.getItem("jwtToken");

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


  const itemQuantity = Array.isArray(items.products)
  ? items.products?.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  )
  : 0;

  const orderAmount =
  Array.isArray(items.products)
  ? items.products?.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  )
  : 0;

  const totalOrderDiscount =
  Array.isArray(items.products)
  ? items.products?.reduce(
      (acc, item) =>
        acc +
        ( 20 / 100) *
          item.price *
          (item.quantity || 1),
      0
    )
  : 0;
  
  const deliveryCharges = orderAmount > 5000 ? 0 : 100;
  const afterDiscountTotalAmount = (orderAmount - totalOrderDiscount)+ deliveryCharges

  const calculateTotalAmount = () => afterDiscountTotalAmount;
   const totalSavedAmount = parseInt(totalOrderDiscount) + (orderAmount > 2000 ? 100 : 0);

   const getEstimatedDeliveryDate = () => {
    const currentDate = new Date();
    const estimatedDeliveryDate = new Date(currentDate);
    estimatedDeliveryDate.setDate(currentDate.getDate() + 10);
    return estimatedDeliveryDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
 const handleRemoveAddress = async (addressId) => {
      try {
        await dispatch(deleteAddress({ userId, addressId })).unwrap();
        toast.success("Address deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete address");
      }
    };

// const handleRemoveCart = async (cartId) =>{
//   try {
//     const response = await fetch(
//       `https://backend-shoesanctuary-major-project.vercel.app/api/carts/${cartId}`,
//       { method: "DELETE" }
//     );
//     if (!response.ok) {
//       throw "Failed to remove cart.";
//     }
//     const data = await response.json();
//     if (data) {
//       toast.success("Item removed Successfully.");
//       window.location.reload()
//     }
//   } catch (error) {
//     toast.error("An error occured while removing item from cart.");
//   }
// }
const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    toast.error("Please select a delivery address.");
    return;
  }

  if (!userId) {
    toast.error("User ID not available. Please log in again.");
    return;
  }

  try {
    await dispatch(placeOrder({
       userId,
      cartItems : items._id ,
      totalAmount: calculateTotalAmount(),
    shippingAddress:selectedAddress
    })).unwrap();
    dispatch(clearBag());
    toast.success("Order placed successfully!");
    setOrderPlaced(true);
    setCheckoutStep("success");
    navigate("/checkout")
  } catch (err) {
    console.error("Failed to place order:", err);
    toast.error(err.message || "Failed to place order.");
  }
};


  return (
    <div className="card bg-body-tertiary border-0">
      
      {items && items.products?.length > 0 && (
        <div className="card-body d-grid">
          <h4>Price Details</h4>
          <hr />
          <p>
            <span>
              Price: 
              ( {itemQuantity} :{" "}
              {itemQuantity > 1 ? "item" + "s" : "item"} )
            </span>
            <span className="float-end">₹{orderAmount}</span>
          </p>
          <p>
            <span>Discount:</span>
            <span className="float-end">
              {totalOrderDiscount.toFixed(2)}
            </span>
          </p>
          <p>
            <span>Delivery Charges:</span>
            <span className="float-end">
              {deliveryCharges > 0 ? ("₹"+deliveryCharges) : "Free Delivery"} 
            </span>
          </p>
          <hr />
          <h4>
            Total Amount{" "}
            <span className="float-end">
            {afterDiscountTotalAmount}
            </span>
          </h4>
          <hr />
          <p>You save₹{totalSavedAmount && totalSavedAmount} on this order.</p>
          <hr />
          <h4>Select address</h4>

          <div className="row">
              <div className='col-md-12 py-2 mb-2' >
            {address && address.length > 0 && address.map(address=>(
                <div className='card' key={address._id}>
                  <div className='card-body'>
                      <input type="radio" name="address" value={selectedAddress} onChange={()=>setSelectedAddress(address._id)}/>{" "}
                      {address.name}, {address.city}, {address.postalCode},  {address.country} <br/>
                    <button className='btn btn-danger float-end btn-sm' onClick={()=>handleRemoveAddress(address._id)}>Remove</button>
                  </div>
                </div>
               
              ) ) }
              </div> 
              <hr />
              <div className="my-2">
                <h5>Add New Address</h5>
               <AddAddressComponent/>   
               </div>          
          </div>
          {!selectedAddress ? (
            ""
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => handlePlaceOrder()}
            >
              Checkout
            </button>
          )}
        </div>
      )}
 
    </div>
  );
};

export default PriceDetails;
