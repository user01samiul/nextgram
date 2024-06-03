import { useAuth } from "@/contexts/AuthContext";
import getPosts from "@/lib/getPosts";
import { useQuery } from "@tanstack/react-query";
import SavedPostCard from "./SavedPostCard";

function SavePosts() {
  const { user } = useAuth();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["saves", user.$id],
    queryFn: () => {
      return getPosts();
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // //while fetching new data
  });

  if (isFetching)
    return (
      <div className=" mt-14">
        <img src="assets/icons/loader.svg" className="h-8 w-8" />
      </div>
    );

    const postCards = posts?.documents.map((post, index) => {
      return <SavedPostCard key={index} post={post} isFetching={isFetching} />;
    });


  return (
    <div className="mt-4 w-full flex flex-col items-center">{postCards}</div>
  );
  // return <div>as</div>;
}

export default SavePosts;
