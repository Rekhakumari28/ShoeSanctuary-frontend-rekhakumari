import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, Link, useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = ({ products, loadingProducts, errorProducts, wishlist }) => {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(false)
  const navigate = useNavigate()
  const productId = useParams();

  const productData = products?.find((prod) => prod._id == productId.productId);

  const similerProduct = products?.filter(
    (product) => product.category?.category === productData?.category?.category
  );
 
  const wishlistProductId = wishlist?.lenght > 0 && wishlist[wishlist?.length - 1]
 
  //add to wishlist
  const handleAddToWishlist = async (object) => {
    const value = object;
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/wishlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: value }),
        }
      );
      if (!response.ok) {
        throw "Failed to add product.";
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        toast.success("Product is added to the wishlist.");
       
      }
    } catch (error) {
      toast.error("Error occured while adding product to wishlist. ");
    }
  };

  //remove product from cart
  const removeProductFromCart = async (productId) => {

    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/wishlists/${productId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw "Failed to remove product from wishlist.";
      }
      const data = await response.json();
      if (data) {

        toast.success("Product removed from wishlist Successfully.");
      }
    } catch (error) {
      toast.error("An error occured while fetching wishlist products.", error);
    }
  };

  //add to cart
  const handleAddToCart = async (object) => {
    const value = object;
    try {
      const response = await fetch(
        `https://backend-shoesanctuary-major-project.vercel.app/api/orderItems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: value }),
        }
      );
      if (!response.ok) {
        throw "Failed to add product to cart.";
      }
      const data = await response.json();
      if (data) {
        toast.success("Product is added to the cart");
       
      }
    } catch (error) {
      toast.error("Error: ", error);
    }
  };


  return (
    <div>
      <Header />
      <div className="container">
        {loadingProducts && (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        )}
        {errorProducts && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {errorProducts}
          </p>
        )}
        <div className="row my-3">
          <h2>Product Details</h2>

          <div className="col-auto ">
            <div
              className="card border-0 shadow-lg"
              style={{ height: "400px", width: "450px" }}
            >
              <div className="text-center mt-4 ">
                <img
                  style={{ height: "320px", width: "300px" }}
                  className="img-fluid rounded"
                  src={productData?.images}
                  alt="Men's Shoes"
                />
                <div className="card-img-overlay ">
                  <div className="row">
                    {" "}
                    <div className="col-auto bg-light rounded-circle  ">
                    <span className="mt-2">{productData?.rating}{" "}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-warning mb-1" viewBox="0 0 16 16">
                 
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrent(!current) ; {!current ? handleAddToCart(productData) : navigate("/cart")}
            }}
          >{!current ? "Add to Cart" : "Go To Cart"}
           
          </button>{" "}
          <button isActive={active}
            onClick={() => {
              setActive(!active); { !active ? handleAddToWishlist(productData) : removeProductFromCart(wishlistProductId._id) }
              ;
            }}
            className="btn btn-outline-primary"
          >{!active ? "Add To Wishlist" : "Remove From Wishlist"}</button>

        </div>
          </div>
          <div className="col-auto shadow-lg ">
            <div
              className="card border-0 "
              style={{ height: "400px", width: "500px" }}
            >
              <div className="card-body">
                <h4>{productData?.title}</h4>
                <p>Rating: {productData?.rating}</p>
                <p>Price: ₹{productData?.price}</p>
                <p>Discount: {productData.discount}%</p>
                <p>Size: {productData.size.join(", ")}</p>
                <p>Category: {productData?.category?.category}</p>
                <p>Description: {productData?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div >
          <h3>Similer Products</h3>
          <div className="row">
            {similerProduct?.map((product) => (
              <div className="col-md-3 my-2 p-2" key={product._id}>
                <div key={product._id}>
                  <div
                    style={{ height: "260px", width: "230px" }}
                    className="card bg-white border border-0 shadow mt-3"
                  >
                    {" "}
                    <div className="text-center ">
                      <Link to={`/productDetails/${product._id}`}>
                        <img
                          style={{ height: "150px", width: "150px" }}
                          className="img-fluid rounded  mt-3"
                          src={product.images}
                          alt={product.title}
                        />
                        <div className="card-img-overlay ">
                          <div className="row">
                            {" "}
                            <div className="col-auto bg-light rounded-circle  ">                              
                <span className="mt-2">{product.rating}{" "}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-warning mb-1" viewBox="0 0 16 16">
                 
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <span>{product.title.substring(0, 20)} </span>
                      <br />
                      <span>Price: ₹{product.price}</span>{" "}|{" "}
                      <span>Discount: {product.discount}%</span>
                    </div>
                  </div>
                  <div className="d-grid gap-2" style={{ width: "230px" }} >
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/productDetails/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProductDetails;
