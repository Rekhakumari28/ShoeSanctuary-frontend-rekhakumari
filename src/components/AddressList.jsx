
import toast from "react-hot-toast";
import { deleteAddress } from "../reducer/addressSlice";
function AddressList({address , userId}) {   
  
    const handleRemove = async (addressId) => {
      try {
        await dispatch(deleteAddress({ userId, addressId })).unwrap();
        toast.success("Address deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete address");
      }
    };
  return (
    <>
      {  address && address?.length > 0 ?  
              address?.map((address) => (
                <div className="col-md-12 py-2" key={address._id}>
                  <div className="card">
                    <div className="card-body">
                      {address.name}, {address.city}, {address.postalCode},{" "}
                      {address.country}
                      <button
                        className="btn btn-danger float-end btn-sm"
                        onClick={() => handleRemove(address._id)}
                      >
                        Remove
                      </button>
                     
                    </div>
                  </div>
                </div>
              ))
             : (
              <p className="p-3 bg-body-tertiary rounded ms-3 ">
                Address list is Empty. Please add new address.
              </p>
            )}
    </>
  )
}

export default AddressList
