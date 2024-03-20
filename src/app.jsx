import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import PaymentForm from "./component/Payment/Payment/payment";
import SignInSignUpForm from "./component/Payment/Login/Login";
import Profile from "./component/Payment/profile";
import Chat from "./pages/Chat";
import ResetPasswordForm from "./component/Payment/Login/reset";
import ChangePasswordreset from './component/Payment/Login/confirm'
import ChangePasswordForm from "./component/Payment/Login/setting";
import BasicStack from "./component/Payment/userinfo"

const App = () => {
  const [books, setBooks] = useState(Books);
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setBooks(Books);
  //   }, 1200);
  //   return () => clearTimeout(timeout)
  // }, []);

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

    // handleSubmit(book);
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
  const location = useLocation();
  return (
    <React.Fragment>
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

        <Route path="/payments" element={<PaymentForm />} />
        <Route path="/signin" element={<SignInSignUpForm />} />
        <Route path="/profile" element={<BasicStack />} />
        <Route path="/reset" element={<ResetPasswordForm />} />
<Route path="/setting" element={<ChangePasswordForm />} />
<Route path="/resetpassword" element={<ChangePasswordreset />} />

      </Routes>

      <Footer />
    </React.Fragment>
  );
};

export default App;
