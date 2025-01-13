import React, {useState} from 'react'

const ListOfAddressComponent = ({address}) => {
   
    const handleRemove = async (addressId) =>{
        try {
          const response = await fetch(`https://backend-shoesanctuary-major-project.vercel.app/api/addresses/${addressId}`,
           { method: "DELETE"},
        );
        
          if(!response.ok){
            throw "Failed to delete Address."
          }
          const data = await response.json()
          if(data){
            setSuccessMessage("Address deleted Successfully.")
            console.log("Address deleted Successfully.", data)
          }
        } catch (error) {
          console.log("Error: ", error)
        }
     }
  return (
    <div className='row py-2 '>
       
         {address &&  address?.map(address=>(
         <div className='col-md-12 py-2' key={address._id}>
         <div className='card'>
           <div className='card-body'>
               
            {address.address}, {address.city}, {address.postalCode},  {address.country}
             <button className='btn btn-danger float-end btn-sm' onClick={()=>handleRemove(address._id)}>Remove</button>                   
           </div>
         </div>
                
       </div>
      ))}
      
    </div>
  )
}

export default ListOfAddressComponent