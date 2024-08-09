import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import "./globals.css";

function Layout() {

  return (
    <>
      <section className="private-layout w-full relative h-screen">
        <Navbar />
        <div className="flex w-full h-screen">
          <SideBar />
          <Outlet />
        </div>
        <BottomBar />
      </section>
    </>
  );
}

export default Layout;
