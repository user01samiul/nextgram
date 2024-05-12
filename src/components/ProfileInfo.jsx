import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
function ProfileInfo({ name, imageURL, showInfo, isOnline, handleShowInfo }) {
  const { signoutApi } = useAuth();

  return (
    <>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.09 }}
            className={`profile_info text-white z-50  rounded-md  flex items-center flex-col w-[300px] absolute bg-[#131313]  top-[110%] py-6 
        right-[7%] ${showInfo ? "block" : "hidden"}`}
          >
            <div className="dp_Name flex items-center justify-center gap-4 ">
              <div
                className={`profile_picture ring-2 ${
                  isOnline ? "ring-green-500" : "ring-[#4b4848]"
                } ease-in duration-200 h-16 cursor-pointer w-16 rounded-full   `}
              >
                <img
                  src={imageURL}
                  className="h-[inherit] w-[inherit] rounded-[inherit] object-cover"
                  alt="profile_picture"
                />
              </div>
              <span className=" text-lg uppercase cursor-pointer">{name}</span>
            </div>
            <ul className=" text-lg mt-3 w-[95%]  ">
              <Link to="/profile">
                <li
                  className="hover:bg-[#ffc800] active:bg-[#ffc800] hover:text-black rounded-md cursor-pointer    ease-in duration-150 py-3 px-4 "
                  onClick={handleShowInfo}
                >
                  Profile
                </li>
              </Link>
              <li className="hover:bg-[#ffc800] active:bg-[#ffc800] hover:text-black rounded-md cursor-pointer    ease-in duration-150 py-3 px-4 ">
                Settings
              </li>
              <li
                className="flex   hover:bg-[#ffc800] active:bg-[#ffc800] hover:text-black rounded-md cursor-pointer    ease-in duration-150 py-3 px-4 "
                onClick={signoutApi}
              >
                <span className="mr-auto">Logout</span>{" "}
                <img src="/assets/icons/logout.svg" alt="" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProfileInfo;
