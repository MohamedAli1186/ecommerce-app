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
              Welcome to E-commerce, a leading destination for curated products. Our journey began with a mission to
              provide quality products across categories like beauty, fashion, and tech. What started as a small venture has 
              now grown into a comprehensive platform offering a wide range of items tailored to every customer's needs.
            </p>
          </section>

          <section className="mission">
            <h2>Mission & Vision</h2>
            <p>
              Our mission is to make quality products accessible and affordable to all, while maintaining a high level of
              customer satisfaction. We envision a future where shopping is not just a transaction, but an experience that
              brings joy and convenience to people everywhere.
            </p>
          </section>

          <section className="team">
            <h2>Meet Our Team</h2>
            <p>
              Behind the scenes, we are a passionate team of developers, designers, and product experts committed to providing
              the best possible experience for our customers. From our customer support to our logistics team, every
              individual plays a key role in delivering excellence.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
