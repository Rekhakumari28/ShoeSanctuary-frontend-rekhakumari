
import { Link } from 'react-router-dom'

function SimilarProductComponent() {
  const similerProduct = [
    { 
        _id : 1,
        title: "Men Round Toe Sneakers",
        price: 1770,
        images: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRFePaadmiTHYK0GB4yvhzNarWk4Le_LRc4pEBpcNVQF_dOQde7CRHLkhG0r0GloTnmxiwHZbdNAQqcxdKdACWe5bqP9ivZJimy8Y25Lr4TFhBMeBrUCmnbhyw&usqp=CAE",
        rating: 4.5,
        size: [
            "M",
            "L",
            "XL"
        ],
        category: "Men",
        discount: 30,
        description: "Material: Sole - EVA+TPR | Upper - PU+Mesh | Insole material - Molded foam These low-cut casual sneaker shoes are a perfect fit and are made up of a molded foam insole. The EVA+TPR sole material and round-toe shape give the perfect classy vibes. Features: Heel Height - Flat | Toe Shape - Round Benefits: A must-have pair because of the elegance and style it offers, a low-cut pattern with an EVA+TPR sole material for a smooth and classy finish."
    },
    {
        _id : 2,
        title: "Men Textured Formal",
        price: 1558,
        images: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQhYjlLSVxLO4e_vLkqSf7x495PSHGMgXGZhquVc2ixqVZ6HC_Zg0NC0f9eNJlg8h2NymNVdzYC0n_D6XWwbIfHCRqK88_2kZvsCy_5kH62&usqp=CAE",
        rating: 3.8,
        size: [
            "S",
            "M",
            "L"
        ],
        category: "Men",
        discount: "20%",
        shorDetail: "Men's · 7 · Lace-up Boots · Formal",
        description: "A pair of black textured formal derbys with regular styling has a lace-up closure Synthetic patent upper Cushioned footbed Textured and patterned outsole"
    },
    {
        _id : 3,
        title: "Men Synthetic Boots",
        price: 558,
        images: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRx4ysHwq54FEXVQ-EKBRr1wesdlc3APcgmbHKxJi5VJ6knfwhnGlM9mgGsAzSz9TIJVJAilZjbkbf645uowgvIhKaljlA9Ywl9TxulUTqUQJoEJcNIVM73lw",
        rating: 3.2,
        size: [
            "XS",
            "S",
            "M",
            "L",
            "XL"
        ],
        category: "Men",
        discount: "10%",
        shorDetail: "Men's · 7 · Casual",
        description: "Shoes Are The Quintessential Components Of One's Attire. A Trendy Pair Of Shoes Can Set You Apart In A Crowd And Transform You Into A Style Icon. Shoes Not Only Enhance Your Appearance, But Also Help In Boosting Your Confidence."
    }
  ]

  return (
    <>
       {similerProduct && similerProduct?.length > 0 && similerProduct?.map((product) => (
              <div className="col-md-3 mb-2 p-2" key={product.id}>
                <div>
                  <div
                    style={{ height: "260px", maxWidth: "300px" }}
                    className="card bg-white border border-0 shadow mt-3"
                  >
                    {" "}
                    <div className="text-center ">
                      <Link to={`/productDetails/${product._id}`}>
                        <img
                          style={{ height: "150px", maxWidth: "150px" }}
                          className="img-fluid rounded  mt-3"
                          src={product.images}
                          alt={product.title}
                        />
                        <div className="card-img-overlay ">
                          <div className="row">
                            {" "}
                            <div className="col-auto bg-light rounded-circle  ">                              
                <span className="mt-2">{product.rating}{" "}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill text-warning mb-1" viewBox="0 0 16 16">
                 
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <span>{product.title.substring(0, 20)} </span>
                      <br />
                      <span>Price: ₹{product.price}</span>{" "}|{" "}
                      <span>Discount: {product.discount}%</span>
                    </div>
                  </div>
                  <div className="d-grid gap-2" style={{ maxWidth: "300px" }} >
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/productDetails/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))} 
    </>
  )
}

export default SimilarProductComponent
