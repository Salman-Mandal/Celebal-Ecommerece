import React from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
   
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating name="half-rating" value={product.ratings} defaultValue={2.5} precision={0.5} />{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
};

export default ProductCard;