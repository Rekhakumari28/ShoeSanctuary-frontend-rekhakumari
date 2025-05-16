import React, { useEffect, useState } from "react";

const RatingFilterComponent = ({ onRatingChange, reset }) => {
  const [filterByRating, setFilterByRating] = useState(null);
  
  useEffect(() => {
    if (reset) {
      setSelectedRating(null);
      onRatingChange(null);
    }
  }, [reset, onRatingChange]);

  const handleRatingFilter = (event)=>{
    setFilterByRating(event.target.value)
  }

  return (
    // <div role="group" aria-labelledby="rating-filter">
    //   <h5 id="rating-filter" className="fw-bolder">
    //     Ratings
    //   </h5>
    //   {ratings.map((rating) => (
    //     <div
    //       key={rating}
    //       style={{ marginBottom: "0.5rem" }}
    //       className="form-check"
    //     >
    //       <input
    //         type="radio"
    //         id={`rating-${rating}`}
    //         name="rating"
    //         className="form-check-input"
    //         value={rating}
    //         checked={selectedRating === rating} // Ensure radio button reflects state
    //         onChange={() => handleRatingSelect(rating)} // Handle rating selection
    //         aria-label={`Select rating ${rating} & above`}
    //       />
    //       <label htmlFor={`rating-${rating}`} className="form-check-label">
    //         {rating} Stars & above
    //       </label>
    //     </div>
    //   ))}
    // </div>
    <div className="mx-3">
           {/* ratingFilter */}
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
  );
};

export default RatingFilterComponent;
