import { useAuth } from "@/contexts/AuthContext";
import getPosts from "@/lib/getPosts";
import { useQuery } from "@tanstack/react-query";
import SavedPostCard from "./SavedPostCard";

function SavePosts() {
  const { user } = useAuth();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["saves", user.$id],
    queryFn: async () => {
      return await getPosts();
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // //while fetching new data
  });

  const draft = posts?.documents;
  const result = draft?.filter((object) => {
    return object.save.some((object) => {
      return object.users.$id === user.$id;
    });
  });

  if (posts === undefined || posts === [] || isFetching)
    return (
      <div className=" flex-1 flex justify-center items-center">
        <img src="assets/icons/loader.svg" className="h-8 w-8" />
      </div>
    );

  const postCards = result?.map((post) => {
    return (
      <SavedPostCard key={Math.random()} post={post} isFetching={isFetching} />
    );
  });

  return <div className=" w-full flex flex-col items-center">{postCards}</div>;
}

export default SavePosts;
