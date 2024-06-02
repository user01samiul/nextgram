import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonPostCard({ post, setLoading, dp }) {
  return (
    <>
      <div className="post-card flex flex-col my-3">
        <div className="cardTop mb-2 flex items-center ">
          {!post.imageUrl || post.imageUrl == "" ? (
            <img
              onLoad={() => setLoading(false)}
              src={dp}
              alt={dp}
              className="h-[45px] w-[45px] hidden rounded-full mr-2 object-cover"
            />
          ) : (
            <img
              src={dp}
              alt={dp}
              className="h-[45px] w-[45px] hidden rounded-full mr-2 object-cover"
            />
          )}
          <Skeleton circle height="45px" width="45px" className="mr-2" />
          <div>
            <div className="flex flex-col">
              <span className="text-lg">
                <Skeleton width="130px" />
              </span>
              <span className="text-sm text-off-white opacity-60">
                <Skeleton width="90px" />
              </span>
            </div>
          </div>
        </div>
        <div className="caption flex-1">
          <span>
            <Skeleton count={2} />
          </span>
          <div className="captionPhoto w-full h-[full] overflow-hidden">
            {post?.imageUrl ? (
              <img
                onLoad={() => setLoading(false)}
                src={post?.imageUrl}
                alt=""
                className="w-full hidden  h-full object-cover mt-2 rounded-lg"
              />
            ) : (
              setLoading(false)
            )}
            <Skeleton height="200px" />
          </div>
        </div>
        <div className="reaction flex justify-between pt-5">
          <Skeleton width="25px" height="25px" circle />
          <Skeleton width="25px" height="25px" circle />
        </div>
      </div>
    </>
  );
}

export default SkeletonPostCard;
