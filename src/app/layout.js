import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "In Loving Memory",
  description:
    "A celebration of a life beautifully lived — his legacy, his career, and the love he leaves behind.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
