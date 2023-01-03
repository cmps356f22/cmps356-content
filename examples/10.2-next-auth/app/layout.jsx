import Header from "./header"
import "./styles.css"
import { ClientSessionProvider } from "./ClientSessionProvider";

export default function Layout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
          <main>
              {children}
          </main>
      </body>
    </html>
  )
}
