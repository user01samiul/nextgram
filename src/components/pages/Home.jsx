import { useAuth } from "@/contexts/AuthContext";
import getPosts from "@/lib/getPosts";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "../PostCard";

function Home() {
  const { user } = useAuth();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["posts"],
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
      <div className="flex-1 flex justify-center items-center">
        <img src="assets/icons/loader.svg" className="h-8 w-8" />
      </div>
    );

  return (
    <section className="flex-1 overflow-y-scroll h-screen flex flex-col items-center">
      {postCards}
    </section>
  );
}

export default Home;
