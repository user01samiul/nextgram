import getUsers from "@/lib/peopleAPI";
import { useQuery } from "@tanstack/react-query";

function People() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      return await getUsers();
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, //while fetching new data
  });

  const print = data?.documents.map((user) => (
    <div
      key={Math.random().toString()}
      className="profile-horizontal-card   flex w-full hover:bg-[#131313] active:bg-[#131313] active:scale-[0.98] ease-in duration-200 cursor-pointer "
    >
      <div className="hp h-16 flex flex-row items-center px-2 ">
        <img
          src={user.imageURL}
          alt=""
          className="h-11 w-11 object-cover rounded-full"
        />
      </div>
      <div className="htext justify-center flex flex-col">
        <p className="text-base m-0 p-0 ">{`@${user.thread}`}</p>
        <p className="text-xs m-0 p-0">{user.username}</p>
      </div>
    </div>
  ));

  if (data === undefined)
    return (
      <div className="flex-1 flex justify-center items-center">
        <img src="assets/icons/loader.svg" className="h-8 w-8" />
      </div>
    );

  return (
    <div className="flex-1">
      <div className="people-heading text-center w-full flex justify-center items-center lg:my-4 my-2 text-xl">
        Discover People
      </div>
      <div className="bottomSection flex-1  px-4   ">{print}</div>
    </div>
  );
}

export default People;
