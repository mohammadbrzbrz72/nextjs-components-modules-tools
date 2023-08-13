import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  style: ["normal"],
});

const fontsVariables = `${poppins.variable}`;

export default fontsVariables;
