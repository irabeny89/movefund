import { CSSProperties, ReactNode } from "react";
import ClientOnly from "./ClientOnly";
import Footer from "./Footer";
import Header from "./Header";

const layoutStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#262a41",
  padding: "2rem 0 30rem",
  color: "white",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <ClientOnly>
      <Header />
    </ClientOnly>
    <main style={layoutStyle}>{children}</main>
    <Footer />
  </>
);

export default Layout;
