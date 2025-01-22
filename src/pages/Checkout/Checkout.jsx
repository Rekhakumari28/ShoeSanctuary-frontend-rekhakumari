import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link} from "react-router-dom";

const Checkout = () => {

  return (
    <div>
        <Header />
        <div className='container'>
        <div>
        
          <div className="p-4 text-center  ">
            <Link to={`/products`}>
            <img className='p-2' style={{maxWidth: "350px" , display: 'block', margin: "auto"}} src="https://cdn.undraw.co/illustrations/order-confirmed_m9e9.svg" alt="Order Confermed" />
              <p style={{textDecoration: "none"}}>Your Order is Placed Successfully. Please Continue Shopping with us.</p>
            </Link>
          </div>
      
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Checkout