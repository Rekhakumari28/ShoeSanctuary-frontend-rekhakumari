import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Category from '../../components/Category'
import ProductsSlide from '../../Slide/ProductsSlide'
import ImageSlide from '../../Slide/ImageSlide'
function Home() {   
  return (
    <div >
        <Header />
        <ImageSlide/>
        <Category/>
        <ProductsSlide/>        
        <Footer/>
    </div>
  )
}

export default Home