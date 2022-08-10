import React, { useContext } from "react";
import { Context } from "../store/appContext";
import lotus from "../../img/lotus.png";
// import mainPageBackground from "../../img/bgImgLotusBlue.png";
// import mainBamboo from "../../img/bamboo-home.jpg";
// import bambooBg from "../../img/bamboo1.jpg";
import styles from "../../styles/home.css";

export const Home = () => {
const { store, actions } = useContext(Context);

return (
    <div
      // className="home-body"
    id="homeBg"
    >
    {/* <img id="homePhoto" src={mainBamboo} alt="bamboo" /> */}
    <div
      // style={{
      //   backgroundImage: `url(${mainPageBackground})`,
      // }}
    >
        <div className="position-absolute top-50 start-50 translate-middle text-bg-home">
        <h5 className="p-5 text-center">
            <em>
    
            </em>
        </h5>
        <div className="d-flex flex-column align-items-center">
            <img src={lotus} />
            <div className="d-flex flex-column justify-content-center text-center">
            </div>
            <a className="btn btn-primary mb-5" href="./login" role="button">
            Log in here
            </a>
        </div>
        </div>
    </div>
    </div>
);
};
