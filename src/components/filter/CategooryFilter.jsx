import React, { useEffect, useState } from "react";

const CategoryFilter = ({ categories, onCategoryChange, reset }) => {
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
    <br />
    {categories.map((category)=> 
      <label className="my-2" key={category.id}>
      <input
        onChange={handleCategoryCheckbox}
        type="checkbox"
        name="category"
        value={category.category}
        checked={selectedCategories.includes(category.category) }
      />{" "}
      {category.category}{" "}
    </label>
    )}
  
  
    <br />
 
  </div>
  </>
  )
};

export default CategoryFilter;
