import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchWishlist, removeItemFromWishlist } from "../../reducer/wishlistSlice";
import { fetchCart } from "../../reducer/shoppingBagSlice";

const Wishlist = () => {
 const [userId, setUserId] = useState(null);
 const navigate = useNavigate();
 const token = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
   const { user } = useSelector((state) => state.user.user);
    // let userId = user ? user?._id : null;    

  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const {loading, error} = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // Check the actual field names
        setUserId(decoded._id || decoded.id); // Try both _id and id
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        toast.error("Invalid session. Please log in again.");
        navigate("/login"); // Redirect to login page if necessary
      }
    }
  }, [navigate]);

useEffect(() => {
  if (userId) {
    dispatch(fetchWishlist(userId));
  } else {
    console.error("User ID is undefined", userId);
  }
}, [dispatch, userId]);



if (!userId) {
  return (
    <div className="text-center">
      <p>Loading user data...</p>
    </div>
  );
}

const handleRemoveFromWishlist = (product) => {
  dispatch(removeItemFromWishlist({ userId, productId: product.productId }))
    .unwrap()
    .then(() => {
      toast.error("Item removed from wishlist");
      dispatch(fetchWishlist(userId)); // Refresh the wishlist after removal
    })
    .catch((err) => {
      toast.error(err.message || "Failed to remove item");
    });
};

const handleMoveToBag = async (product) => {
  try {
    await dispatch(
      addItemToBag({
        userId,
        productId: product.productId,
        title: product.title,       
        price: product.price,       
        images: product.images,
      })
    ).unwrap();
     handleRemoveFromWishlist(product);
    toast.success("Item moved to bag");
    dispatch(fetchCart(userId));
  } catch (err) {
    toast.error(err.message || "Failed to move item");
  }
};

  return (    
            <div className="container px-4  py-3 mb-5">
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
     {wishlistItems && wishlistItems?.length === 0 ? (
        <div className="text-center py-5 my-5">
          
          <h2 className="fw-bolder pb-3">Wishlist is Empty</h2>
          <p className="text-muted fs-5 pb-4">
            Add items that you like to your wishlist. Review them anytime and
            easily move them to the bag.
          </p>
          <Link
            className="btn btn-outline-primary"
            to="/products"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <h2>My Wishlist ({wishlistItems.length}) Item</h2>
         
          {wishlistItems && wishlistItems?.length > 0 && wishlistItems?.map((product) => (
          
            <div className="col-md-3  p-2" key={product.productId}>
            <div>
              <div
                style={{ height: "260px", maxWidth: "300px" }}
                className="card bg-white border border-0 shadow mt-3"
              >
                {" "}
                <div className="text-center ">               
                    <img
                      style={{ height: "180px", maxWidth: "180px" }}
                      className="img-fluid rounded  mt-2"
                      src={product.images}
                      alt={product.title}
                    />
                     <button
                className="remove-overlay btn btn-light border-radius-30px position-absolute top-0 end-0"
                  onClick={() => handleRemoveFromWishlist(product)}
                  aria-label="Remove from wishlist"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
              </button>
              
                </div>
                <div className="card-body">
                  <span>{product.title.substring(0, 20)} </span>
                  <br />
                  <span>Price: ₹{product.price}</span>
                                 </div>
              </div>
              <div className="d-grid gap-2 " style={{ maxWidth: "300px" }} >
                <button
                  className="btn btn-primary"
                  onClick={() => handleMoveToBag(product)}
                >
                  Move to cart
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
        
      </div>
      
     
  );
};

export default Wishlist;
