import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { ReactNode } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface IProps {
  children: ReactNode;
}

function PostCarousel({ children }: IProps) {
  return (
    <Carousel
      width={"100%"}
      className="relative"
      dynamicHeight
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      showStatus={false}
      showThumbs={false}
    >
      {/* @ts-ignore */}
      {children}
    </Carousel>
  );
}

function renderArrowPrev(
  clickHandler: () => void,
  hasPrev: boolean,
  label: string
) {
  return (
    <button
      className="grid place-items-center absolute left-3 
      top-1/2 z-10 -translate-y-1/2"
      style={{
        visibility: `${hasPrev ? "visible" : "hidden"}`,
      }}
      aria-label={label}
      type="button"
      onClick={clickHandler}
    >
      <span
        className="rounded-full p-[2px] bg-gray-50 opacity-70 text-center shadow
        grid place-items-center"
      >
        <ChevronLeftIcon className="h-5 w-5 text-black" />
      </span>
    </button>
  );
}

function renderArrowNext(
  clickHandler: () => void,
  hasNext: boolean,
  label: string
) {
  return (
    <button
      className="grid place-items-center absolute right-3 
      top-1/2 z-10 -translate-y-1/2"
      style={{
        visibility: `${hasNext ? "visible" : "hidden"}`,
      }}
      type="button"
      aria-label={label}
      onClick={clickHandler}
    >
      <span
        className="rounded-full p-[2px] bg-gray-50 opacity-70 text-center shadow 
        grid place-items-center"
      >
        <ChevronRightIcon className="h-5 w-5 text-black" />
      </span>
    </button>
  );
}

export default PostCarousel;
