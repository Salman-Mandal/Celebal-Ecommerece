import React, { useEffect } from 'react';
import './App.css';
import Home from './Component/Home/Home';
import ProductDetails from './Component/Product/ProductDetails';
import Header from './Component/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from './Component/User/LoginSignUp';
import { loadUser } from './actions/userActions';
import { useDispatch } from "react-redux";
import store from "./store";
import Profile from './Component/User/Profile';
import Products from './Component/Product/Products';
import Search from './Component/Product/Search';
import Cart from './Component/Cart/Cart';
import ProtectedRoute from './Component/Route/ProtectedRoute';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './Component/layout/Footer/Footer';
import Shipping from './Component/Cart/Shipping';
import ConfirmOrder from './Component/Cart/ConfirmOrder';
import Payment from './Component/Cart/Payment';
import OrderSuccess from './Component/Cart/OrderSuccess';


function App() {
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

          {/* <Route path="/account" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } /> */}

          <Route element={<ProtectedRoute />}>
            <Route path='/account' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/order/confirm' element={<ConfirmOrder />} />
            <Route path='/process/payment' element={<Payment />} />
            <Route path="/success" element={<OrderSuccess />} />
          </Route>



          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />

          {/* <Route path="/cart" element={} /> */}
        </Routes>

      </Router>

      <Footer />

      <Toaster />
    </div>
  );
}

export default App;
