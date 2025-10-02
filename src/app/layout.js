import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Travel Blog",
  description: "A travel blog",
};

const montserrat = Montserrat({
  style: "normal",
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Header />
        <main className="mainContainer">
          <div className="innerContainer">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
