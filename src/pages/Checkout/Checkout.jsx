import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrderDetails } from "../../reducer/orderSlice";
import { ProductCardComponent } from "../../components/ProductCardComponent";
import { jwtDecode } from "jwt-decode";
const Checkout = () => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  const navigate = useNavigate()
  const { orderDetails } = useSelector((state) => state.order);

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
    dispatch(fetchOrderDetails(userId));
  }, [userId]);

  return (
    <div>
      <div className="container mb-5">
        <div className="pb-4">
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
          <div className="card rounded p-2 bg-body-tertiary mb-5">
            <div className="row mt-3">
              <h4 className="ms-3 p-2 mt-2 ">
                Order Summery: Total Order Amount: ₹{orderDetails?.totalAmount}
              </h4>
              <div className=" mt-3 row ">
                {orderDetails.cartItems?.products.map((product) => (
                  <div className="col-md-6 py-3" key={product.productId}>
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                      
                         <ProductCardComponent  products={product} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <span className="ms-3 p-2 mt-2 mb-3 ">
              <strong>Shipping Address:</strong> {orderDetails?.shippingAddress}
              {/* {orders?.shippingAddress?.address} {cartSummery?.shippingAddress?.city} {cartSummery?.shippingAddress?.postalCode} {cartSummery?.shippingAddress?.country} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
