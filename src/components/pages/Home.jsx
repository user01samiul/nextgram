import { useAuth } from "@/contexts/AuthContext";
import getPosts from "@/lib/getPosts";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "../PostCard";

function Home() {
  const { user } = useAuth();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["todo"],
    queryFn: () => {
      return getPosts();
    },
  });

  const postCards = posts?.documents.map((post, index) => {
    return <PostCard key={index} post={post} isFetching={isFetching} />;
  });

  if (isFetching) {
    return (
      <div className="flex-1 h-full flex gap-2 justify-center items-center">
        <img src="assets/icons/loader.svg" className="h-8 w-8" />
        <p className="text-sm">Loading content...</p>
      </div>
    );
  }
  // console.log(posts?.documents[0])

  return (
    <section className="flex-1 overflow-y-scroll h-screen flex flex-col items-center">
      {postCards}
    </section>
  );
}

export default Home;
