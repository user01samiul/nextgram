import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";

function Navbar() {
  const { user, signoutApi, isOnline } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const { imageURL, name } = user;

  const handleShowInfo = () => {
    setShowInfo((prev) => !prev);
  };

  return (
    <nav className="md:hidden flex  w-full h-[53px] sticky bg-[#131313] z-50 top-0">
      <div className="  flex items-center mr-auto">
        <img
          src="nextgram.png"
          className="cursor-pointer h-10 w-10"
          alt="nextgram"
        />
        <span className="text-base cursor-pointer">NextGram</span>
      </div>
      <div className="other_tabs flex items-center gap-4 px-2">
        <div className="logout cursor-pointer active:scale-[0.99]">
          <img
            src="/assets/icons/logout.svg"
            className="h-7 w-7"
            alt="logout_button"
            onClick={signoutApi}
          />
        </div>

        <div
          className={`profile_picture ring-2 ${
            isOnline ? "ring-green-500" : "ring-[#4b4848]"
          }  ease-in  duration-200  h-10 w-10 rounded-full cursor-pointer `}
          onClick={handleShowInfo}
        >
          <img
            src={user.imageURL}
            className="h-[inherit] w-[inherit] rounded-[inherit] object-cover "
            alt="profile_picture"
          />
        </div>

        <ProfileInfo
          name={name}
          imageURL={imageURL}
          showInfo={showInfo}
          isOnline={isOnline}
        />
      </div>
    </nav>
  );
}

export default Navbar;
