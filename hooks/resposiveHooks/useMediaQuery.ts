import { useState, useEffect } from "react";

import { matchMediaParameters, initialMatchingData } from "./tools";
import type { IMediaParameters } from "./interfaces";

export function useMediaQuery(params: IMediaParameters) {
  const [match, setMatch] = useState({
    isBrowser: false, // It's mean there is no window on building time or pre-render
    match: false,
  });

  useEffect(() => {
    setMatch({
      isBrowser: true,
      match: initialMatchingData(params),
    });

    const media = window.matchMedia(matchMediaParameters(params));

    function handleMedia(event: MediaQueryListEvent) {
      setMatch({
        isBrowser: true,
        match: event.matches,
      });
    }

    media.addEventListener("change", handleMedia);
    return () => media.removeEventListener("change", handleMedia);
  }, []);

  return match;
}
