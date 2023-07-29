import React, { useEffect } from 'react';
import './App.css';
import Home from './Component/Home/Home';
import ProductDetails from './Component/Product/ProductDetails';
import Footer from './Component/layout/Footer/Footer';
import Header from './Component/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from './Component/User/LoginSignUp';
import { loadUser } from './actions/userActions';
import { useSelector } from "react-redux";
import store from "./store";
import Profile from './Component/User/Profile';
import Products from './Component/Product/Products';
import Search from './Component/Product/Search';
import Cart from './Component/Cart/Cart';



function App() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
    return () => {

    }
  }, []);



  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route  path="/search" element={<Search/>} />
          <Route  path="/cart" element={<Cart/>} />
        </Routes>

      </Router>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
