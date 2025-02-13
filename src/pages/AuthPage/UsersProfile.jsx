import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import useFetch from '../../useFetch'
const UsersProfile = ({user }) => {
   
    const userProfile = user?.length > 0 && user[user?.length -1]
    console.log(userProfile)
    const userId = userProfile?._id
    const {data} = useFetch(`https://backend-shoesanctuary-major-project.vercel.app/api/carts/${userId}`)
console.log(data)

  return (
    <div>
    <Header/>  
    
    <div className="container px-4  py-3">
      <h2>Your Profile</h2>
      <div className="row ">          
            <div className='card bg-body-tertiary'>
              <div className='row'>
                <div className='col-md-6 text-center'>
                <img src={userProfile?.profileImage} alt={userProfile?.username} />
                </div>               
                <div className='col-md-6 card-body'>
                <h2>{userProfile?.username}</h2> 
                <span>Email: {userProfile?.email}</span> {" "} {" | "}  {" "}
                <span>Phone: {userProfile?.phone}</span>
              
                <div className='my-2 bg-white'>
                  <h4>Order History</h4>
                  <p>{}</p>
                </div>
                </div>             
              </div>              
            </div>          
        </div>
    </div>
    <br/>     
       <br /> 
    <Footer/>
  </div>
  )
}

export default UsersProfile