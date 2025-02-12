import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from "react-router-dom";
import { useGetCart } from '../../components/FatchingData';
const Checkout = () => {
  const { cart } = useGetCart()
  const cartSummery = cart?.length > 0 && cart[cart?.length - 1]
  return (
    <div>
      <Header />
      <div className='container'>
        <div>

          <div className="p-4 text-center  ">
            <Link to={`/products`}>
              <img className='p-2' style={{ maxWidth: "350px", display: 'block', margin: "auto" }} src="https://cdn.undraw.co/illustrations/order-confirmed_m9e9.svg" alt="Order Confermed" />
              <p style={{ textDecoration: "none" }}>Your Order is Placed Successfully. Please Continue Shopping with us.</p>
            </Link>
          </div>
          <div className='card rounded p-2 bg-body-tertiary mb-2'>           
            <div className='card-body '>
            <h4 >Order Summery</h4>
              <p>Total Order Amount: ₹{cartSummery.totalPrice}</p>
              <p>Shipping address: {cartSummery?.shippingAddress?.address} {cartSummery?.shippingAddress?.city} {cartSummery?.shippingAddress?.postalCode} {cartSummery?.shippingAddress?.country}</p>
            </div>

          </div>

        </div>
      </div>
      <br/>     
        <br/>     
        <br/> 
      <Footer />
    </div>
  )
}

export default Checkout