import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import useFetch from '../../useFetch'
const UsersProfile = ({ user }) => {

  const userProfile = user?.length > 0 && user[user?.length - 1]
  const { data } = useFetch(`https://backend-shoesanctuary-major-project.vercel.app/api/cartHistory`)
  const dataList = data?.reverse()

  return (
    <div>
      <Header />
      <div className="container px-4  py-3">
        <h2>Your Profile</h2>
        <div className="row ">
          <div className='card bg-body-tertiary'>
            <div className='row'>
              <div className='col-md-6 text-center'>
                <img style={{ height: "250px", width: "250px" }} src={userProfile?.profileImage} alt={userProfile?.username} />
              </div>
              <div className='col-md-6 card-body '>
                <h2 className='display-4'>{userProfile?.username}</h2>
                <p className='fs-5'>Email: {userProfile?.email}</p>
                <p className='fs-5'>Phone: {userProfile?.phone}</p>

              </div>
            </div>
            <div className='my-2'>
              <h4>Order History</h4>
              {dataList?.map(order => (
                <ul className='list-group' key={order._id}>
                  {order?.orderItems?.map(product => (
                    <li className='list-group-item' key={product._id}>
                      <p className='fs-5 fw-normal'>{product.product.title}</p>
                      <p className='my-1'>  Price:  ₹{product.product.price} | Size: {product.product.size}</p>
                      <p className='my-1'>Description: {product.product.description}</p>
                      <p className='mb-1'>Quantity:  {product.quantity}</p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default UsersProfile