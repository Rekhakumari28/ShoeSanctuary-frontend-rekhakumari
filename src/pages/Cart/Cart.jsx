import React from "react";

import PriceDetails from "../../components/PriceDetails";
import RenderCartProduct from "../../components/RenderCartProduct";

const Cart = () => {
  return (
    <div>
      <div className="container px-4  py-3 mb-5">
        <h2>Your Cart</h2>       

        <div className="row">
          <div className="col-md-6">
           <RenderCartProduct />
          </div>
          <div className="col-md-6">
            <PriceDetails  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
