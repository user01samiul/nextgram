import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navlinks from "./Navlinks";

function SideBar() {
  const { signoutApi, user, setIsOnline, isOnline } = useAuth();
  const { imageURL } = user;
  // const [isOnline, setIsOnline] = useState(navigator.onLine); // Initialize with the current online status | mandatory ***

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
  }, []);

  return (
    <div className="sidebar relative hidden md:block h-screen md:w-[29%] lg:w-[23%] px-2 py-4 ">
      <div className="logo flex justify-center items-center">
        <img src="/nextgram.png" className="h-[63px] w-[63px]" alt="nextgram" />
      </div>
      <NavLink to="profile">
        <div className="profile-sidebar  flex w-100% items-center ml-[7%] gap-4 cursor-pointer  py-5 rounded-md">
          <div className="dp">
            <img
              className=" md:h-[40px] md:w-[40px] rounded-full object-contain lg:h-[45px] lg:w-[45px]"
              src={user.imageURL}
              alt={user.name}
            />
          </div>
          <div className="text flex flex-col">
            <span className="md:text-sm lg:text-lg">{user.name}</span>
            <span className="text-xs font-normal">@{user.thread}</span>
          </div>
        </div>
      </NavLink>
      <Navlinks />
      <button
        className="absolute flex items-center text-lg font-bold gap-2  right-5 bottom-4"
        onClick={signoutApi}
      >
        <img src="/assets/icons/logout.svg" alt="logout_button" />{" "}
        <span className="text-[#6e68ce] text-lg">Logout</span>
      </button>
    </div>
  );
}

export default SideBar;
