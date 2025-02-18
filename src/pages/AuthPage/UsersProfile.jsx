import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import useFetch from '../../useFetch'
const UsersProfile = ({user }) => {
   
    const userProfile = user?.length > 0 && user[user?.length -1]     
    const {data} = useFetch(`https://backend-shoesanctuary-major-project.vercel.app/api/cartHistory`)
    
  return (
    <div>
    <Header/>  
    <div className="container px-4  py-3">
      <h2>Your Profile</h2>
      <div className="row ">          
            <div className='card bg-body-tertiary'>
              <div className='row'>
                <div className='col-md-4 text-center'>
                <img style={{height:"250px", width:"250px"}} src={userProfile?.profileImage} alt={userProfile?.username} />
                </div>               
                <div className='col-md-8 card-body'>
                <h2>{userProfile?.username}</h2> 
                <span>Email: {userProfile?.email}</span> {" "} {" | "}  {" "}
                <span>Phone: {userProfile?.phone}</span>
                <div className='my-2'>
                  <h4>Order History</h4>
                  {data?.map(order=>(
                    <ul className='list-group' key={order._id}>
                      {order?.orderItems?.map(product=>(
                        <li className='list-group-item' key={product._id}>
                         <p className='my-1'> {product.product.title} | Price:  {product.product.price} | Size: {product.product.size}</p>
                         <p className='mb-1'>Quantity:  {product.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  ))}
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