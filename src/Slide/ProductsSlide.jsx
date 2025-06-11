import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../reducer/productSlice";


const ProductsSlider = () => {    
const dispatch = useDispatch()
const {products, loading, error} = useSelector((state)=> {
  return state.allProducts
})


const featuredProducts = products.data?.products?.filter(product=> product.title === "Terfill Girls Lace Sneakers" || product.title ==="ELLE Brown Solid Slip-On Party Wear" )
useEffect(()=>{
dispatch(fetchAllProducts())
},[])
console.log(featuredProducts)
  
  return (
    <div>
      <div className="slider-container py-2 pb-3 ">
        <div className="row">
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

        <h3 className="py-2">Featured Products</h3>
       
            {Array.isArray(featuredProducts) && featuredProducts?.map((product) => (
              <div className="col-md-6 " key={product._id}>
                <div className="row">
                  <div className="col-md-6"> <Link to={`/productDetails/${product._id}`} className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black" >
                   <div className="card text-center border-0">
                    <img
                      style={{ height: "300px", maxWidth: "300px" }}
                      className="img-fluid rounded "
                      src={product.images}
                      alt={product.title}
                    />
                  </div>
                 
                </Link></div>
                  <div className="col-md-6">
                     <h4>{product.title}</h4>
                     <p>PRice: {product.price}</p>
                     <p>Discount: {product.discount}%</p>
                     <p>Rating: {product.rating}</p>
                     <p>Description: {product.description.substring(0, 150)}</p>
                  </div>
                </div>
               
              </div>
             ))} 
         
        </div>
      </div>
    </div>
  );
};
export default ProductsSlider;
