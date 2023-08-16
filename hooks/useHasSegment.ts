import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function useHasSegment(segment: string) {
  const pathname = usePathname();

  const hasSegment = useMemo(() => {
    const splitPath = pathname.split("/");
    const isCurrentSegment = splitPath.includes(segment);

    return [isCurrentSegment, pathname];
  }, [pathname]);

  return hasSegment;
}
