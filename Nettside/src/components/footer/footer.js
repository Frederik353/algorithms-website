
import "./footer.scss"


// logos
import Github from "./logos/github.svg"
import Youtube from "./logos/youtube.svg"
import Instagram from "./logos/instagram.svg"
import Reddit from "./logos/reddit.svg"




export const Footer = () => (
    <div className="footer">
        <div className="section-skew">
            <div className="section-content-wrapper">
                <div className="section-content ">
                    <div className="secondary-color-section footer-section flex-column">
                            <div className="upper-footer">
                                <h1 className="logo">Logo</h1>
                                <div>
                                    <a href="#github">
                                        <img src={ Github } alt=""></img>
                                    </a>
                                    <a href="#youtube">
                                        <img src={ Youtube } alt=""></img>
                                    </a>
                                    <a href="#instagram">
                                        <img src={ Instagram } alt=""></img>
                                    </a>
                                    <a href="#reddit">
                                        <img src={ Reddit } alt=""></img>
                                    </a>
                                </div>
                                <div className="footer-nav">
                                    {/* eslint-disable-next-line */}
                                    <a href="#">About</a>
                                    {/* eslint-disable-next-line */}
                                    <a href="#">Terms of Use</a>
                                    {/* eslint-disable-next-line */}
                                    <a href="#">FAQ</a>
                                    {/* eslint-disable-next-line */}
                                    <a href="#">Contact Us</a>
                                    {/* eslint-disable-next-line */}
                                    <a href="#">Blog</a>
                                    {/* eslint-disable-next-line */}
                                    <a href="#">Privacy Policy</a>
                                </div>
                            </div>
                            <div className="lower-footer">
                                Copyright ©2021.  All rights reserved.
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);