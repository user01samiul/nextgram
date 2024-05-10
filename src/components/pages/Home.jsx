import { useAuth } from "@/contexts/AuthContext";
import PostCard from "../PostCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Home() {
  const { user, posts } = useAuth();
 
  

  const postCards = posts.map((post, index) => {
  return <PostCard key={index} post={post}  />;
  });

  return (
    <section className="flex-1 overflow-y-scroll h-screen flex flex-col items-center">
      {postCards }
    </section>
  );
}

export default Home;
