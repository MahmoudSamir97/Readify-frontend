import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./component/admin/admin";
import Edit from "./component/edit/edit";
import ShoppingCart from "./component/shoppingcart/shoppingcart";
import BookDetails from "./component/bookdetails/bookdetails";
import HomePage from "./component/homepage/homepage";
import ContactUs from "./component/contact/contact";
import Navbar from "./component/navbar/navbar";
import AllBooks from "./component/allbooks/allbooks";
import Wishlist from "./component/wishlist/wishilst";
import RatingForm from "./component/ratingform/ratingform";
import Footer from "./component/footer/footer";
import AboutUs from "./component/aboutus/aboutus";
import SignInSignUpForm from "./component/Payment/Login/Login";
import Profile from "./component/Payment/profile";
import Chat from "./pages/Chat";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import CheckoutSuccess from "./component/CheckoutSuccess/CheckoutSuccess";
import EditProfile from "./component/EditProfile/EditProfile";
import ChangePassword from "./component/ChangePassword/ChangePassword";
import Helps from "./component/Helps/Helps";

const App = () => {
  // const [BooksData, setBooksData] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  // const [cart, setCart] = useState([]);
  // const removeFromCart = (bookToRemove) => {
  //   setCart((prevCart) =>
  //     prevCart.filter((book) => book.id !== bookToRemove.id)
  //   );
  // };
  // const addToWishlist = (favouredBook) => {
  //   favouredBook.wishlist = true;
  //   setWishlist([...wishlist, favouredBook]);
  // };
  // const addToCart = (book) => {
  //   book.isInCart = true;
  //   book.count++;
  //   setCart([...cart, book]);
  // };
  // const handleRemoveItem = async (book) => {
  //   if (book.wishlist === true) {
  //     book.wishlist = false;
  //   }
  //   book.isInCart = false;
  //   setBooks([...books], books);
  // };
  // const handleDelete = async (book) => {
  //   const newbooks = books.filter((p) => book.id !== p.id);
  //   setBooks(newbooks);
  // };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/ratingform" element={<RatingForm />} />
        <Route path="/admin/edit" element={<Edit />} />
        <Route path="/allbooks" books element={<AllBooks />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
        <Route path="allbooks/bookdetails/:id" element={<BookDetails />} />
        <Route path="wishlist/bookdetails/:id" element={<BookDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/signin" element={<SignInSignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/helps" element={<Helps />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetLink" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
