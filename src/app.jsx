import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddNewItem from "./component/addnewitem/addnewitem";
import Admin from "./component/admin/admin";
import Edit from "./component/edit/edit";
import ShoppingCart from "./component/shoppingcart/shoppingcart";
import BookDetails from "./component/bookdetails/bookdetails";
import HomePage from "./component/homepage/homepage";
import ContactUs from "./component/contact/contact";
import Navbar from "./component/navbar/navbar";
import Books from "./component/db";
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
  const [books, setBooks] = useState(Books);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");

  const onWishlist = (book) => {
    //edit
    book.wishlist = true;
    setBooks([...books], books);
  };

  const onCart = (book) => {
    //edit
    book.isInCart = true;
    book.count++;
    setBooks([...books], books);
  };

  const handleRemoveItem = async (book) => {
    //clone

    //edit
    if (book.wishlist === true) {
      book.wishlist = false;
    }
    book.isInCart = false;
    setBooks([...books], books);
  };

  const handleDelete = async (book) => {
    //clone
    //edit
    const newbooks = books.filter((p) => book.id !== p.id);
    //set state
    setBooks(newbooks);
  };

  const handleIncrement = (book) => {
    const index = books.indexOf(book);
    //edit
    books[index].count++;
    //
    setBooks(books);
  };

  const handleDecrement = (book) => {
    //edit
    if (book.count >= 1) {
      book.count--;
    } else {
      alert("the count cannot be less than one item");
    }
    //
    setBooks(books);
  };

  return (
    <>
      <Navbar books={books} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage onSave={onCart} books={books} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/ratingform" element={<RatingForm />} />
        <Route
          path="/admin/edit"
          element={<Edit books={books} onDelete={handleDelete} />}
        />
        <Route path="/allbooks" books element={<AllBooks books={books} />} />
        <Route
          path="/admin/addnewitem"
          element={<AddNewItem books={books} setBooks={setBooks} />}
        />
        <Route
          path="/bookdetails/:id"
          element={
            <BookDetails
              books={books}
              onSave={onCart}
              onWishlist={onWishlist}
            />
          }
        />

        <Route
          path="allbooks/bookdetails/:id"
          element={
            <BookDetails
              books={books}
              onSave={onCart}
              onWishlist={onWishlist}
            />
          }
        />
        <Route
          path="wishlist/bookdetails/:id"
          element={
            <BookDetails
              books={books}
              onSave={onCart}
              onWishlist={onWishlist}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<Wishlist books={books} onDelete={handleRemoveItem} />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/shoppingcart"
          element={
            <ShoppingCart
              books={books}
              onSave={onCart}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onDelete={handleRemoveItem}
            />
          }
        />
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
