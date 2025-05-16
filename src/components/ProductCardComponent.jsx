import { Link } from "react-router-dom"

 export const ProductCardComponent =({products})=>{
    return(
      <>
         {Array.isArray(products) ? ( products.map(product=>
          <>
             <div className="col-md-3">
                            {product.images.map((img) => (
                              <img
                                style={{ maxWidth: "150px", height: "150px" }}
                                src={img}
                                alt={product.title}
                              />
                            ))}{" "}
                          </div>
                          <div className="col-md-6 ">
                            <h5>{product.title}</h5>
                            <p>Price: ₹{product.price} </p>
                            <p>Quantity: ₹{product.quantity} </p>
                          </div>
                          <div className="col-md-3">                            
                           
                              <Link to={`/productDetails/${product.productId}`}  className="btn btn-light"><h6>Buy Again</h6>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#ffc107"
                                  className="bi bi-bag-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                                </svg>
                              </Link>
                          
                          </div>
          </>
        )) :  ( 
            <>
             <div className="col-md-3">
                            {products.images.map((img, index) => (
                              <img key={index}
                                style={{ maxWidth: "150px", height: "150px" }}
                                src={img}
                                alt={products.title}
                              />
                            ))}{" "}
                          </div>
                          <div className="col-md-6 ">
                            <h5>{products.title}</h5>
                            <p>Price: ₹{products.price} </p>
                            <p>Quantity: ₹{products.quantity} </p>
                          </div>
                          <div className="col-md-3">
                            <Link to={`/productDetails/${products.productId}`} className="btn btn-light">
                              <h6>Buy Again</h6>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#ffc107"
                                className="bi bi-bag-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                              </svg>
                            </Link>
                          </div>
            
            </>
         ) }
      </>
    )
  } 