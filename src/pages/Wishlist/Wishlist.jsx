import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RenderWishlistProduct from "./RenderWishlistProduct";
import { useGetWishlist, useGetOrderItems } from "../../components/FatchingData";
const Wishlist = () => {
const {wishlist, loadingWishlist, errorWishlist} = useGetWishlist()
const { orderItems } = useGetOrderItems()
  return (
    <div>
      <Header wishlist={wishlist} />
      <div className="container px-4  py-3">
        <h2>
          Your Wishlist{" "}
          {wishlist && wishlist?.length > 0 ? wishlist?.length : ""}
        </h2>
        {loadingWishlist ? (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        ) : (
          <div>
            {wishlist?.length > 0 ? (
              <RenderWishlistProduct wishlist={wishlist} orderItems={orderItems}/>
            ) : (
              <p className="p-3 bg-body-tertiary rounded ">
                Wishlist is Empty.
              </p>
            )}
          </div>
        )}
        {errorWishlist && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {errorWishlist}
          </p>
        )}
      </div>
      <br/>     
        <br/>     
        <br/> 
      <Footer />
    </div>
  );
};

export default Wishlist;
