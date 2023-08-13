import React from 'react';
import "./Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <>
            <footer className="new_footer_area bg_color">
                <div className="new_footer_top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6">
                                <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s">
                                    <h3 className="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                    <p>Don’t miss any updates of our new templates and extensions.!</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">

                            </div>

                            <div className="col-lg-3 col-md-6">

                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s">
                                    <h3 className="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                    <div className="f_social_icon">
                                        <FacebookIcon />
                                        <TwitterIcon />
                                        <InstagramIcon />
                                        <LinkedInIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer_bg">
                        <div className="footer_bg_one"></div>
                        <div className="footer_bg_two"></div>
                    </div>
                </div>
                <div className="footer_bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-sm-5 text-right">
                                <p>Made with 💕 by Salman</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
