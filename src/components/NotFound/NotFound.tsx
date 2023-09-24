import React from "react";
import "./NotFound.css";
import NotFoundImg from "../../assets/notfound.png";

const NotFound: React.FC = () => {
  return (
    <div className="notFoundContainer">
      <img className="image" src={NotFoundImg} alt="" />
    </div>
  );
};

export default NotFound;
