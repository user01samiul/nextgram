import { useAuth } from "@/contexts/AuthContext";
// import img from "/public/assets/images/side-img.svg"
import { Navigate } from "react-router-dom";

function PublicLayout({ children }) {
  const { user } = useAuth();

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
              src="/public/assets/images/side-img.svg"
              alt="side image signin signup"
            />
          </div>
        </section>
      )}
    </>
  );
}

export default PublicLayout;
