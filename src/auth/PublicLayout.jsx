import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PublicLayout({children}) {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <section className=" w-full h-[915px] flex flex-row overflow-hidden">
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
