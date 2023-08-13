import React, { Fragment, useState, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import "./payment.css";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";

const Payment = ({ history }) => {
    const [selectedOption, setSelectedOption] = useState("razorpay");
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
    const dispatch = useDispatch();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const navigate = useNavigate();

    const orderdata = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };



    const handlePaymentSubmit = async () => {
        if (selectedOption === "upi" || selectedOption === "cod") {
            toast.error("This service is not available now !")
        }
        else {

            try {


                const { data: { key } } = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/getkey`);

                const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/checkout`, {
                    amount: orderInfo.totalPrice
                })

                const options = {
                    key,
                    amount: order.amount,
                    currency: "INR",
                    name: "Salman Mandal",
                    description: "razorpay",
                    image: "https://avatars.githubusercontent.com/u/76894465?v=4",
                    order_id: order.id,
                    "handler": async function (response) {

                        try {
                            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/paymentverification`, {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            });
                            toast.success("Payment Success");

                            if (data.PaymentStatus === "succeeded") {
                                orderdata.paymentInfo = {
                                    id: response.razorpay_order_id,
                                    status: data.PaymentStatus,
                                };
                                dispatch(createOrder(orderdata));
                                navigate("/success");
                            }
                            else {
                                toast.error("There is some error in your payment");
                            }

                        } catch (error) {

                            toast.error(error);

                        }
                    },

                    prefill: {
                        name: "subjest",
                        email: "subjest@example.com",
                        contact: "1234567890"
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        color: "#00FF00"
                    }
                };

                const razor = new window.Razorpay(options);
                razor.open();






            } catch (error) {
                toast.error(error);
            }




        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, toast]);

    return (
        <Fragment>
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <Typography className="head" variant="h4">Select Payment Method</Typography>
                <div className="paymentOptions">

                    <label>
                        <input
                            type="radio"
                            value="razorpay"
                            checked={selectedOption === "razorpay"}
                            onChange={() => handleOptionChange("razorpay")}
                        />
                        Razorpay
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="upi"
                            checked={selectedOption === "upi"}
                            onChange={() => handleOptionChange("upi")}
                        />
                        UPI
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="cod"
                            checked={selectedOption === "cod"}
                            onChange={() => handleOptionChange("cod")}
                        />
                        Cash on Delivery
                    </label>
                </div>
                <button className="paymentFormBtn" onClick={handlePaymentSubmit}>
                    Continue Payment
                </button>
            </div>
            <Toaster />
        </Fragment>
    );
};

export default Payment;
