import Provider from "./../components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnsNow",
  description: "A learning platform ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="sm:px-20 px-5">
            <Navbar />
          </div>
          {children}
        </Provider>
      </body>
    </html>
  );
}
