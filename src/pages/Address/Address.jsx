import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AddressComponent from "./AddAddressComponent";
import ListOfAddressComponent from "./ListOfAddressComponent";
function Address({ address, loadingAddress, errorAddress }) {
  return (
    <div>
      <Header />
      <div className="container">
        <h4>Your Address</h4>
        {loadingAddress ? (
          <p className="text-center p-3 mb-2 bg-primary-subtle text-info-emphasis fw-normal ">
            Loading...
          </p>
        ) : (
          <>
          <AddressComponent />
          <hr /> {
            address.length > 0 ? (
              <div>
                  <h4 className='py-2'>Select Preffered Address:</h4>
              <ListOfAddressComponent address={address} /></div>
            ) : 
            <p className="p-3 bg-body-tertiary rounded ms-3">Address list is Empty. Please add new address.</p>
          }
            
          </>
        )}

        {errorAddress && (
          <p className="text-center p-3 mb-2 bg-warning-subtle text-info-emphasis fw-normal">
            {errorAddress}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Address;
