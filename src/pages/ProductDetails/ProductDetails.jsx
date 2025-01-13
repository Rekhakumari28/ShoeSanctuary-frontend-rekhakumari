import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = ({ products, loadingProducts, errorProducts }) => {
  const productId = useParams();

  const productData = products?.find((prod) => prod._id == productId.productId);

  const similerProduct = products?.filter(
    (product) => product.category?.category === productData?.category?.category
  );

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
      toast.success("Product is added to wishlist.", data);
    } catch (error) {
      toast.error("Failed to fetch wishlist data from backend. ", error);
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
      toast.success("Product is added to cart", data);
    } catch (error) {
      toast.error("Failed to fetch wishlist data from backend. ", error);
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

          <div className="col-md-5 ">
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
                      <Link onClick={() => handleAddToWishlist(productData)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-grid gap-2" style={{ width: "450px" }}>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(productData)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-md-7 shadow-lg ">
            <div
              className="card border-0 "
              style={{ height: "400px", width: "500px" }}
            >
              <div className="card-body">
                <h4>{productData?.title}</h4>
                <p>Rating: {productData?.rating}</p>
                <p>Price: {productData?.price}</p>
                <p>Category: {productData?.category?.category}</p>
                <p>Description: {productData?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center">
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
                          className="img-fluid rounded  mt-1"
                          src={product.images}
                          alt={product.title}
                        />
                        <div className="card-img-overlay ">
                          <div className="row">
                            {" "}
                            <div className="col-auto bg-light rounded-circle  ">
                              <Link
                                onClick={() => handleAddToWishlist(product)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-heart"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <span>{product.title.substring(0, 20)} </span>
                      <br />
                      <span>Price: ${product.price}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
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
