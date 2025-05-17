import React, { useState, useEffect } from "react";
import AddAddressComponent from "../../components/AddAddressComponent";
import AddressList from "../../components/AddressList";

function Address() {  
  
  return (
    <div>
      <div className="mt-3 row border bg-light rounded">
        <div className="col-md-8">
          <h4 className="mt-2">Address</h4>
        </div>
        <div className="col-md-4  ">
          <button
            className="navbar-toggler float-end"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>{" "}
            <button className="btn btn-primary  mt-2 px-2">Add address</button>
          </button>
        </div>
        <div className="col-md-12">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="container py-2">
             <AddAddressComponent />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {" "}
          <hr />
        
          <div className="row pb-2 ">
          <AddressList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
