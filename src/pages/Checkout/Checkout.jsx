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
            <Link to={`/products`} className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black" >
              <img className='p-2' style={{ maxWidth: "350px", display: 'block', margin: "auto" }} src="https://cdn.undraw.co/illustrations/order-confirmed_m9e9.svg" alt="Order Confermed" />
              <p style={{ textDecoration: "none" }}>Your Order is Placed Successfully. Please Continue Shopping with us.</p>
            </Link>
          </div>
          <div className='card rounded p-2 bg-body-tertiary mb-2'>
            <h4 className='ms-3 p-2 mt-2 '>Order Summery: Total Order Amount: ₹{cartSummery.totalPrice}</h4> 
            <hr />    
            <div className='row mt-3'>              
                {cartSummery?.orderItems?.map(order=>(
                  <>
                  <div className='col-md-3 text-center' key={order._id}>
                  <img className='p-1' style={{height:"120px", width:"120px"}} src={order.product.images} alt={order.product.title} />
                </div>
                 <div className='col-md-9'>                 
                   <h5>{order.product.title}</h5>
                   <span><strong>Price: </strong> ₹{order.product.price}</span>{" | "}
                   <span><strong>Discount: </strong>{order.product.discount}</span>{" | "}
                   <span><strong>Rating: </strong>{order.product.rating}</span>
                   <p>{order.product.description.substring(0,300)}</p>  
             
               </div>
               </>
                ))} 
            </div>
            <hr />           
            <span  className='ms-3 p-2 mt-2 mb-3 '><strong>Shipping Address:</strong> {cartSummery?.shippingAddress?.address} {cartSummery?.shippingAddress?.city} {cartSummery?.shippingAddress?.postalCode} {cartSummery?.shippingAddress?.country}</span>         
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default Checkout