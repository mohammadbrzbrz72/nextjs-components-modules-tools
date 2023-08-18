import React from "react";
import { Link } from "@/components/personal";

import { PRIVATE_DATA } from "./constants";

interface ILayout {
  children: React.ReactNode;
}

const styles = {
  root: `
    //? display
    flex

    //? Size
    w-full h-full
    
    //? Spacing
    mt-14

    //? Layout
  `,
  sidebar: `
    //? display
    flex flex-col gap-3

    //? Size
    min-w-[150px] max-w-[150px]
    h-full

    //? Spacing
    pt-1 pb-10

    //? Layout
    border-r border-gray-200
  `,
  main: `
    //? Spacing
    mx-10


  `,
};

export default function Layout({ children }: ILayout) {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        {PRIVATE_DATA.map(({ name, href }) => (
          <Link className="text-base text-gray-500" href={href}>
            {name}
          </Link>
        ))}
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
