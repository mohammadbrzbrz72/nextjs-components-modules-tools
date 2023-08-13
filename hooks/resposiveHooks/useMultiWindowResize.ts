import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

//TODO: size should has collection of a min and max size
export function useMultiWindowResize(size = 768, milliseconds = 400) {
  const [screenInfo, setScreenInfo] = useState({
    innerWidth: 0,
    innerHeight: 0,
    isBrowser: false,
    isMobile: undefined as boolean | undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const result = window.innerWidth <= size;

      setScreenInfo({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
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
