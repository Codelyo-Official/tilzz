import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube, TiSocialInstagram } from "react-icons/ti";
import './footer.css'
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
            <footer>
                <div style={{ position: "relative", width: "90%", marginLeft: "5%", marginRight: "5%" }}>
                    <div>
                        <Link to={"/"} className="logo101">
                            <h2>
                                Narrato
                            </h2>
                        </Link>
                        <div className="q-links">
                            <h3>Quick Links</h3>
                            <Link to={"/"}>Home</Link>
                            <Link to={"/stories-feed"}>Stories
                            </Link>
                            <Link to={"/about"}>About</Link>
                            <Link to={"/contact"}>Contact</Link>
                        </div>

                        <div className="social-links">
                            <h3>Our Socials</h3>
                            <div>
                                <a href="#">
                                    <TiSocialFacebook />
                                </a>
                                <a href="#" >
                                    <TiSocialYoutube />
                                </a>
                                <a href="#" >
                                    <TiSocialTwitter />
                                </a>
                            </div>
                        </div>

                        <div className='copyr'>
                            {/* <div className='links-social-footer'><TiSocialFacebook /> <TiSocialInstagram /> <TiSocialTwitter /> <TiSocialYoutube /></div> */}
                            <p className='copyright'>{`© 2025 Copyright Narrato | All Rights Reserved | Terms and Conditions | Privacy Policy`}</p>
                        </div>

                        {/* <div className='sub'>
                            <input type="text" placeholder='Enter your email address' />
                            <button>Subscribe</button>
                        </div> */}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;