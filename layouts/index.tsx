import React from "react";

import Header from "./header";
import Footer from "./footer";

interface IMainLayout {
  children: React.ReactNode;
}

const styles = {
  root: `
    //? Display
    flex flex-col justify-between

    //? Size
    min-h-screen w-screen
  `,
  main: `
    //? classes
    wrapper
    
    //? Display
    flex-1
    overflow-x-hidden
  `,
};

export default function MainLayout({ children }: IMainLayout) {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  );
}
