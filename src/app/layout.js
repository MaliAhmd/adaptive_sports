import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import Main from "./components/main";
import "./globals.css";

import { Gentium_Book_Plus } from 'next/font/google';

// Configure the font loader
const gentiumBook = Gentium_Book_Plus({
  subsets: ['latin'], // Specify necessary subsets
  weight: ['400', '700'], // Specify weights you want to use
  variable: '--font-gentium-book', // Optional: Define a CSS variable name
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {/* <Main /> */}
        {children}
      </body>
    </html>
  );
}
