import { useState, useEffect } from "react";

import type { IUseMultiMatchMedia } from "./interfaces";
import { matchMediaParameters, initialMatchingData } from "./tools";

type IMediaArray = [string, MediaQueryList][];
type IMediaCollection = [
  (event: MediaQueryListEvent) => void,
  MediaQueryList
][];

export function useMultIMediaParameters(multiMedia: IUseMultiMatchMedia): {
  isBrowser: boolean;
  matches: Record<keyof typeof multiMedia, boolean>;
} {
  const [matches, setMatches] = useState<{
    isBrowser: boolean;
    matches: Record<keyof typeof multiMedia, boolean>;
    // {
    // [key in keyof typeof multiMedia]: boolean; // or top code
    // };
  }>({
    isBrowser: false, // It's mean there is no window on building time
    matches: Object.fromEntries(
      Object.keys(multiMedia).map((key) => [key, false])
    ),
  });

  useEffect(() => {
    // set initial collection of match media
    setMatches({
      isBrowser: true,
      matches: Object.fromEntries(
        Object.entries(multiMedia).map(([key, screenSize]) => [
          key,
          initialMatchingData(screenSize),
        ])
      ),
    });

    // array of key and match media for collection of custom media
    const mediaArray: IMediaArray = Object.entries(multiMedia).map(
      ([key, mediaParams]) => {
        const media = window.matchMedia(matchMediaParameters(mediaParams));

        return [key, media];
      }
    );

    // list of matchMedia callback for remove event listener on unmount component
    const mediaCollection: IMediaCollection = mediaArray.map(([key, media]) => {
      function handleMedia(event: MediaQueryListEvent) {
        setMatches((prevData) => ({
          isBrowser: true,
          matches: {
            ...prevData.matches,
            [key]: event.matches,
          },
        }));
      }

      media.addEventListener("change", handleMedia);

      return [handleMedia, media];
    });

    return () => {
      mediaCollection.forEach(([handleMedia, media]) => {
        media.removeEventListener("change", handleMedia);
      });
    };
  }, []);

  return matches;
}
