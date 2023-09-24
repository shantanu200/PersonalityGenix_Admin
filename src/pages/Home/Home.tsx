import React from "react";
import HeroImage from "../../assets/bro.png";
import "./Home.css";
import Login from "../../components/Login/Login";
import ResponsiveAppBar from "../../components/AppBar/Homebar";

const Home: React.FC = () => {
  return (
    <main className="mainBody">
      <ResponsiveAppBar />
      <section className="container">
        <div className="login">
          <Login />
        </div>
        <div className="image">
          <img className="banner" src={HeroImage} />
        </div>
      </section>
    </main>
  );
};

export default Home;
