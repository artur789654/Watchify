import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SliderBtnProps {
  swiperRef: React.RefObject<any>;
}

const SliderBtn: React.FC<SliderBtnProps> = ({ swiperRef }) => {
  return (
    <div className="flex justify-center items-center space-x-2 px-2">
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="bg-light-link-active hover:bg-light-link-hover text-light-secondary dark:bg-dark-link-active dark:hover:bg-dark-link-hover dark:text-dark-secondary p-2 rounded-md shadow-md transition-colors duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="bg-light-link-active hover:bg-light-link-hover text-light-secondary dark:bg-dark-link-active dark:hover:bg-dark-link-hover dark:text-dark-secondary p-2 rounded-md shadow-md transition-colors duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default SliderBtn;
