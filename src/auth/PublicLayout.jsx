import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function PublicLayout({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <section className=" w-full publicLayout flex flex-row overflow-hidden">
          <div className=" formSection w-full lg:w-[50%] h-full flex items-center">
            {/* <Outlet /> */}
            {children}
          </div>
          <div className="coverPhoto lg:w-[50%] hidden lg:block">
            <img
              src="assets/images/side-img.svg"
              alt="side image signin signup"
            />
          </div>
        </section>
      )}
    </>
  );
}

export default PublicLayout;
