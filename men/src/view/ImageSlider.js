import React, { useState } from "react";
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./style.css";

const ImageSlider = ({ data }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    return (
        <div className="carousel">
            <button
                onClick={prevSlide}
                className="arrow arrow-left"
            >
                ←
            </button>
            {data.map((item, idx) => {
                return (
                    <img
                        src={item.src}
                        alt={item.alt}
                        key={idx}
                        className={slide === idx ? "slide" : "slide slide-hidden"}
                    />
                );
            })}
            <button
                onClick={nextSlide}
                className="arrow arrow-right"
            >
                →
            </button>

            <span className="indicators">
        {data.map((_, idx) => {
            return (
                <button
                    key={idx}
                    className={
                        slide === idx ? "indicator" : "indicator indicator-inactive"
                    }
                    onClick={() => setSlide(idx)}
                ></button>
            );
        })}
      </span>
        </div>
    );
};

export default ImageSlider