import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserById, logout } from "../../reducer/userSlice";
import toast from "react-hot-toast";
import Address from "../Address/Address";
import { jwtDecode } from "jwt-decode";
import { fetchOrderHistory } from "../../reducer/orderSlice";
import { ProductCardComponent } from "../../components/ProductCardComponent";

const UsersProfile = () => {
  const [userIdFromToken, setUserId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
     const {user, loading, error} = useSelector((state)=>state.user)
   let userId = user ? user.user?._id : userIdFromToken
const { orders } = useSelector((state) => {
    return state.order;
  });

  console.log(orders , "ask")
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
      dispatch(fetchUserById({ _id: userId })); 
        dispatch(fetchOrderHistory(userId)); 
  }, [dispatch, userId ]);

  
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfullly!");
    navigate("/");
  };
 console.log(user)


  return (
    <div className="container p-4  mb-5 ">
      <section>
        <h2>Account</h2>
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
        <div className="row text-center border bg-light rounded ">
          <div className="col-md-2 align-items-start my-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#212529"
              className="bi bi-person-circle "
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-start mt-2 ">
            <h1 className="display-4">{user.user?.name}</h1>
            <p className="fw-normal fs-5">{user.user?.email}</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end ">
            <div className="row">
              <div className="col-md-12">
                {" "}
                <Link
                  className="btn btn-primary px-3 mt-4 float-end"
                  to={`/edit-profile/${userId}`}
                >
                  Edit profile
                </Link>
              </div>
              <div className="col-md-12">
                <button className="btn btn-danger px-4 float-end" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Address />
      </section>
      {/* <section className=" mt-3 row border bg-light rounded">
      
        {orders.map(order=> <div className="col-md-12 py-3" key={order._id}>
  <div className="col-md-6 py-3" >
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                         <ProductCardComponent  products={order.cartItems.products}/>
                        </div>
                      </div>
                    </div>
                  </div>
        </div> )}
       
      </section> */}
    </div>
  );
};

export default UsersProfile;
