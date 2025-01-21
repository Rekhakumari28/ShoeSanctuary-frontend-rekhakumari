import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const UsersProfile = ({user}) => {
    const {username , email , phone} = user
  return (
    <div>
    <Header/>  
    
    <div className="container px-4  py-3">
      <h2>Your Profile</h2>
      <div className="row text-center">
          
            <div className='card'>
              <div className='card-body bg-body-tertiary'>
              <span>{username}</span> {" "} | {" "} 
                <span>Email: {email}</span> {" "} | {" "} 
                <span>Phone: {phone}</span>
              </div>
              
            </div>
          
        </div>
    </div>
   
    <Footer/>
  </div>
  )
}

export default UsersProfile