import Header from "./Header";
import "../styles/globals.css";
export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
