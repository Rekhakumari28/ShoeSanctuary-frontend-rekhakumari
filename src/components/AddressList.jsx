
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast";
import { deleteAddress, fetchAddressesByUser } from "../reducer/addressSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function AddressList() {  
  // const [userId, setUserId] = useState(null); 
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector((state) => state.address);
    const {user} = useSelector((state)=>state.user)
    let userId = user ? user.user._id : null;
 console.log(address) 
const navigate = useNavigate();
const token = localStorage.getItem("jwtToken"); 

//  useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("Decoded JWT:", decoded); // Check the actual field names
//         setUserId(decoded._id || decoded.id); // Try both _id and id
//       } catch (error) {
//         console.error("Error decoding JWT token:", error);
//         toast.error("Invalid session. Please log in again.");
//         navigate("/login"); // Redirect to login page if necessary
//       }
//     }
//   }, [navigate]);


   useEffect(() => {
       dispatch(fetchAddressesByUser(userId));
     }, [userId, dispatch]); 

    const handleRemove = async (addressId) => {
      try {
        await dispatch(deleteAddress({ userId, addressId })).unwrap();
        toast.success("Address deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete address");
      }
    };
  return (
    <>
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
      {  address && address?.length > 0 ?  
              address?.map((address) => (
                <div className="col-md-3 py-2" key={address._id}>
                  <div className="card">
                    <div className="card-body">
                      {address.name}, {address.city}, {address.postalCode},{" "}
                      {address.country}
                      <button
                        className="btn btn-danger float-end btn-sm mt-1"
                        onClick={() => handleRemove(address._id)}
                      >
                        Remove
                      </button>
                     
                    </div>
                  </div>
                </div>
              ))
             : (
              <p className="p-3 bg-body-tertiary rounded ms-3 ">
                Address list is Empty. Please add new address.
              </p>
            )}
    </>
  )
}

export default AddressList
