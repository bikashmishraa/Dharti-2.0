import Header from "@/components/Header";
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
        <div className="py-14 max-w-2xl space-y-5 md:space-y-7 px-5 mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
