import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ history }) => {


  const { user, loading, isLoggedIn } = useSelector((state) => state.user);
  const nevigation = useNavigate();
  const alertTest = () => {
    toast.success("Login Success!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      nevigation("/login");
    }
  }, [nevigation, isLoggedIn]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title={`${user.name}'s Profile`} /> */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avater.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>

              </div>

            </div>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;