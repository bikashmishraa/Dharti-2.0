import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <main className="size-full min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
