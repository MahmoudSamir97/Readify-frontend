import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AuthenticatedLayout;
