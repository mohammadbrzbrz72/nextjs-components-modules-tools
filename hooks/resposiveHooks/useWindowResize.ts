import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

//TODO: size should has a min and max size
export function useWindowResize(size = 768, milliseconds = 400) {
  const [screenInfo, setScreenInfo] = useState({
    winWidth: 0,
    winHeight: 0,
    isBrowser: false,
    isMobile: undefined as boolean | undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const result = window.innerWidth <= size;

      setScreenInfo({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
        isMobile: result,
        isBrowser: true,
      });
    };

    handleResize();

    const debounceUseScreenSizeCb = () => debounce(handleResize, milliseconds);

    window.addEventListener("resize", debounceUseScreenSizeCb);
    return () => window.removeEventListener("resize", debounceUseScreenSizeCb);
  }, []);

  return screenInfo;
}
