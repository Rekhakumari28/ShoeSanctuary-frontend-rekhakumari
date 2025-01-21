import { useEffect, useState } from "react";

export const useGetProducts = ()=>{
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [errorProducts, setErrorProducts] = useState(null);
   useEffect(()=>{
    setLoadingProducts(true);
      fetch("https://backend-shoesanctuary-major-project.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data) 
      })
      .catch((error) => setErrorProducts(error.message))
      .finally(() => setLoadingProducts(false));
    },[])
    return { products , loadingProducts, errorProducts }
}

export const useGetWishlist = ()=>{
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [errorWishlist, setErrorWishlist] = useState(null);
 useEffect(()=>{
  setLoadingWishlist(true);
    fetch("https://backend-shoesanctuary-major-project.vercel.app/api/wishlists")
    .then((res) => res.json())
    .then((data) => {
      setWishlist(data)
            
    })
    .catch((error) => setErrorWishlist(error.message))
    .finally(() => setLoadingWishlist(false));
  },[])
  return { wishlist , loadingWishlist, errorWishlist }
}

export const useGetAddress = ()=>{
  const [address, setAddress] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [errorAddress, setErrorAddress] = useState(null);
 useEffect(()=>{
  setLoadingAddress(true);
    fetch("https://backend-shoesanctuary-major-project.vercel.app/api/addresses")
    .then((res) => res.json())
    .then((data) => {
      setAddress(data)
           
    })
    .catch((error) => setErrorAddress(error.message))
    .finally(() => setLoadingAddress(false));
  },[])
  return { address , loadingAddress, errorAddress }
} 

export const useGetUserByEmail = (objectEmail)=>{
  const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
 useEffect(()=>{
  setLoadingUser(true);
    fetch(`https://backend-shoesanctuary-major-project.vercel.app/api/users/${objectEmail}`)
    .then((res) => res.json())
    .then((data) => {
      setUser(data)
            
    })
    .catch((error) => setErrorUser(error.message))
    .finally(() => setLoadingUser(false));
  },[])
  return { user , loadingUser, errorUser }
}

export const useGetOrderItems = ()=>{
  const [orderItems, setOrderItems] = useState([]);
  const [loadingOrderItems, setLoadingOrderItems] = useState(false);
  const [errorOrderItems, setErrorOrderItems] = useState(null);
 useEffect(()=>{
  setLoadingOrderItems(true);
    fetch("https://backend-shoesanctuary-major-project.vercel.app/api/orderItems")
    .then((res) => res.json())
    .then((data) => {
      setOrderItems(data)            
    })
    .catch((error) => setErrorOrderItems(error.message))
    .finally(() => setLoadingOrderItems(false));
  },[])
  return { orderItems , loadingOrderItems, errorOrderItems }
} 

export const useGetCart = ()=>{
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [errorCart, setErrorCart] = useState(null);
 useEffect(()=>{
  setLoadingCart(true);
    fetch("https://backend-shoesanctuary-major-project.vercel.app/api/carts")
    .then((res) => res.json())
    .then((data) => {
      setCart(data)       
    })
    .catch((error) => setErrorCart(error.message))
    .finally(() => setLoadingCart(false));
  },[])
  return { cart , loadingCart, errorCart }
} 