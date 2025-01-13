import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
const UsersProfile = () => {
  return (
    <div>
        <Header/>
        <div className='row'>
            <div className='col-md-2'>
                <div className='border' >
                    <ul className='nav flex-column '>
                        <li className='nav-item'>
                            <Link className='nav-link active' aria-current="page" to="/login">Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/address">Address</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/checkout">Checkout</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='col-md-10'></div>
        </div>
        <Footer/>
    </div>
  )
}

export default UsersProfile