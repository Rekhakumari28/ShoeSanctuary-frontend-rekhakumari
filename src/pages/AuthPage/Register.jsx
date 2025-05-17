import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../reducer/userSlice";
import toast from "react-hot-toast";

const RegisterProfilePage = () => {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");     
    }else{
      
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Registration successful! Redirecting to Login...");
        navigate(`/login`);
      })
      .catch((err) => {
        toast.error(err.message || "Registration failed.");
      });
    }
   
  };

  const handleGuestLogin = ()=>{
   const emailGuest = "guestlogin@example.com"
   setEmail(emailGuest)
   const passwordGuest = "guestlogin"
   setPassword(passwordGuest)
 }  

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="col-md-4 col-sm-6">
        <h2 className="text-center">Register Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow mb-5"
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={handleGuestLogin}
          >
            Login as Guest
          </button>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

     
    </div>
  );
};

export default RegisterProfilePage;
