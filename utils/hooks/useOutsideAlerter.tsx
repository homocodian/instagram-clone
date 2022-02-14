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
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);
    document.addEventListener("keypress", onKeyPress, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
      document.removeEventListener("keypress", onKeyPress, true);
    };
  }, [ref]);
  return { visible, setVisible, elementRef: ref };
}

export default useOutsideAlerter;
