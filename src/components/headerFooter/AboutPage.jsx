import React from "react";
import Header from "./HeaderPage";
import Footer from "./FooterPage";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <main>
      <Header />
      <div className="About-Container">
        <div className="about-content">
          <h1>About Us</h1>

          <section className="story">
            <h2>Our Story</h2>
            <p>
              Welcome to E-commerce, a leading destination for curated products.
              Our journey began with a mission to provide quality products
              across categories like beauty, fashion, and tech. What started as
              a small venture has now grown into a comprehensive platform
              offering a wide range of items tailored to every customer's needs.
            </p>
          </section>

          <section className="mission">
            <h2>Mission & Vision</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              eligendi esse reiciendis magnam labore molestias culpnsectetur
              voluptate, sunt temporibus nostrum impedit ea nulla?
            </p>
          </section>

          <section className="team">
            <h2>Meet Our Team</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
              iure itaque atque ipsam? Dolorem molestias fugiat nemo placeat?
              Ipsam, ratione earum beatae odit quae doloribus fuga minus
              laboriosam sit! Accusamus! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Explicabo temporibus earum quasi fugiat delectus
              non ad quis! In laboriosam exercitationem maiores ex tempora error
              vitae quos dolorum? Voluptas, labore laboriosam?
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
