import { useAuth } from "@/contexts/AuthContext";
import currentUser from "@/lib/currentUser";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navlinks from "./Navlinks";

function SideBar() {
  const { signoutApi, user, setIsOnline, isOnline } = useAuth();
  const { imageURL } = user;

  const { data: user2 } = useQuery({
    queryKey: ["userMain", user?.$id],
    queryFn: async () => {
      return await currentUser(user.$id);
    },
  });

  //active status functionality
  useEffect(() => {
    async function status() {
      const handleOnline = async () => {
        setIsOnline(true);
      };

      const handleOffline = async () => {
        setIsOnline(false);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
    status();
  }, [setIsOnline]);

  return (
    <div className="sidebar relative hidden md:block h-screen md:w-[29%] lg:w-[23%] px-2 py-4">
      {!user2 ? (
        <div className="h-full w-full flex justify-center items-center">
          <img src="/assets/icons/loader.svg" className="h-5 w-5" />
        </div>
      ) : (
        <>
          <div className="logo flex justify-center items-center">
            <img
              src="/nextgram.png"
              className="h-[63px] w-[63px]"
              alt="nextgram"
            />
          </div>
          <NavLink to={`/profile/${user2.$id}`}>
            <div className="profile-sidebar flex w-100% items-center ml-[7%] gap-4 cursor-pointer py-5 rounded-md">
              <div className="dp">
                <img
                  className="md:h-[40px] md:w-[40px] rounded-full object-cover lg:h-[45px] lg:w-[45px]"
                  src={user2.imageURL}
                  alt={user2.name}
                />
              </div>
              <div className="text flex flex-col">
                <span className="md:text-sm lg:text-lg">{user2.name}</span>
                <span className="text-xs font-normal">@{user2.thread}</span>
              </div>
            </div>
          </NavLink>
          <Navlinks />
          <button
            className="absolute flex items-center text-lg font-bold gap-2 right-5 bottom-4"
            onClick={signoutApi}
          >
            <img src="/assets/icons/logout.svg" alt="logout_button" />
            <span className="text-[#6e68ce] text-lg">Logout</span>
          </button>
        </>
      )}
    </div>
  );
}

export default SideBar;
