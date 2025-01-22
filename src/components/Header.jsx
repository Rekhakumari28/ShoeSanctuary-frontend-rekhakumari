import React from "react";
import { Link } from "react-router-dom";
import {
  useGetWishlist,
  useGetOrderItems,
 useGetUserByEmail
} from "./FatchingData";
const Header = (props) => {
  const { wishlist } = useGetWishlist();
  const wishlistCounter = wishlist.length > 0 ? wishlist.length : "";
 const {user} = useGetUserByEmail()
 const userProfile = user?.length > 0 && user[user?.length -1]
  const { orderItems } = useGetOrderItems();
  const orderItemsCounter = orderItems && orderItems.length > 0 ? orderItems.length : "";
  return (
    
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <h1 id="brandName">ShoeSanctuary</h1>
              <small className="fs-6">
                Socially & Environmentally Prograsive
              </small>
            </Link>

            <div className="col-auto float-end">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item  mt-4">
                    {location.pathname === "/products" ? (
                      <div className="input-group mb-3 float-end">
                        <span className="input-group-text" id="basic-addon1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </span>
                        <input
                          className="form-control"
                          placeholder="Search"
                          type="text"
                          value={props.value}
                          onChange={props.searchProducts}
                        />
                      </div>
                    ) : (
                      <Link to="/products" className="nav-link">
                        <button className="btn btn-outline-secondary btn-sm">
                          Products
                        </button>
                      </Link>
                    )}
                  </li>
                  <li className="nav-item dropdown mt-4 ">
                    <Link
                      className="nav-link"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
                    </Link>
                    <ul className="dropdown-menu ">
                      <li>
                        <strong className="mx-2">{userProfile?.username}</strong>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      
                      <li>
                        {" "}
                        <Link to="/userProfile" className="nav-link ">
                           Profile
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/login" className="nav-link ">
                          Login 
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/address" className="nav-link ">
                          Address
                        </Link>
                      </li>
                     
                    </ul>
                  </li>

                  <li className="nav-item  mt-4">
                    <Link to="/wishlist" className="nav-link position-relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>{" "}
                      <span className="position-absolute top-25 start-100 translate-middle badge border border-light bg-danger p-1">
                        {wishlistCounter}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item  mt-4">
                    <Link to="/cart" className="nav-link position-relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cart3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                      </svg>
                      <span className="position-absolute top-25 start-100 translate-middle badge border border-light bg-danger p-1">
                        {orderItemsCounter}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
   
  );
};

export default Header;
