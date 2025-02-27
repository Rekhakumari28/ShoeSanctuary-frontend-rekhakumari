import { Link } from "react-router-dom";
const Category = () => {
  
  const categoryImage = [
    {
      id: "1",
      category: "Men",
      image:
        "https://assets.ajio.com/medias/sys_master/root/20240129/BECS/65b6bf0a16fd2c6e6ac45b86/-473Wx593H-467014777-tan-MODEL7.jpg",
    },
    {
      id: "2",
      category: "Women",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/12/365430631/LB/YJ/FA/6215968/casual-women-shoes.jpg",
    },
    {
      id: "3",
      category: "Boys",
      image:
        "https://cartnear.s3.us-east-2.amazonaws.com/ng/e6fe4b4baf2fbd0d96dc0b481e1b9317.jpg",
    },
    {
      id: "4",
      category: "Girls",
      image:
        "https://i.pinimg.com/736x/8e/be/af/8ebeafd83b7beaf0dbd1ed90b683027f.jpg",
    },
  ];

  return (
    <div className="container">
      <h4 className="text-center">All Categories</h4>
      <div className="row ">
        {categoryImage.map((image) => (
          <div className="col-md-2 text-center  mx-3" key={image.id}>
          <Link to={`/products/${image.category}`}  className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black" >
              <img
                style={{ height: "150px", width: "150px" }}
                className="img-fluid rounded-circle "
                src={image.image}
                alt={image.category}
              />
              <p>{image.category}</p>
            </Link>
          </div>
        ))}
        <div className="col-md-2 text-center mx-3">
        <Link to={`/products/All`}  className="link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-black" >
              <img
                style={{ height: "150px", width: "150px" }}
                className="img-fluid rounded-circle "
                src="https://www.solepodiatry.com.au/wp-content/uploads/basketball-shoe-buying-guide-blog-m.jpeg"
                alt="All"
              />
              <p>All</p>
            </Link>
        </div>
      </div>
    </div>
  );
};
export default Category;
