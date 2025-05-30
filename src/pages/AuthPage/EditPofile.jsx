import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "../../reducer/userSlice";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

function EditPofile() {
    const [name, setName] = useState("")
    const [userId, setUserId] = useState(null);

const dispatch = useDispatch();
const navigate = useNavigate();
const { user} = useSelector((state) => state.user.user);
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

useEffect(()=>{
  
    if(userId){
        dispatch(fetchUserById(userId))
    }
},[dispatch, userId])

useEffect(()=>{
if(user){
    setName(user.name)
}
},[user])


const handleSubmit = ( event )=>{
   event.preventDefault();
    const updatedUser = {name, userId}
    dispatch(updateUser(updatedUser))
    .unwrap()
    .then(() => {
      toast.success("Profile updated successfully!");
    navigate(`/userProfile/${userId}`);
      setTimeout(()=>{
window.location.reload()
  
        }, 500)
    })
    .catch((error) => {
     toast.error("Failed to update profile.")
     console.log("Error: ", error)
    });
}

  return (
    <div className="container mt-5">
    <h2>Edit Profile</h2>
    <form onSubmit={handleSubmit}>
      <div className=" col-md-7 margin-auto mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Profile
      </button>
    </form>
   
  </div>
  )
}

export default EditPofile
