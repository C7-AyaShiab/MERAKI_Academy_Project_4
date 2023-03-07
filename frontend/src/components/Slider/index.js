import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.css";

const images = [
  {
    url: "https://media.istockphoto.com/id/1323779251/photo/living-room-interior-wall-mockup-in-warm-tones-with-leather-armchair-on-white-wall-background.jpg?b=1&s=170667a&w=0&k=20&c=8wWA1s4Wq6oLJ6e41QAOWZwx1rZMc7WokQ02anr2ErY=",
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
  backgroundRepeat: "no-repeat",
  backgroundSize: "700px 380px",
  height: "380px",
};

const Slider = () => {
  return (
    <div className="Slider">
      <Slide>
        {images.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span className="spanStyle">{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
