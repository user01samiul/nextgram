import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import ProfilePosts from "../ProfilePosts";
function Profile() {
  const { user, isOnline } = useAuth();
  return (
    <section className="flex-1  overflow-y-scroll">
      <div className="userinfo relative">
        <div className="cover_photo w-full h-[280px] relative  ">
          <div className=" w-full h-[280px] relative ease-in duration-150">
            <img
              src="/cover.jpeg"
              alt=""
              className="w-full h-[inherit] z-1 object-cover"
            />
            <div className="change_cover flex absolute bottom-3 right-3">
              <button className="px-4 py-2 z-50 cursor-pointer bg-white lg:text-base text-sm  text-black  ease-in duration-150">
                <Link to="/update-profile">Update Profile</Link>
              </button>
            </div>
          </div>
          <div className="dp w-full flex flex-col items-center absolute  bottom-[-145px]  lg:bottom-[-175px]">
            <div
              className="profile_picture_container z-20 rounded-full h-[130px] w-[130px] lg:h-[180px] lg:w-[180px]
          "
            >
              <img
                src={user.imageURL}
                alt=""
                className={`rounded-[inherit] h-[inherit] w-[inherit]  object-cover ring-[4px] ${
                  isOnline ? "ring-green-500" : "ring-[#4b4848]"
                } `}
              />
            </div>
            <div className="w-full items-center  flex flex-col justify-center">
              <h1 className="mt-4 text-2xl">{user.name}</h1>
              <p className="text-sm text-gray-400 tracking-wide">
                {user.thread}
              </p>
            </div>
          </div>
        </div>
        <div className="user_details border-b border-[#c9c5c525] flex  flex-1 items-center flex-col pt-36 lg:pt-[175px]">
          <p className="mb-4">{user.bio}</p>
        </div>
      </div>
      <div className="bottomSection flex justify-center flex-col items-center flex-1">
        <ProfilePosts />
      </div>
    </section>
  );
}

export default Profile;
