import { useAuth } from "@/contexts/AuthContext";
import profilePosts from "@/lib/profilePosts";
import { useQuery } from "@tanstack/react-query";
import ProfilePostCard from "./ProfilePostCard";

function SavePosts() {
  const { user } = useAuth();

  const { data, isFetching } = useQuery({
    queryKey: ["savePosts", user.$id],
    queryFn: async () => await profilePosts(user.$id),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // //while fetching new data
  });
  console.log(data);

    if (isFetching)
      return (
        <div className=" mt-14">
          <img src="assets/icons/loader.svg" className="h-8 w-8" />
        </div>
      );

  const arr = [];
  const doing = data?.save.forEach((object) => {
    arr.push(object.post);
  });
  const copiedArr = [...arr];
  const posts = copiedArr?.reverse();
  console.log(posts);

    const postCards = posts?.map((post, index) => {
      return <ProfilePostCard key={index} post={post} user={user} />;
    });

    return (
      <div className="mt-4 w-full flex flex-col items-center">{postCards}</div>
    );
//   return <div>hi</div>;
}



export default SavePosts;
