import React, { useEffect, useState } from "react";

const RatingFilterComponent = ({ onRatingChange, reset }) => {
  const [filterByRating, setFilterByRating] = useState(null);
  
  useEffect(() => {
    if (reset) {
      setFilterByRating(null);
      onRatingChange(null);
    }
  }, [reset, onRatingChange]);

  
  const handleRatingFilter = (event)=>{
    setFilterByRating(event.target.value)
    onRatingChange(filterByRating);
  }

  return (
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
