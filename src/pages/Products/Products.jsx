import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import {
  useGetOrderItems,
  useGetWishlist,
} from "../../components/FatchingData";
import useFetch from "../../useFetch";

const Products = () => {
const [allProducts, setAllProducts] = useState([])
const [filteredData, setFilteredData] = useState([]);
  const { orderItems } = useGetOrderItems();
  const { wishlist } = useGetWishlist();

  const {productCategory} = useParams();

  const [filterByCategory, setFilterByCategory] = useState(productCategory === "All"  ? ["Men", "Women", "Boys", "Girls"] : [productCategory]);
  const [filterByRating, setFilterByRating] = useState(0);
  const [filterByPrice, setFilterByPrice] = useState("none");

  const [ filterByGender ,setFilterByGender] = useState([])
  
  const { data, loading, error } = useFetch("https://backend-shoesanctuary-major-project.vercel.app/api/products")

useEffect(()=>{
if(productCategory === "All"){
  setFilterByCategory([])
}else{
  setFilterByCategory([productCategory])
}
},[productCategory])


useEffect(()=>{
  if(data ){
    setAllProducts(data)
    setFilteredData(data)
  }
},[data])

useEffect(()=>{
  allFilter()
},[filterByCategory, filterByRating, filterByPrice, allProducts])

const allFilter = ()=>{
  let filtered = allProducts

  //filter by category
  if(filterByCategory.length > 0 && !filterByCategory.includes("All")){
    filtered = filtered?.filter(prod=> filterByCategory.includes(prod.category?.category))
    setFilterByGender(filtered)
  }
 
  //filter by rating
  if(filterByRating != 0){
    filtered = filtered?.filter(
      (prod) => prod.rating >= filterByRating && prod.rating < 5
    )
  }

  //filter by price
  if(filterByPrice === "Low to high"){
    filtered = [...filtered]?.sort(
      (firstItem, secondItem) => firstItem.price - secondItem.price
    )
  }else if("High to low"){
filtered = [...filtered]?.sort(
  (firstItem, secondItem) => secondItem.price - firstItem.price
)
  }
 
  setFilteredData(filtered)
}

  //handle filter by category

  const handleCategoryCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setFilterByCategory((prevValue) => [...prevValue, value]);
    }
    else {
      setFilterByCategory((prevValue) =>
        prevValue.filter((prev) => prev !== value)
      );
    }
  };


  //handle filter by price sorting
  const handlePriceSort = (event) => {
    setFilterByPrice(event.target.value);
  };

const handleRatingFilter = (event)=>{
  setFilterByRating(event.target.value)
}

  //handle crear all filters
  const handleClearFilter = () => {    
    setFilterByCategory([]);
    setFilterByRating(0);
    setFilterByPrice("none");    
  };

  
  const handleSearchProductFromNavbar = (searchProduct)=>{
    if(searchProduct === ""){
      setFilteredData(filterByGender)
    }else {
      const filtered = filteredData.filter(product=> product.title.toLowerCase().includes(searchProduct.toLowerCase()))
      setFilteredData(filtered)
    }
  }

    return (
    <div>
      <Header
              searchProducts={()=>handleSearchProductFromNavbar}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-body-tertiary mb-5">
            {/* categoryFilter */}
            <div className="mx-3">
              <label className="my-2">
                <h3>Category</h3>
              </label>
              <br />
              <label className="my-2">
                <input
                  onChange={handleCategoryCheckbox}
                  type="checkbox"
                  name="category"
                  value="Men"
                  checked={filterByCategory.includes("Men") }
                />{" "}
                Men{" "}
              </label>
              <br />
              <label className="my-2">
                <input
                onChange={handleCategoryCheckbox}
                type="checkbox"
                name="category"
                value="Women"
                checked={ filterByCategory.includes("Women")}
                />{" "}
                Women{" "}
              </label>
              <br />
              <label className="my-2">
                <input
                   onChange={handleCategoryCheckbox}
                   type="checkbox"
                   name="category"
                   value="Girls"
                   checked={filterByCategory.includes("Girls")}
                />{" "}
                Girls{" "}
              </label>
              <br />
              <label className="my-2">
                <input
                   onChange={handleCategoryCheckbox}
                   type="checkbox"
                   name="category"
                   value="Boys"
                   checked={ filterByCategory.includes("Boys")}
                />{" "}
                Boys{" "}
              </label>
              <br />
           
            </div>

            {/* ratingFilter */}
            <div className="mx-3">
              <h3>Rating</h3>
              <label className="my-2">
                <input
                  onChange={handleRatingFilter}
                  type="range"
                  value={filterByRating}
                  min={0}
                  max={5}
                  step={0.1}
                />
                {filterByRating}
              </label>
            </div>

            {/* sortPriceFilter */}
            <div className="mx-3">
              <h3>Price</h3>
              <label>
                <input
                  type="radio"
                  value="Low to high"
                  name="price"
                  checked={filterByPrice === "Low to high"}
                  onChange={handlePriceSort}
                />{" "}
                Low to high
              </label>{" "}
              <label>
                <input
                  type="radio"
                  value="High to low"
                  name="price"
                  checked={filterByPrice === "High to low"}
                  onChange={handlePriceSort}
                />{" "}
                High to low
              </label>
            </div>

            {/* clearFilter */}
            <div className="mt-3 mx-3">
              <h4>
                Clear Filter{" "}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleClearFilter}
                >
                  Clear
                </button>{" "}
              </h4>
            </div>
          </div>

          <div className="col-md-10">
            {loading && (
              <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
                Loading...
              </p>
            )}
            {error && (
              <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
                {error}
              </p>
            )}
            <div className="row ms-2 mb-5">
              {filteredData?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wishlist={wishlist}
                  orderItems={orderItems}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Products;
