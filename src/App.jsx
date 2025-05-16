import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Address from "./pages/Address/Address";
import Login from "./pages/AuthPage/Login";
import Checkout from "./pages/Checkout/Checkout";
import UsersProfile from "./pages/AuthPage/UsersProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/AuthPage/Register";
import EditPofile from "./pages/AuthPage/EditPofile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
   <Router>
    <Header/>
      <Routes>
        <Route element={<PrivateRoute/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:productCategory" element={<Products />} />
        <Route path="/address" element={<Address />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile/:userId" element={<UsersProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/edit-profile/:userId" element={<EditPofile/>}/>
      </Routes>
      <Footer/>
   </Router>
  );
}

export default App;
