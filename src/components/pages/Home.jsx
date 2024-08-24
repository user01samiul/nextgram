import { useAuth } from "@/contexts/AuthContext";
import getPosts from "@/lib/getPosts";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "../PostCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Home() {
  const { user } = useAuth();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["posts", user.$id],
    queryFn: () => {
      return getPosts();
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // //while fetching new data
  });

  

  const postCards = posts?.documents.map((post, index) => {
    return <PostCard key={index} post={post} isFetching={isFetching} />;
  });

  if (posts === undefined)
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="h-full flex-1 ">
          <Skeleton className="h-full w-full " />
        </div>
      </SkeletonTheme>
    );

  return (
    <section className="flex-1 pb-[140px] overflow-y-scroll h-screen flex flex-col items-center">
      {postCards}
    </section>
  );
}

export default Home;
