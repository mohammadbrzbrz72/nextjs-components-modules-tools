import type { IMediaParameters } from "./interfaces";

export const isNullish = (data: any) => [null, undefined].includes(data);

export function matchMediaParameters({ min, max }: IMediaParameters) {
  const hasMinNumber = !isNullish(min);
  const hasMaxNumber = !isNullish(max);
  const hasBothQuery = hasMinNumber && hasMaxNumber;

  if (hasBothQuery) {
    return `(min-width:${min}px) and (max-width:${max}px)`;
  } else if (hasMinNumber) {
    return `(min-width:${min}px)`;
  } else if (hasMaxNumber) {
    return `(max-width:${max}px)`;
  } else throw new Error("There is no number for match media");
}

export function initialMatchingData({ min, max }: IMediaParameters) {
  const { innerWidth } = window;
  const hasMinNumber = !isNullish(min);
  const hasMaxNumber = !isNullish(max);
  const hasBothQuery = hasMinNumber && hasMaxNumber;

  if (hasBothQuery) {
    return min! <= innerWidth && max! >= innerWidth;
  } else if (hasMinNumber) {
    return min! <= innerWidth;
  } else if (hasMaxNumber) {
    return max! >= innerWidth;
  } else throw new Error("There is no number for match media");
}
