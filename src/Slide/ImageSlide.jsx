import { Link } from "react-router-dom";
import Slider from "react-slick";

const ImageSlide = () => {
  const imagesForSlide = [
    "https://cdn.anscommerce.com/image/catalog/brandstore/khadims/leather-boots.jpeg",
    "https://footwearnews.com/wp-content/uploads/2022/04/DSC03535.jpg?w=1000&h=530&crop=1",
    "https://www.livieandluca.com/cdn/shop/articles/Blog_Post_1_1280x600_How_to_Wash_Kids_Shoes_bubbles_1000x530.jpg?v=1652200317",
  ];
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  const myStyle = {
    maxWidth: "100%",
    height: "auto",
  };
  return (
    <div className="container">
      <Slider {...settings}>
        {imagesForSlide.map((img, index) => (
          <div className="py-2" key={index}>
            <Link to="/products">
              <img style={myStyle} className="d-block w-100" src={img} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ImageSlide;
