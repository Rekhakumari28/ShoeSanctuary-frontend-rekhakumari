import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrderDetails, fetchOrderHistory } from "../../reducer/orderSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  let userId = user ? user?._id : null;
  const { cart } = useSelector((state) => {
    console.log(state.order);
    return state.order;
  });

  useEffect(() => {
    dispatch(fetchOrderHistory(userId));
    // dispatch(fetchOrderDetails(userId))
  }, []);

  return (
    <div>
      <div className="container">
        <div>
          <div className="p-4 text-center  ">
            <Link
              to={`/home`}
              className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black"
            >
              <img
                className="p-2"
                style={{ maxWidth: "350px", display: "block", margin: "auto" }}
                src="https://cdn.undraw.co/illustrations/order-confirmed_m9e9.svg"
                alt="Order Confermed"
              />
              <p style={{ textDecoration: "none" }}>
                Your Order is Placed Successfully. Please Continue Shopping with
                us.
              </p>
            </Link>
          </div>
          <div className="card rounded p-2 bg-body-tertiary mb-2">
            <h4 className="ms-3 p-2 mt-2 ">
              Order Summery: Total Order Amount: ₹{}
            </h4>
            <hr />
            <div className="row mt-3">
              {/* {cart?.orderItems?.map(order=>(
                  <>
                  <div className='col-md-3 text-center' key={order._id}>
                  <img className='p-1' style={{height:"120px", width:"120px"}} src={order.product.images} alt={order.product.title} />
                </div>
                 <div className='col-md-9'>                 
                   <h5>{order.product.title}</h5>
                   <span><strong>Price: </strong> ₹{order.product.price}</span>{" | "}
                   <span><strong>Discount: </strong>{order.product.discount}</span>{" | "}
                   <span><strong>Rating: </strong>{order.product.rating}</span>
                   <p>{order.product.description.substring(0,300)}</p>  
             
               </div>
               </>
                ))}  */}
            </div>
            <hr />
            {/* <span  className='ms-3 p-2 mt-2 mb-3 '><strong>Shipping Address:</strong> {cartSummery?.shippingAddress?.address} {cartSummery?.shippingAddress?.city} {cartSummery?.shippingAddress?.postalCode} {cartSummery?.shippingAddress?.country}</span>          */}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Checkout;
