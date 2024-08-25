import { useAuth } from "@/contexts/AuthContext";
import getProfile from "@/lib/getProfile";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import ProfilePosts from "../ProfilePosts";
function Profile() {
  const { user, isOnline } = useAuth();
  const { profileId } = useParams();
  const { data: userData, isFetching } = useQuery({
    queryKey: ["profile", profileId],
    queryFn: async () => {
      return await getProfile(profileId);
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // //while fetching new data
  });

  if (!userData)
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="h-full flex-1 ">
          <Skeleton className="h-full w-full " />
        </div>
      </SkeletonTheme>
    );

  if (userData === "Document with the requested ID could not be found.")
    return (
      <div className="flex-1 h-full flex justify-center items-center">
        <p>Profile not found!</p>
      </div>
    );

  //coverPhoto

  const arr = userData?.coverPhotos;
  const coverPhotoURL = arr[0]?.coverURL;

  return (
    <section className="flex-1 pb-[220px] overflow-y-scroll">
      <div className="userinfo relative">
        <div className="cover_photo w-full h-[280px] relative  ">
          <div className=" w-full h-[280px] relative ease-in duration-150">
            <img
              src={coverPhotoURL ? coverPhotoURL : "/Untitled.png"}
              alt="coever photo"
              className="w-full h-[inherit] z-1 object-cover"
            />
            {profileId === user.$id && (
              <div className="change_cover flex absolute bottom-3 right-3">
                <button className="px-2 py-2  md:px-4 md:py-2 z-40 cursor-pointer bg-white lg:text-base md:text-sm text-xs  text-black  ease-in duration-150">
                  <Link to={`/update-profile/${user.$id}`}>Update Profile</Link>
                </button>
              </div>
            )}
          </div>
          <div className="dp w-full flex flex-col items-center absolute  bottom-[-145px]  lg:bottom-[-175px]">
            <div
              className="profile_picture_container z-20 rounded-full h-[130px] w-[130px] lg:h-[180px] lg:w-[180px]
          "
            >
              <img
                src={userData?.imageURL}
                alt=""
                className={`rounded-[inherit] h-[inherit] w-[inherit]  object-cover ring-[4px] ${
                  isOnline ? "ring-green-500" : "ring-[#4b4848]"
                } `}
              />
            </div>
            <div className="w-full items-center  flex flex-col justify-center">
              <h1 className="mt-4 text-2xl">{userData?.name}</h1>
              <p className="text-sm text-gray-400 tracking-wide">
                {userData?.thread}
              </p>
            </div>
          </div>
        </div>
        <div className="user_details border-b border-[#c9c5c525] flex  flex-1 items-center flex-col pt-36 lg:pt-[175px]">
          <p className="mb-4">{userData?.bio}</p>
        </div>
      </div>
      <div className="bottomSection flex justify-center flex-col items-center flex-1">
        <ProfilePosts />
      </div>
    </section>
  );
}

export default Profile;
