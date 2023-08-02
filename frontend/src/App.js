import React, { useEffect } from 'react';
import './App.css';
import Home from './Component/Home/Home';
import ProductDetails from './Component/Product/ProductDetails';
// import Footer from './Component/layout/Footer/Footer';
import Header from './Component/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from './Component/User/LoginSignUp';
import { clearError, loadUser } from './actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import store from "./store";
import Profile from './Component/User/Profile';
import Products from './Component/Product/Products';
import Search from './Component/Product/Search';
import Cart from './Component/Cart/Cart';
import toast, { Toaster } from 'react-hot-toast';



function App() {
  const { isLoggedIn, error } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser());
   
  }, []);



  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={!isLoggedIn ? <LoginSignUp /> : <Profile />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      </Router>

      {/* <Footer /> */}
      <Toaster />
    </div>
  );
}

export default App;
