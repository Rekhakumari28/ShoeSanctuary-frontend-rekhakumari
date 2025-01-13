import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RenderCartProduct from "./RenderCartProduct";
import PriceDetails from "./PriceDetails";

const Cart = ({
  orderItems,
  products,
  loadingOrderItems,
  errorOrderItems,
  address,
  user,
}) => {
  console.log(orderItems);
  return (
    <div>
      <Header />
      <div className="container px-4  py-3">
        <h2>Your Cart</h2>
        {loadingOrderItems ? (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        ) : (
          <div className="row">
            {orderItems && orderItems.length > 0 ? (
              <>
                <div className="col-md-6">
                  <RenderCartProduct orderItems={orderItems}  products={products}/>
                </div>
                <div className="col-md-6 mt-2">
                  <PriceDetails
                    orderItems={orderItems}
                    address={address}
                    user={user}
                  />
                </div>
              </>
            ) : (
              <p className="p-3 bg-body-tertiary rounded ms-3">Cart is Empty.</p>
            )}
          </div>
        )}
        {errorOrderItems && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {errorOrderItems}
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
