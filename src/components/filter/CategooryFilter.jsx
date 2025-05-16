import React, { useEffect, useState } from "react";

const CategoryFilter = ({ categories, onCategoryChange, reset }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (reset) {
      setSelectedCategories([]);
    }
  }, [reset]);

  const handleCategoryCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories((prevValue) => [...prevValue, value]);
    }
    else {
      setSelectedCategories((prevValue) =>
        prevValue.filter((prev) => prev !== value)
      );
    }
  }; 

  // useEffect(() => {
  //   onCategoryChange(selectedCategories);
  // }, [selectedCategories, onCategoryChange]);

  return (
    <>
   
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
  </>
  )
};

export default CategoryFilter;
