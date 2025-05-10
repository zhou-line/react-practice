import React from "react";
import image404 from "@/assets/404_images/404.png";
import cloudImage from "@/assets/404_images/404_cloud.png";
import "./index.scss"

const Page404 = () => {
    const message = 'The webmaster said that you can not enter this page...';

    return (
        <div>
            <div className="http404-container">
                <div className="http404">
                    <div className="pic404">
                        <img className="pic404__parent" src={image404} alt="404"/>
                        <img className="pic404__child left" src={cloudImage} alt="404"/>
                        <img className="pic404__child mid" src={cloudImage} alt="404"/>
                        <img className="pic404__child right" src={cloudImage} alt="404"/>
                    </div>
                    <div className="bullshit">
                        <div className="bullshit__oops">OOPS!</div>
                        <div className="bullshit__info">All rights reserved
                            <a style={{color: '#20a0ff', textDecoration: 'none'}} href="https://github.com/marlulu" target="_blank" rel="noreferrer"> marlulu</a>
                        </div>
                        <div className="bullshit__headline">{ message }</div>
                        <div className="bullshit__info">Please check that the URL you entered is correct, or click the
                            button below to return to the homepage.
                        </div>
                        <a href="#/login" className="bullshit__return-home">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page404;