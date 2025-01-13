import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const AddressComponent = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleAddAddress = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "postalCode" ? parseInt(value) : value,
    }));
  };
  const HandleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-shoesanctuary-major-project.vercel.app/api/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw "Failed to add address.";
      }
      const data = await response.json();
      if (data) {
        toast.success("Address added successfully!");
        console.log("address added", data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setFormData({
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
  };

  return (
    <div>
      <div className="container py-2">
        <form onSubmit={HandleSubmitForm}>
          <div className="input-group py-2">
            <label className="input-group-text">Address: </label>
            <input
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
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
              Add Address
            </button>
          </div>
         
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default AddressComponent;
