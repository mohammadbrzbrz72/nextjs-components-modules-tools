"use client";

import clsx from "clsx";
import React, { useState, useMemo, useCallback } from "react";

type IList =
  | {
      label: string;
      [key: string]: string;
    }
  | string;

type IClasses = Partial<Record<"root" | "icon" | "label" | "dropbox", string>>;
interface IRenderList {
  index: number;
  isActive: boolean;
  onSelect: () => void;
  data: IList;
}

interface IDropbox {
  defaultIndex: number;
  list: IList[];
  replaceable?: boolean;
  icon?: React.ReactNode;
  classes?: IClasses;
  activeClasses?: IClasses;
  renderList: (props: IRenderList) => React.ReactNode;
}

const styles = {
  root: `
    //? Display
    flex items-center gap-1

    //? Position
    relative
  `,
  dropbox: ``,
};

export function Dropbox({
  defaultIndex,
  list,
  replaceable,
  icon = ">",
  classes,
  activeClasses,
  renderList,
}: IDropbox) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const toggle = () => setIsOpen((data) => !data);

  const getLabel = useCallback(() => {
    const currentList = list[replaceable ? activeIndex : defaultIndex];
    const value =
      typeof currentList === "string" ? currentList : currentList.label;

    return value;
  }, [activeIndex]);

  const label = useMemo(
    () => (
      <>
        <span className={clsx(classes?.label)}>{getLabel()}</span>
        <span className={clsx("rotate-90", classes?.icon)}>{icon}</span>
      </>
    ),
    [activeIndex]
  );

  return (
    <div
      className={clsx(styles.root, classes?.root, activeClasses?.root)}
      onClick={toggle}
    >
      {label}

      {isOpen && (
        <div
          className={clsx(
            styles.dropbox,
            classes?.dropbox,
            activeClasses?.dropbox
          )}
        >
          {list.map((data, index) =>
            renderList({
              data,
              index,
              isActive: index === activeIndex,
              onSelect: () => {
                setActiveIndex(index);
                toggle();
              },
            })
          )}
        </div>
      )}
    </div>
  );
}
