import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import "./globals.css";

function Layout() {
  // useEffect(() => {
  //   function setVhProperty() {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty("--vh", `${vh}px`);
  //   }

  //   window.addEventListener("resize", setVhProperty);
  //   setVhProperty(); // Initial call

  //   return () => {
  //     window.removeEventListener("resize", setVhProperty);
  //   };
  // }, []);
  return (
    <>
      <section className="private-layout w-full relative h-screen">
        {/* <div className="w-fll sticky z-50 top-0 bg-red-500">
          <p className="p-1 text-center text-blue text-[8px] sm:text-xs md:text-xs">
            You are testing a beta version of this app.This app is still under
            development.
          </p>
        </div> */}
        <Navbar />
        <div className="flex w-full h-screen">
          <SideBar />
          <Outlet />
        </div>
        <BottomBar />
        {/* <Toaster /> */}
      </section>
    </>
  );
}

export default Layout;
