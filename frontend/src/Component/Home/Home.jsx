import React, { Fragment,useEffect } from "react";
import MouseIcon from '@mui/icons-material/Mouse';
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";

// const products = [{
//     name: "Blue Tshirt",
//     images: [{ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Blue_Tshirt.jpg/220px-Blue_Tshirt.jpg" }],
//     price: "3000",
//     _id: "Salman1"
// }, {
//     name: "Blue Tshirt",
//     images: [{ url: "https://media.gettyimages.com/id/483960103/photo/blank-black-t-shirt-front-with-clipping-path.jpg?s=612x612&w=gi&k=20&c=KiBIOouPYE8XU7Ph8E7qNnMY1K1pebL3p2fkyfAH3Vg=" }],
//     price: "3000",
//     _id: "Salman2"
// }, {
//     name: "Blue Tshirt",
//     images: [{ url: "https://media.gettyimages.com/id/471188329/photo/plain-red-tee-shirt-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=RGOHoV-pQqfvG3gMgKpa4PNbV5gUJPY3SniV1ao9yGM=" }],
//     price: "3000",
//     _id: "Salman3"
// }, {
//     name: "Blue Tshirt",
//     images: [{ url: "https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886013_640.png" }],
//     price: "3000",
//     _id: "Salman4"
// }]

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    console.log(products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {/* <MetaData title="ECOMMERCE" /> */}

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <MouseIcon />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home