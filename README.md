# ShoeSanctuary

I built a fully functional eCommerce web application as part of my full-stack development journey.
The app allows users to browse, filter, and purchase products, offering a seamless shopping experience.<br>
Built with a React frontend, Express/Node backend, MongoDB database, and JWT-based authentication.

---

## Demo Link

[Live demo](https://shoe-santuary-rekhakumari.vercel.app/)

---

## Login

> **Guest**  
> Email: `guestlogin@example.com`  
> Password: `guestlogin`

---

## Quick Start

```
git clone https://github.com/Rekhakumari28/ShoeSanctuary-frontend-rekhakumari.git
cd ShoeSanctuary-frontend-rekhakumari
npm install
npm run dev
```

## Technologies

- React JS
- Bootstrap
- Redux 
- Node.js
- Express
- MongoDB
- JWT

## Demo Video

Explore a 5-6 minute walkthrough showcasing all major features of this app.
[Loom Video Link](https://www.loom.com/share/b50aea60fae14e548839719cabdfa92e?sid=c2b7ce7f-0804-46c5-8c7f-6deadcf53e7b)

## Features

**Home**

- Displays all categories
- React image slider (carousel)
- Fratured Products

**Product Listing**

- Displays all available products in a grid view
- Shows product image, name, price, and rating
- Filtering & Sorting

**Product Details**

- View full product details with description, price, rating, category, and images
- Includes 'Add to Cart' and 'Add to Wishlist' buttons for quick shopping actions.
- Displays similar products based on category or user interest

**Shopping Cart**

- Add items to cart from the product page
- View cart summary with total price
- Update quantity or remove items

**Wishlist**

- Save products for later using the wishlist feature
- Move items from wishlist to cart

**Authentication**

- New users can register
- Secure login system using JWT.

## API Reference

### **GET /api/products**<br>

Displays a list of all available products.<br>
Sample API response<br>

```[{_id, title, price, description, discount, rating, images}, ...]```

### **GET /api/products/:id**<br>

Fetch and display details for a single selected product<br>
Sample API response<br>

```{_id, title, price, images, description, discount, rating}```

### **POST /api/cart/:userId/items**<br>

Authenticated users can securely add products to their cart<br>
Sample API response<br>

```{_id, title, price, images}```

### **POST /api/user/signup**<br>

Register a new user<br>
Sample API response<br>
```{ userId, token }```

## Contact

Encountered a problem or have a suggestion? Reach out at rekha.kumari1928@gmail.com.
