import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../reducer/userSlice";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
const navigate = useNavigate()


  const handleUserLoginForm = (event) => {
    event.preventDefault();
  const credentials ={email, password}
  dispatch(loginUser(credentials)).unwrap().then((user)=>{
    console.log("After login user data: ", user.user._id)
    toast.success("Login Successfully!")
    navigate(`/home`)
  }).catch((error)=>{
    console.log("Error: ",error)
    toast.error("Login failed.")
  })
    
  };

  const handleGuestLogin = ()=>{
    // "name":"guest",
   const emailGuest = "guestlogin@example.com"
   setEmail(emailGuest)
   const passwordGuest = "guestlogin"
   setPassword(passwordGuest)
 }
  return (
         <div className="container py-2">
       
        <form onSubmit={handleUserLoginForm}>
          <div className="col-md-7 m-auto ps-3 border shadow mt-3" >
            <div className="col-md-7 mt-3 m-auto">
            <h2>User Login</h2>
            </div>
            <div className="col-md-7 m-auto "> 
            <label htmlFor="email">Email: </label>
              <input
              type="text"
              id="email"
              className="form-control"
              placeholder="name@example.com"
           value={email}
              onChange={(event)=>setEmail(event.target.value)}
            />
            </div>

            <div className="col-md-7 m-auto">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="(ex: password@123)"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />            
            </div>
            <div className="col-md-7 m-auto">
            <button className="btn btn-primary my-2 mb-3" type="submit">
              Login
            </button>
            <button className="btn btn-success my-2 mb-3 ms-2" onClick={handleGuestLogin}>Guest login</button>
            <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
            </div>
          </div>
        </form>
        <br /><br />
      </div>    
 
     
  
  );
};

export default Login;

