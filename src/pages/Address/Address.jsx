import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import AddAddressComponent from "../../components/AddAddressComponent";
import AddressList from "../../components/AddressList";
import { fetchAddressesByUser } from "../../reducer/addressSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Address() {  
  const dispatch = useDispatch();
     const { address, loading, error } = useSelector((state) => state.address);
       const {user} = useSelector((state)=>state.user)
       let userId = user ? user.user._id : null;
    console.log(address) 
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken"); 
  
  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log("Decoded JWT:", decoded); // Check the actual field names
  //       setUserId(decoded._id || decoded.id); // Try both _id and id
  //     } catch (error) {
  //       console.error("Error decoding JWT token:", error);
  //       localStorage.removeItem("jwtToken"); // Remove invalid token
  //       toast.error("Invalid session. Please log in again.");
  //       setUserId(null);
  //       navigate("/login"); // Redirect to login page if necessary
  //     }
  //   }
  // }, [navigate]);
   
     useEffect(() => {
       dispatch(fetchAddressesByUser(userId));
     }, [userId, dispatch]);  
  return (
    <div>
      <div className="mt-3 row border bg-light rounded">
        <div className="col-md-8">
          <h4 className="mt-2">Address</h4>
        </div>
        <div className="col-md-4  ">
          <button
            className="navbar-toggler float-end"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>{" "}
            <button className="btn btn-primary  mt-2 px-2">Add address</button>
          </button>
        </div>
        <div className="col-md-12">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="container py-2">
             <AddAddressComponent />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {" "}
          <hr />
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
          <div className="row pb-2 ">
          <AddressList address={address} userId={userId}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
