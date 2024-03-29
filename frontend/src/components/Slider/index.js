import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.css";

const images = [
  {
    url: "https://wallpapers.com/images/featured/1p8lqahjzvgac2vw.jpg",
    caption: "Refresh your home",
  },
  {
    url: "https://demo.themefreesia.com/idyllic-fashion/wp-content/uploads/sites/23/2017/08/slider-image-1.jpg",
    caption: "Discover your new fashion",
  },
  {
    url: "https://www.canimalhospitalnc.com/wp-content/uploads/2016/01/slider-1.jpg",
    caption: "Get the best for your pet",
  },
];

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "1520px 400px",
  height: "400px",
};

const Slider = () => {
  return (
    <Slide className="slider" style={{ width: "1400px" }}>
      {images.map((slideImage, index) => (
        <div
          key={index}
          style={{ marginBottom: "0", paddingBottom: "0", width: "1520px" }}
        >
          <div
            className={`img${index}`}
            style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
          ></div>
          <span className="spanStyle">{slideImage.caption}</span>
        </div>
      ))}
    </Slide>
  );
};

export default Slider;
