// import giveLike from "@/lib/firebase/giveLike";
import { useAuth } from "@/contexts/AuthContext";
import currentUser from "@/lib/currentUser";
import deleteSave from "@/lib/deleteSave";
import giveLike from "@/lib/giveLike";
import savePost from "@/lib/savePost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonPostCard from "./SkeletonPostCard";

function PostCard({ post }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const creator = post.creator;
  const dp = creator?.imageURL;
  const [isLiked, setisLiked] = useState(false);
  const timestamp = post.$createdAt;
  const [time, setTime] = useState(formatTimestamp(timestamp));
  const [likesArray, setLikesArray] = useState();
  const [isSaved, setisSaved] = useState(false);


  const queryClient = useQueryClient();

  //like functionality ------------------------

  const { mutate } = useMutation({
    mutationFn: (updatedPost) => {
      return giveLike(post.$id, updatedPost);
    },
  });

  const handleLikes = (likeStatus) => {
    if (likeStatus) {
      const copiedArray = [...likesArray];
      if (!copiedArray.includes(user.$id)) {
        copiedArray.push(user.$id);
      }
      setLikesArray(copiedArray);
      const updatedPost = {
        ...post,
        likes: copiedArray,
      };
      mutate(updatedPost);
    } else {
      const copiedArray = [...likesArray];
      const updatedLikesArray = copiedArray.filter(
        (value) => value !== user.$id
      );
      setLikesArray(updatedLikesArray);

      const updatedPost = {
        ...post,
        likes: updatedLikesArray.length === 0 ? [] : updatedLikesArray,
      };

      mutate(updatedPost);
    }
  };

  useEffect(() => {
    if (
      user.liked.some((value) => {
        return value.$id === post.$id;
      })
    ) {
      setisLiked(true);
    } else {
      setisLiked(false);
    }

    if (
      user.save.some((value) => {
        return value.$id === post.$id;
      })
    ) {
      setisSaved(true);
    } else {
      setisSaved(false);
    }
  }, [post.$id, user.liked, user.save]);

  useEffect(() => {
    const arr = [];
    const update = post?.likes.forEach((value) => {
      return arr.push(value.$id);
    });
    setLikesArray(arr);
  }, [post?.likes]);

  //save functionality --------------------------------

  const { data: user2 } = useQuery({
    //for using in saves (updated)
    queryKey: ["user2", user.$id],
    queryFn: async () => {
      return await currentUser();
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const { mutate: mutateSave } = useMutation({
    mutationFn: async ({ userId, postId }) => {
      return await savePost(userId, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user2", user.$id],
      });
      queryClient.invalidateQueries({
        queryKey: ["saves", user.$id],
      });
    },
  });

  const { mutate: deletedSave } = useMutation({
    mutationFn: async (documentId) => {
      return await deleteSave(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user2", user.$id],
      });
      queryClient.invalidateQueries({
        queryKey: ["saves", user.$id],
      });
    },
  });



  async function handleSaveClick() {
    const documentToDelete = user2?.save.find((value) => {
      return value.post.$id === post.$id;
    });

    if (documentToDelete?.post.$id !== post.$id) {
      setisSaved(true);
      const saved = await mutateSave({ userId: user.$id, postId: post.$id });
    } else {
      setisSaved(false);
      const deleted = await deletedSave(documentToDelete.$id);
    }
  }


  
  //effect 1
  let status;
  if (
    post.save.some((object) => {
      return object.users.$id === user.$id;
    })
  ) {
    // setisSaved(true);
    status = true;
  } else {
    // setisSaved(false);
    status = false;
  }


  useEffect(() => {
    //effect 2
    const document = user2?.save.find((value) => {
      return value.post.$id === post.$id;
    });
    if (document?.post.$id === post.$id) {
      setisSaved(true);
    } else {
      setisSaved(false);
    }
  }, [user2?.save]);

  //end

  //time -----------------------------------

  function formatTimestamp(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);

    const diff = now - targetDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years >= 1) {
      return (
        targetDate.getDate() +
        "-" +
        targetDate.toLocaleString("default", { month: "long" }) +
        "-" +
        targetDate.getFullYear()
      );
    } else if (days >= 3) {
      return (
        targetDate.getDate() +
        "-" +
        targetDate.toLocaleString("default", { month: "long" })
      );
    } else if (hours >= 1) {
      return hours + " hours ago";
    } else if (minutes >= 1) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTimestamp(timestamp));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        {!loading ? (
          <div className="post-card flex flex-col my-3">
            <div className="cardTop mb-2 flex items-center ">
              <img
                src={dp}
                alt={dp}
                className="h-[45px] w-[45px] rounded-full mr-2 object-cover"
              />
              <div>
                <div className="flex flex-col">
                  <span className="text-lg">{creator?.name}</span>
                  <span className="text-sm text-off-white opacity-60">
                    {time}
                  </span>
                </div>
              </div>
            </div>
            <div className="caption flex-1">
              <span>{post.caption}</span>
              <div className="captionPhoto w-full h-[full] overflow-hidden">
                {post.imageUrl ? (
                  <img
                    onLoad={() => setLoading(false)}
                    src={post.imageUrl}
                    alt=""
                    className="w-full  h-full object-cover mt-2 rounded-lg"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="reaction flex justify-between pt-5">
              <div className="like-button flex gap-[2px]">
                <svg
                  onClick={() => {
                    setisLiked((prev) => {
                      const reversed = !prev;
                      handleLikes(reversed);
                      return reversed;
                    });
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${isLiked ? "#fb046e" : "none"}`}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={`${isLiked ? "#fb046e" : "currentColor"}`}
                  className="w-6 h-6 cursor-pointer active:scale-[0.94]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span>{likesArray?.length}</span>
              </div>
              <svg
                onClick={() =>
                  setisSaved((prev) => {
                    const changed = !prev;
                    handleSaveClick(changed);
                    return changed;
                  })
                }
                xmlns="http://www.w3.org/2000/svg"
                fill={`${isSaved || status ? "#5294df" : "none"}`}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={`${isSaved || status ? "#5294df" : "currentColor"}`}
                className="w-6 h-6 cursor-pointer active:scale-[0.94]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <SkeletonPostCard post={post} setLoading={setLoading} dp={dp} />
        )}
      </SkeletonTheme>
    </>
  );
}

export default PostCard;
