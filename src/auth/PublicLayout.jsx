import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function PublicLayout({ children }) {
  const { user } = useAuth();

  useEffect(() => {
    function setVhProperty() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    window.addEventListener("resize", setVhProperty);
    setVhProperty(); // Initial call

    return () => {
      window.removeEventListener("resize", setVhProperty);
    };
  }, []);

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <section className="publicLayout w-full flex flex-row overflow-hidden">
          <div className="formSection w-full lg:w-[50%] h-full flex items-center">
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
