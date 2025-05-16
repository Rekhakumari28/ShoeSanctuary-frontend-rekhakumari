import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addAddress, fetchAddressesByUser } from "../reducer/addressSlice";
const AddAddressComponent = () => {
 const [formData, setFormData] = useState({
     name: "",
     city: "",
     postalCode: "",
     country: "",
   });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  let userId = user ? user.user._id : null;

  useEffect(() => {
    dispatch(fetchAddressesByUser(userId));
  }, [userId, dispatch]);
  

const handleAddAddress = (event) => {
   
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "postalCode" ? parseInt(value) : value,
    }));
  };

   const HandleSubmitForm = async (e) => {
    e.preventDefault();
 
    dispatch(addAddress({ userId, formData })).unwrap();
    toast.success("Address added successfully!");
  };

  return (
   <>
    <form onSubmit={HandleSubmitForm}>
                <div className="input-group py-2">
                  <label className="input-group-text">Name: </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleAddAddress}
                  />
                  <label className="input-group-text">City: </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleAddAddress}
                  />
                </div>
                <div className="input-group py-2">
                  <label className="input-group-text">Postal Code: </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleAddAddress}
                  />

                  <label className="input-group-text">Country: </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="India"
                    name="country"
                    value={formData.country}
                    onChange={handleAddAddress}
                  />
                  <button className="btn btn-primary " type="submit">
                    Add
                  </button>
                </div>
              </form>
   </>
  
  );
};

export default AddAddressComponent;
