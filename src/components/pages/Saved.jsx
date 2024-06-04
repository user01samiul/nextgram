import { useAuth } from "@/contexts/AuthContext";
import getPosts from "@/lib/getPosts";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SavedPostCard from "../SavedPostCard";

function Saved() {
  const { user } = useAuth();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["saves", user.$id],
    queryFn: async () => {
      return await getPosts();
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // while fetching new data
  });

  const draft = posts?.documents;
  const result =
    draft?.filter((object) => {
      return object.save.some((object) => {
        return object.users.$id === user.$id;
      });
    }) || []; // Ensure result is an array

  if (posts === undefined || isFetching)
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="h-full flex-1 ">
          <Skeleton className="h-full w-full " />
        </div>
      </SkeletonTheme>
    );

  const postCards = result.map((post) => {
    return <SavedPostCard key={post.$id} post={post} isFetching={isFetching} />;
  });

  return (
    <div className=" flex-1 overflow-y-scroll h-screen flex flex-col items-center">
      <div className="people-heading text-center w-full flex justify-center items-center lg:my-4 my-2 text-xl">
        Saved Posts
      </div>
      <div className="w-full h-full flex flex-col items-center">
        {postCards?.length === 0 ? (
          <div className="flex-1 h-full flex justify-between items-center text-sm">
            No saved posts available.
          </div>
        ) : (
          postCards
        )}
      </div>
    </div>
  );
}

export default Saved;
