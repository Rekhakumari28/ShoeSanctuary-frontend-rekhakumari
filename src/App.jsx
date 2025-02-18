import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Address from "./pages/Address/Address";
import Login from './pages/AuthPage/Login'
import Checkout from "./pages/Checkout/Checkout";
import UsersProfile from "./pages/AuthPage/UsersProfile";
import {
  useGetWishlist,
  useGetProducts,
  useGetAddress,
  useGetUserByEmail,
  useGetOrderItems,
  useGetCart
} from "./components/FatchingData";

function App() {
  const { wishlist} = useGetWishlist();
  const { products, loadingProducts, errorProducts } = useGetProducts();
  const { address, loadingAddress, errorAddress } = useGetAddress();
  const { user, loadingUser, errorUser } = useGetUserByEmail();
  const { orderItems, loadingOrderItems, errorOrderItems } = useGetOrderItems();
  const { cart} = useGetCart()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              loadingProducts={loadingProducts}
              errorProducts={errorProducts}             
            />
          }
        />
        <Route
          path="/productDetails/:productId"
          element={
            <ProductDetails
              products={products}
              loadingProducts={loadingProducts}
              errorProducts={errorProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              orderItems={orderItems}
              products={products}
              loadingOrderItems={loadingOrderItems}
              errorOrderItems={errorOrderItems}
              address={address}
              user={user}
              cart={cart}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />
        <Route
          path="/products/:productCategory"
          element={
            <Products
              products={products}
              loadingProducts={loadingProducts}
              errorProducts={errorProducts}
              wishlist={wishlist}
            />
          }
        />
        <Route
          path="/address"
          element={
            <Address
              address={address}
              loadingAddress={loadingAddress}
              errorAddress={errorAddress}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route path="/userProfile" element={<UsersProfile user={user} loadingUser={loadingUser} errorUser={errorUser} />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </>
  );
}

export default App;
