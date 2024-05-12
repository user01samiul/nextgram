import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
function Profile() {
  const { user, isOnline } = useAuth();

  return (
    <section className="flex-1  h-screen">
      <div className="userinfo relative">
        <div className="cover_photo w-full h-[280px] relative  ">
          <div className=" w-full h-[280px] relative ease-in duration-150">
            <img
              src="cover.jpeg"
              alt=""
              className="w-full h-[inherit] z-1 object-cover"
            />
            <div className="change_cover flex absolute bottom-3 right-3">
                <button className="px-4 py-2 z-50 cursor-pointer bg-white lg:text-base text-sm  text-black  ease-in duration-150">
              <Link to="/update-profile">
                  Update Profile
              </Link>
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
            <h1 className="mt-4 text-2xl">{user.name}</h1>
            <span className="text-sm text-gray-400 tracking-wide">
              {user.thread}
            </span>
          </div>
        </div>
        <div className="user_details">{/* <p>{user.bio}</p> */}</div>
      </div>
      <div className="bottomSection w-full  h-[70%]">
        <div className="w-full  h-full flex flex-col justify-center items-center mt-6">
          <img src="gear.png" alt="gear_icon" className="h=[70px] w-[70px] " />
          <p className="text-sm font-normal mt-1 text-gray-300">
            This section is under development.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
