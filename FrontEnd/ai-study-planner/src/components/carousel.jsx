import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import "../images/img1.png"
import "../images/img2.png"
import "../images/img3.png"

const slides = [
  {
    title: "Manage Your Course Selections",
    description: "Streamline your learning by updating and tailoring your courses to fit your goals.",
    buttonText: "Join for free",
    image: "../images/img1.png",
  },
  {
    title: "Track Your Progress",
    description: "Stay on top of your coursework with interactive tracking tools.",
    buttonText: "Get Started",
    image: "../images/img2.png",
  },
  {
    title: "Collaborate with Peers",
    description: "Engage with classmates and enhance your learning experience.",
    buttonText: "Explore Now",
    image: "../images/img3.png",
  }
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="carousel-slide">
          <div className="carousel-content">
            <div className="text-section">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button>{slide.buttonText}</button>
            </div>
            <div className="image-section">
              <img src={slide.image} alt="carousel" />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
