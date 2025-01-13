import React from "react";
import Login from "./Login";
import Register from "./Register";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Auth = () => {
  return (
    <div>
      <Header/>
      <Register />
      <Login />
      <Footer/>
    </div>
  );
};

export default Auth;



