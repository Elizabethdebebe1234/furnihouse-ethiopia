
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "FurniHouse Ethiopia | Furniture & Custom Design",
  description:
    "Explore beautiful furniture collections and request custom furniture designs in Ethiopia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
