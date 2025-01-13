import React, { useState } from 'react'
import axios from "axios";
const Register = () => {
    const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [phone, setphone] = useState("");
       
      const handleUserLoginForm = async (event) => {
        event.preventDefault();   
        try {

            await axios.post("https://backend-shoesanctuary-major-project.vercel.app/api/users",{
                username,
                email,
                password,
                phone
            })
            alert("Registration Completed! Now login.");
          
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      
  return (
    <div>
       
       <form onSubmit={handleUserLoginForm}>
          <div className="form-floating mb-3  ">
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Rekha Kumari Bheel"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="username">Username:</label>
          </div>
          <div className="form-floating mb-3  ">
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="example@mail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email">Email:</label>
          </div>
          <div className="form-floating mb-3 ">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="password">Password:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="phone."
              placeholder="phone"
              value={phone}
              onChange={(event) => setphone(event.target.value)}
            />
            <label htmlFor="password">Phone Number:</label>
          </div>
          <div className="notificationContainer">
            <button className="btn btn-primary my-3" type="submit">
              Login
            </button>
          </div>
        </form> 
       
    </div>
  )
}

export default Register