import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeItemFromBag,
  updateItemQuantityInBag,
} from "../reducer/shoppingBagSlice";
import { addItemToWishlist, fetchWishlist } from "../reducer/wishlistSlice";

const RenderCartProduct = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  let userId = user ? user?._id : null;

  const { items, loading, error } = useSelector((state) => state.shoppingBag);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);
  const handleRemoveFromCart = async (product) => {
    if (!userId) {
      console.error("User ID is undefined.");
      toast.error("Please log in to manage your bag.");
      return;
    }
    try {
      await dispatch(
        removeItemFromBag({ userId, productId: product.productId })
      ).unwrap();
      toast.success("Item removed from bag");
      dispatch(fetchCart(userId));
    } catch (err) {
      toast.error(err.message || "Failed to remove item");
    }
  };

  const handleMoveToWishlist = async (product) => {
    if (!userId) {
      console.error("User ID is undefined.");
      toast.error("Please log in to move items to wishlist.");
      return;
    }

    try {
      await dispatch(
        removeItemFromBag({ userId, productId: product.productId })
      ).unwrap();
      await dispatch(
        addItemToWishlist({
          userId,
          productId: product.productId,
          title: product.title,
          price: product.price,
          images: product.images,
        })
      ).unwrap();
      toast.success("Item moved to wishlist");
      dispatch(fetchCart(userId));
      dispatch(fetchWishlist(userId));
      window.location.reload()
    } catch (err) {
      toast.error(err.message || "Failed to move item");
    }
  };

  const handleQuantityChange = useCallback(
    async (id, event) => {
      event.preventDefault();

      const newQuantity = parseInt(event.target.value);

      if (!isNaN(newQuantity) && newQuantity > 0) {
        if (!userId) {
          console.error("User ID is undefined.");
          toast.error("Please log in to update quantity.");
          return;
        }

        try {
          await dispatch(
            updateItemQuantityInBag({
              userId,
              productId: id,
              quantity: newQuantity,
            })
          ).unwrap();
          toast.success("Quantity updated");
          dispatch(fetchCart(userId));
        } catch (err) {
          toast.error(err.message || "Failed to update quantity");
        }
      }
    },
    [dispatch, userId]
  );

  return (
    <>
       {loading === true && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        )}
        {error !== null && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {error}
          </p>
        )}
      {items.products && items.products?.length > 0 ? (
        items.products?.map((product) => (
          <div
            className="card bg-body-tertiary mb-3 border-0"
            key={product.productId}
            style={{ maxWidth: "540px"  }}
          >
            <div className="row g-0 p-2">
              <div className="col-md-5 ">
                <div className="d-grid ">
                  <img
                
                    className="img-fluid "
                    src={product.images}
                    alt={product.title}
                  />
                  <button
                    className="remove-overlay btn btn-light border-radius-30px position-absolute top-0 end-0"
                    aria-label="Remove from cart"
                    onClick={() => handleRemoveFromCart(product.productId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#dc3545"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="col-md-7  ">
                <div className="mx-3">
                  <h4>{product.title}</h4>
                  <p className="mb-1 fw-normal fs-5">Price: ₹{product.price}</p>

                  <p className="mt-1 mb-1">
                    {" "}
                    <form onSubmit={(e) => e.preventDefault()}>
                     
                      <p className="fw-normal fs-5 mb-1"><label >Quantity:</label></p>
                        <select
                          className="form-select "
                         style={{maxWidth:"100px"}}
                          value={product.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.productId, e)
                          }
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                    
                    </form>
                  </p>
               
                <button
                  style={{ maxWidth: "250px" }}
                  className="btn btn-outline-secondary "
                  onClick={() => handleMoveToWishlist(product)}
                >
                  Move to Wishlist
                </button>
              
                </div>
              </div>
            </div>
           
          </div>
        ))
      ) : (
        <p className="p-3 bg-body-tertiary rounded ms-3">Cart is Empty.</p>
      )}
    </>
  );
};
export default RenderCartProduct;
