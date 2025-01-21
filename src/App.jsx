import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Address from "./pages/Address/Address";
import Auth from "./pages/AuthPage/Auth";
import {
  useGetWishlist,
  useGetProducts,
  useGetAddress,
  useGetUserByEmail,
  useGetOrderItems,
  useGetCart
} from "./components/FatchingData";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const { wishlist, loadingWishlist, errorWishlist } = useGetWishlist();
  const { products, loadingProducts, errorProducts } = useGetProducts();
  const { address, loadingAddress, errorAddress } = useGetAddress();
  const { user, loadingUser, errorUser } = useGetUserByEmail(
    "rekha.kumari1928@gmail.com"
  );
  const { orderItems, loadingOrderItems, errorOrderItems } = useGetOrderItems();
const {cart , loadingCart, errorCart} = useGetCart()
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
              wishlist={wishlist}
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
              wishlist={wishlist}
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
              cart= {cart}
              
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              loadingWishlist={loadingWishlist}
              errorWishlist={errorWishlist}
            />
          }
        />
        <Route
          path="/products/:productCategory"
          element={
            <Products
              products={products}
              loadingProducts={loadingProducts}
              errorProducts={errorProducts}
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
          path="/auth"
          element={
            <Auth user={user} loadingUser={loadingUser} errorUser={errorUser} />
          }
        />
        <Route path="/checkout"  element={<Checkout/>} />
      </Routes>
    </>
  );
}

export default App;
