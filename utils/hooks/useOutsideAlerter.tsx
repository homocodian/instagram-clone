import { useEffect, useRef, useState } from "react";

function useOutsideAlerter(initialValue: boolean) {
  const [visible, setVisible] = useState(initialValue);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [ref]);
  return { visible, setVisible, elementRef: ref };
}

export default useOutsideAlerter;
