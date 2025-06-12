import React from "react";
import HomeNavbar from "../../components/HomeNavbar";
import Footer from "../../components/Footer";
import "./about.css";

const AboutPage = () => {
    return (
        <>
            <HomeNavbar />
            <div className="about-container">
                <video src={"/videos/try.webm"} autoPlay loop></video>
                <h1 className="page-title-about">ABOUT</h1>
                <section className="section-101-about">
                    <p>
                        Narrato is a platform where storytellers create, share, and explore collaborative stories. We’re building a vibrant community where creativity meets collaboration to redefine storytelling.
                    </p>
                </section>
                <div className="about-us-grid">
                    <section className="section">
                        <h2 className="our-mission-h">Our Mission</h2>
                        <img className="our-mission-img" src={"/images/our-mission.jpg"} alt="ok" />
                        <p className="our-mission-p">
                            We believe in the power of storytelling and <strong>collaboration</strong>. Our
                            goal is to provide a space where writers of all <strong>levels</strong> can
                            collaborate on stories, exchange <strong>feedback</strong>, and contribute to a
                            shared narrative experience.
                        </p>
                    </section>
                    <section className="section">
                        <img className="our-mission-img1" src={"/images/comunity.jpg"} alt="ok" />
                        <h2 className="our-involved">Get Involved</h2>
                        <p className="our-mission-p1">
                            Whether you're a seasoned writer or just starting out, Narrato offers{" "}
                            <strong>something</strong> for everyone. Join our community today and start
                            telling your stories.
                        </p>
                        <div style={{ display: "flex", alignItems: "left" }}>
                            <button>Create Stories Now</button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AboutPage;
