import Category from '../../components/Category'
import ProductsSlide from '../../Slide/ProductsSlide'
import ImageSlide from '../../Slide/ImageSlide'

function Home() { 
  return (
    <div >       
        <div className='container mb-5 '>
        <Category/>
        <ImageSlide/>              
        <ProductsSlide/> 
        </div>        
       
    </div>
  )
}

export default Home