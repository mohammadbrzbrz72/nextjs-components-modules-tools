"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function useHasSegment(segment: string) {
  const pathname = usePathname();

  const result = useMemo(
    () => [
      (() => {
        const splitPath = pathname.split("/");
        return splitPath.includes(segment);
      })(),
      pathname,
    ],
    [pathname]
  );

  return result;
}
