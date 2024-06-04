import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
function ProfileInfo({ user2, showInfo, isOnline, handleShowInfo }) {
  const { user, signoutApi } = useAuth();

  if (!user2)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <img src="/assets/icons/loader.svg" className="h-5 w-5" />
      </div>
    );

  const { name, imageURL } = user2;

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
              <Link to={`/profile/${user.$id}`}>
                <li
                  className="hover:bg-[#ffc800] active:bg-[#ffc800] hover:text-black rounded-md cursor-pointer    ease-in duration-150 py-3 px-4 "
                  onClick={handleShowInfo}
                >
                  Profile
                </li>
              </Link>
              {/* <li className="hover:bg-[#ffc800] active:bg-[#ffc800] hover:text-black rounded-md cursor-pointer    ease-in duration-150 py-3 px-4 ">
                Settings
              </li> */}
              <li className=" hover:text-black rounded-md cursor-pointer    ease-in duration-150 py-3 px-4 ">
                <p className="text-gray-500"> Settings</p>
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
