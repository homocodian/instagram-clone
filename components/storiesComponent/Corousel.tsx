import { ReactNode, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { usePosition } from "../../utils/usePosition";
import CreateStory from "./CreateStory";

interface IProps {
  children: ReactNode;
}

function Corousel({ children }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasItemsOnLeft, hasItemsOnRight, scrollLeft, scrollRight } =
    usePosition(ref);

  return (
    <div
      id="carouselExampleControls"
      className="relative"
      data-bs-ride="carousel"
      role="region"
      aria-label="Stories carousel"
    >
      <div
        ref={ref}
        className="relative w-full overflow-x-auto scrollbar-hide flex 
        flex-row items-stretch first:pl-6 last:mr-4 gap-4"
      >
        <CreateStory />
        {children}
      </div>
      <button
        className="absolute top-0 bottom-0 flex items-center 
        justify-center p-0 text-center border-0 hover:outline-none 
        hover:no-underline focus:outline-none focus:no-underline left-2"
        style={{
          visibility: `${hasItemsOnLeft ? "visible" : "hidden"}`,
        }}
        type="button"
        data-bs-target="#carouselControls"
        data-bs-slide="prev"
        aria-label="previous slide"
        onClick={scrollLeft}
      >
        <span className="visually-hidden rounded-full bg-white text-center shadow">
          <ChevronLeftIcon className="h-5 w-5 text-black" />
        </span>
      </button>
      <button
        className="absolute top-0 bottom-0 
        flex items-center justify-center p-0 text-center border-0 
        hover:outline-none hover:no-underline focus:outline-none 
        focus:no-underline right-2"
        type="button"
        data-bs-target="#carouselControls"
        data-bs-slide="next"
        aria-label="next slide"
        style={{
          visibility: `${hasItemsOnRight ? "visible" : "hidden"}`,
        }}
        onClick={scrollRight}
      >
        <span className="rounded-full bg-white text-center shadow">
          <ChevronRightIcon className="h-5 w-5 text-black" />
        </span>
      </button>
    </div>
  );
}

export default Corousel;
