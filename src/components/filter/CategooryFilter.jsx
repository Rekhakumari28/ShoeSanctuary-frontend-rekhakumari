import React, { useEffect, useState } from "react";

const CategoryFilter = ({ categories, onCategoryChange, reset , productCategory}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (reset) {
      setSelectedCategories([]);
    }
  }, [reset]);

  const handleCategoryCheckbox = (event) => {
    const category = event.target.value;
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((id) => id !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  }; 

  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories, onCategoryChange]);

  return (
    <>
   
    <div className="mx-3">
    <label className="my-2">
      <h3>Category</h3>
    </label>

     {categories.map((category)=> <div key={category.id}>
      <label className="my-1" >
      <input
        onChange={handleCategoryCheckbox}
        type="checkbox"
        name="category"
        value={category.category}
        checked={selectedCategories.includes( category.category  ) }
      />{" "} 
      {category.category}{" "}
    </label> 
    <br/>
   
    </div>
    )} 
  
  {/* <div className="mx-3">
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
                  checked={selectedCategories.includes("Men") }
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
                checked={ selectedCategories.includes("Women")}
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
                   checked={selectedCategories.includes("Girls")}
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
                   checked={ selectedCategories.includes("Boys")}
                />{" "}
                Boys{" "}
              </label>
              <br />
           
            </div>
     */}
 
  </div>
  </>
  )
};

export default CategoryFilter;
