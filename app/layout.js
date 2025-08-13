import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
